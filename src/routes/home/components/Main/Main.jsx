import * as React from 'react'
import { Link, } from 'react-router-dom'
import styled from 'styled-components'

import Button from '../../../../components/Button/Button.jsx'

const Base = styled('main')({
	height: '100vh',
	width: '100%',
	display: 'table',
	backgroundColor: 'var(--color-primary)',
	'--color-primary-inverse': 'var(--color-primary)',
	backgroundImage: 'url("waves3.svg")',
	backgroundSize: 400,
})

const Content = styled('div')({
	display: 'table-cell',
	verticalAlign: 'middle',
	'--color-primary': 'white',
})

const ContentWrapper = styled('div')({
	width: 360,
	maxWidth: '100%',
	margin: '0 auto',
	padding: '0 1rem',
	boxSizing: 'border-box',
})

const Title = styled('h1')({
	textTransform: 'lowercase',
	fontSize: '6rem',
	textAlign: 'center',
	lineHeight: 0.85,
	//height: '12rem',
	fontWeight: '100',
	fontFamily: 'Hanazono, serif',
	//fontWeight: 500,
	margin: '0 auto',
	writingMode: 'vertical-rl',
	letterSpacing: '-0.1em',
	color: 'var(--color-primary)',
})

const Subtitle = styled('h2')({
	textAlign: 'center',
	fontSize: '4rem',
	margin: '0 0 2rem',
	textTransform: 'lowercase',
	//fontWeight: 'bold',
	fontWeight: 'light',
	letterSpacing: '0.1em',
	color: 'var(--color-primary)',
})

const ButtonWrapper = styled('div')({
	margin: '1rem 0',
})

const getCharactersFromCodePointRange = range => {
	const characters = []
	const [start, end] = range

	for (let i = start; i <= end; i++) {
		characters.push(String.fromCodePoint(i))
	}

	return characters
}

const Main = () => {
	const [title, setTitle, ] = React.useState('むらさき')
	const [hasDataset, setHasDataset, ] = React.useState(false)

	React.useEffect(() => {
		const MU_CHARACTERS = ['む', ...getCharactersFromCodePointRange([0x1b0d0, 0x1b0d3])]
		const RA_CHARACTERS = ['ら', ...getCharactersFromCodePointRange([0x1b0ed, 0x1b0f0])]
		const SA_CHARACTERS = ['さ', ...getCharactersFromCodePointRange([0x1b03c, 0x1b043])]
		const KI_CHARACTERS = ['き', ...getCharactersFromCodePointRange([0x1b023, 0x1b02a])]

		setTitle(
			[
				MU_CHARACTERS[Math.floor(Math.random() * MU_CHARACTERS.length)],
				RA_CHARACTERS[Math.floor(Math.random() * RA_CHARACTERS.length)],
				SA_CHARACTERS[Math.floor(Math.random() * SA_CHARACTERS.length)],
				KI_CHARACTERS[Math.floor(Math.random() * KI_CHARACTERS.length)],
			]
				.join('')
		)
	}, [])

	return (
		<Base>
			<Content>
				<ContentWrapper>
					<Title>
						{title}
					</Title>
					<Subtitle>
						Murasaki
					</Subtitle>
					<ButtonWrapper>
						<Button
							as={Link}
							disabled={!hasDataset}
							block
							to="/start"
							variant="primary"
						>
							Start Game
						</Button>
					</ButtonWrapper>
					<ButtonWrapper>
						<Button
							as={Link}
							to="/datasets"
							block
							variant="outline"
						>
							Manage Datasets
						</Button>
					</ButtonWrapper>
				</ContentWrapper>
			</Content>
		</Base>
	)
}

export default Main
