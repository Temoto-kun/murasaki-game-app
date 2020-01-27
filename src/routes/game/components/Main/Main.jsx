import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink, } from 'react-router-dom'
import { Route, } from 'react-router'

import AnswerForm from '../AnswerForm/AnswerForm.jsx'
import LiteralDisplay from '../LiteralDisplay/LiteralDisplay.jsx'
import ImageDisplay from '../ImageDisplay/ImageDisplay.jsx'
import ReadingsList from '../ReadingsList/ReadingsList.jsx'
import { clearTimeout } from 'rollup-plugin-node-builtins/src/es6/timers'

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

const TabLink = styled(NavLink)({
	display: 'grid',
	placeContent: 'center',
	flex: 'auto',
	width: 0,
	minWidth: '50%',
	padding: '1rem 2rem',
	boxSizing: 'border-box',
	textDecoration: 'none',
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
}) => (values, e) => {
	const { answer, } = values
	const englishMeanings = meaning
		.filter(m => typeof m === 'string')
		.map(s => s.toLowerCase())

	if (englishMeanings.includes(answer.toLowerCase())) {
		setAnswered(answered => answered + 1)
		setImages([])
	}

	e.target.reset({})
}

const fetchImage = async q => {
	const response = await window.fetch(
		`${process.env.REACT_APP_IMAGE_SEARCH_BASE_URL}?q=${encodeURIComponent(q)}`,
		{
			headers: {
				'Ocp-Apim-Subscription-Key': process.env.REACT_APP_IMAGE_SEARCH_API_KEY,
			}
		}
	)
	return response.json()
}

const Main = ({
	match: {
		path,
		url,
	},
	datasets,
}) => {
	const timers = React.useRef([null, null, null, null])
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

		const fourWords = englishMeanings.slice(0, 4)
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
			<header>
				<LiteralDisplay
					literal={literal}
				/>
				<TabPanel>
					<TabLinkContainer>
						{
							JAPANESE_READINGS.map(r => (
								reading.filter(r2 => r2['@_r_type'] === r.id).length > 0
								&& <TabLink
									key={r.id}
									to={`${url}/readings/${r.id}`}
								>
									{r.name}
								</TabLink>
							))
						}
					</TabLinkContainer>
					<Route
						path={`${path}/readings/:type`}
						render={routeProps => (
							<ReadingsList
								{...routeProps}
								reading={reading}
							/>
						)}
					/>
				</TabPanel>
			</header>
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
					})}
				/>
			</Footer>
		</Base>
	)
}

Main.propTypes = {
	match: PropTypes.shape({
		path: PropTypes.string,
		url: PropTypes.string,
	}),
	datasets: PropTypes.object,
}

export default Main
