import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '../../../../components/Button/Button.jsx'

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
	const [firstJapaneseVoice, ] = japaneseVoices

	const utterance = new SpeechSynthesisUtterance(r)
	utterance.voice = firstJapaneseVoice
	utterance.pitch = 1
	utterance.rate = 0.7
	speechSynthesis.speak(utterance)
}

const ReadingsList = ({
	reading,
	match: {
		params: {
			type,
		},
	},
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
		const [firstJapaneseVoice, ] = japaneseVoices

		readings.forEach(r => {
			const utterance = new SpeechSynthesisUtterance(r)
			utterance.voice = firstJapaneseVoice
			utterance.pitch = 1
			utterance.rate = 0.7
			speechSynthesis.speak(utterance)
		})
	}, [readings, ])

	return (
		<div>
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
		</div>
	)
}

ReadingsList.propTypes = {
	reading: PropTypes.arrayOf(PropTypes.object),
	match: PropTypes.shape({
		params: PropTypes.shape({
			type: PropTypes.string,
		}),
	}),
}

export default ReadingsList