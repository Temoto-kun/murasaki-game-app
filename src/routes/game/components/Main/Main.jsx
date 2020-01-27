import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

import AnswerForm from '../AnswerForm/AnswerForm.jsx'
import LiteralDisplay from '../LiteralDisplay/LiteralDisplay.jsx'
import ImageDisplay from '../ImageDisplay/ImageDisplay.jsx'
import ReadingsList from '../ReadingsList/ReadingsList.jsx'

const Base = styled('main')({
	display: 'flex',
	flexDirection: 'column',
	height: '100vh',
})

const TabPanel = styled('div')({
})

const TabLinkContainer = styled('nav')({
	display: 'flex',
	overflow: 'auto',
})

const TabLink = styled('a')({
	display: 'grid',
	placeContent: 'center',
	flex: 'auto',
	width: 0,
	minWidth: '50%',
	padding: '1rem 2rem',
	boxSizing: 'border-box',
	textDecoration: 'none',
	color: 'inherit',
	textTransform: 'uppercase',
	':link': {
		color: 'inherit',
	},
	':visited': {
		color: 'inherit',
	},
	'@media (min-width: 640px)': {
		minWidth: 0,
	},
})

const StyledImageDisplay = styled(ImageDisplay)({
	flex: 'auto',
})

const Footer = styled('footer')({
	padding: '1rem',
	boxSizing: 'border-box',
})

const AnswerCounter = styled('div')({
	marginBottom: '1rem',
})

const Header = styled('header')({
	color: 'var(--color-primary-inverse)',
	backgroundColor: 'var(--color-primary)',
})

const JAPANESE_READINGS = [
	{
		id: 'ja_on',
		name: 'On',
	},
	{
		id: 'ja_kun',
		name: 'Kun',
	},
]

const submitAnswer = ({
	meaning,
	setAnswered,
	setImages,
	setActiveReadings,
}) => (values, e) => {
	const { answer, } = values
	const englishMeanings = meaning
		.filter(m => typeof m === 'string')
		.map(s => s.toLowerCase())

	if (englishMeanings.includes(answer.toLowerCase())) {
		setAnswered(answered => answered + 1)
		setImages([])
		setActiveReadings(null)
	}

	e.target.reset({})
}

const fetchImage = async q => {
	const response = await fetch(
		`${process.env.REACT_APP_IMAGE_SEARCH_BASE_URL}?q=${encodeURIComponent(q)}`,
		{
			headers: {
				'Ocp-Apim-Subscription-Key': process.env.REACT_APP_IMAGE_SEARCH_API_KEY,
			}
		}
	)
	return response.json()
}

const displayAvailableReadings = ({ setActiveReadings, }) => reading => e => {
	e.preventDefault()
	setActiveReadings(reading.id)
}

const Main = ({
	datasets,
	// TODO use filters for JLPT level, Jouyou grade, etc.
}) => {
	const timers = React.useRef([null, null, null, null])
	const [activeReadings, setActiveReadings, ] = React.useState(null)
	const [answered, setAnswered, ] = React.useState(0)
	const [character, setCharacter, ] = React.useState({
		literal: '',
		reading_meaning: {
			rmgroup: {
				reading: [],
			},
		},
	})
	const [images, setImages, ] = React.useState([])

	React.useEffect(() => {
		const currentDatasetId = 'kanjidic2'
		const { [currentDatasetId]: currentDataset, } = datasets
		const { character: characters, } = currentDataset
		const datasetLength = characters.length
		setCharacter(oldCharacter => {
			let newCharacter
			do {
				const randomNumber = Math.floor(Math.random() * datasetLength)
				const { [randomNumber]: theCharacter, } = characters
				newCharacter = theCharacter
			} while (newCharacter === oldCharacter)
			return newCharacter
		})
	}, [datasets, answered, ])

	React.useEffect(() => {
		const { reading_meaning: readingMeaning, literal, } = character
		if (literal === '') {
			return
		}
		const { rmgroup, } = readingMeaning
		const { meaning, } = rmgroup
		const englishMeanings = meaning.filter(m => typeof m === 'string')

		const doFetchImage = async (meaning, i) => {
			const { value, } = await fetchImage(meaning)
			const randomNumber = Math.floor(Math.random() * value.length)
			const { [randomNumber]: firstImage, } = value
			setImages(images => [
				...images.slice(0, i),
				{
					src: firstImage.thumbnailUrl,
					alt: `Image #${i + 1}`,
				},
				...images.slice(i),
			])
		}

		const fourWords = englishMeanings
			.sort(() => Math.floor(Math.random() * 2) - 1)
			.slice(0, 4)
		
		const theFourWords = [
			...fourWords,
			...fourWords,
			...fourWords,
			...fourWords,
		]
			.slice(0, 4)

		theFourWords
			.forEach((meaning, i) => {
				if (timers.current[i] !== null) {
					clearTimeout(timers.current[i])
				}
				timers.current[i] = setTimeout(() => {
					doFetchImage(meaning, i)
				}, i * 3500)
			})

		return () => {
			timers.current
				.filter(c => c !== null)
				.forEach(c => {
					clearTimeout(c)
				})
		}
	}, [character, ])

	const {
		literal,
		reading_meaning,
	} = character

	const {
		rmgroup,
	} = reading_meaning

	const {
		reading,
		meaning,
	} = rmgroup

	return (
		<Base>
			<Header>
				<LiteralDisplay
					literal={literal}
				/>
				<TabPanel>
					<TabLinkContainer>
						{
							JAPANESE_READINGS.map(r => (
								reading.filter(r2 => r2['@_r_type'] === r.id).length > 0
								&& (
									<TabLink
										key={r.id}
										href={`#${r.id}`}
										onClick={displayAvailableReadings({ setActiveReadings, })(r)}
									>
										{r.name}
									</TabLink>
								)
							))
						}
					</TabLinkContainer>
					{
						activeReadings !== null
						&& (
							<ReadingsList
								reading={reading}
								type={activeReadings}
							/>
						)
					}
				</TabPanel>
			</Header>
			<StyledImageDisplay
				images={images}
			/>
			<Footer>
				<AnswerCounter>
					Items Answered: <output>{answered}</output>
				</AnswerCounter>
				<AnswerForm
					onSubmit={submitAnswer({
						meaning,
						setAnswered,
						setImages,
						setActiveReadings,
					})}
				/>
			</Footer>
		</Base>
	)
}

Main.propTypes = {
	datasets: PropTypes.object,
}

export default Main
