import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

const Base = styled('h1')({
	margin: 0,
	display: 'grid',
	placeContent: 'center',
	fontSize: '8rem',
	fontWeight: 'inherit',
})

const Wrapper = styled('div')({
	width: '1em',
	height: '1em',
	position: 'relative',
})

const pathStyles = {}

for (let i = 0; i < 35; i++) {
	pathStyles[`path[id$="s${i + 1}"]`] = {
		animationDelay: `calc(500ms * ${i})`,
	}
}

const Img = styled('svg')({
	height: '100%',
	width: '100%',
	position: 'absolute',
	top: 0,
	left: 0,
	['g[id^="kvg:StrokeNumbers"]']: {
		display: 'none',
	},
	path: {
		opacity: 0,
		strokeDasharray: '200%',
		animation: 'dash 1000ms linear forwards',
	},
	...pathStyles,
})

const Placeholder = styled('div')({
	height: '100%',
	width: '100%',
	position: 'absolute',
	top: 0,
	left: 0,
	opacity: 0.15,
})

const fetchLiteralImage = async literal => {
	if (literal === '') {
		return null
	}

	const strokeOrderBasename = literal
		.codePointAt(0)
		.toString(16)
		.padStart(5, '0')

	const strokeOrderPath = `/stroke-order/${strokeOrderBasename}.svg`

	const response = await fetch(strokeOrderPath)
	return response.text()
}

const restartAnimation = ({ setId, }) => e => {
	e.preventDefault()
	setId(Math.random())
}

const LiteralDisplay = ({
	literal = '',
	...etcProps
}) => {
	const [literalDisplay, setLiteralDisplay, ] = React.useState(null)
	const [id, setId, ] = React.useState(0)

	React.useEffect(() => {
		const doFetchLiteralImage = async () => {
			const literalImageData = await fetchLiteralImage(literal)

			setLiteralDisplay(
				literalImageData
					.replace(/<svg(.+?)>/, '')
					.replace(/<\/svg>/, '')
			)
		}

		doFetchLiteralImage()
	}, [literal, ])

	return (
		<Base
			{...etcProps}
		>
			{
				literalDisplay
				&& (
					<Wrapper>
						<Placeholder>
							<svg
								viewBox="0 0 109 109"
								style={{
									width: '100%',
									height: '100%',
									display: 'block',
								}}
								dangerouslySetInnerHTML={{
									__html: literalDisplay

								}}
							/>
						</Placeholder>
						<Img
							key={id}
							viewBox="0 0 109 109"
							dangerouslySetInnerHTML={{
								__html: literalDisplay
							}}
							onClick={restartAnimation({ setId, })}
						/>
					</Wrapper>
				)
			}
		</Base>
	)
}

LiteralDisplay.propTypes = {
	literal: PropTypes.string,
}

export default LiteralDisplay
