import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '../../../../components/Button/Button.jsx'

const Base = styled('div')({
	'--color-primary': 'var(--color-primary-inverse)',
})

const ReadingButton = styled(Button)({
	padding: '0.5rem 1rem',
	margin: '0.5rem',
})

const speakReading = r => () => {
	const { speechSynthesis, } = window
	const japaneseVoices = speechSynthesis
		.getVoices()
		.filter(v => v.lang === 'ja-JP')

	// TODO be able to select other Japanese voice
	const [firstJapaneseVoice = null, ] = japaneseVoices

	if (firstJapaneseVoice !== null) {
		const utterance = new SpeechSynthesisUtterance(r.replace(/[.-]/g, ''))
		utterance.voice = firstJapaneseVoice
		utterance.pitch = 1
		utterance.rate = 0.7
		speechSynthesis.speak(utterance)
	}
}

const ReadingsList = ({
	reading,
	type,
}) => {
	const [readings, setReadings, ] = React.useState([])

	React.useEffect(() => {
		const theReadings = reading
			.filter(r => r['@_r_type'] === type)
			.map(r => r['#text'])

		setReadings(theReadings)
	}, [reading, type, ])

	React.useEffect(() => {
		const { speechSynthesis, } = window
		const japaneseVoices = speechSynthesis
			.getVoices()
			.filter(v => v.lang === 'ja-JP')

		// TODO be able to select other Japanese voice
		const [firstJapaneseVoice = null, ] = japaneseVoices

		if (firstJapaneseVoice !== null) {
			readings.forEach(r => {
				const utterance = new SpeechSynthesisUtterance(r.replace(/[.-]/g, ''))
				utterance.voice = firstJapaneseVoice
				utterance.pitch = 1
				utterance.rate = 0.7
				speechSynthesis.speak(utterance)
			})
		}
	}, [readings, ])

	return (
		<Base>
			{
				readings.map(r => (
					<ReadingButton
						key={r}
						type="button"
						onClick={speakReading(r)}
					>
						{r}
					</ReadingButton>
				))
			}
		</Base>
	)
}

ReadingsList.propTypes = {
	reading: PropTypes.arrayOf(PropTypes.object),
	type: PropTypes.string,
}

export default ReadingsList
