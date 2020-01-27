import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

const Base = styled('h1')({
	margin: 0,
	display: 'grid',
	placeContent: 'center',
	fontSize: '8rem',
	fontWeight: 'inherit',
	lineHeight: 1,
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
	display: 'block',
	path: {
		stroke: 'currentColor',
	}
})

const Animated = styled(Img)({
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

const LiteralForeground = styled('div')({
	height: '100%',
	width: '100%',
	position: 'absolute',
	top: 0,
	left: 0,
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

	if (response.headers.get('Content-Type') !== 'image/svg+xml') {
		return null
	}

	// TODO have fallback for kanji without stroke orders
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
	const [fallback, setFallback, ] = React.useState(null)
	const [id, setId, ] = React.useState(0)

	React.useEffect(() => {
		const doFetchLiteralImage = async () => {
			setFallback(null)
			const literalImageData = await fetchLiteralImage(literal)
			const isFallback = literalImageData === null
			setFallback(isFallback)

			if (!isFallback) {
				setLiteralDisplay(
					literalImageData
						.replace(/<svg(.+?)>/, '')
						.replace(/<\/svg>/, '')
				)
			}
		}

		doFetchLiteralImage()
	}, [literal, ])

	return (
		<Base
			{...etcProps}
		>
			{
				typeof fallback === 'boolean'
				&& (
					<Wrapper>
						{
							!fallback
							&& (
								<Placeholder>
									<Img
										viewBox="0 0 109 109"
										dangerouslySetInnerHTML={{
											__html: literalDisplay
										}}
									/>
								</Placeholder>
							)
						}
						<LiteralForeground>
							{
								!fallback
								&& (
									<Animated
										key={id}
										viewBox="0 0 109 109"
										dangerouslySetInnerHTML={{
											__html: literalDisplay
										}}
										onClick={restartAnimation({ setId, })}
									/>
								)
							}
							{
								fallback
								&& (
									<React.Fragment>
										{literal}
									</React.Fragment>
								)
							}
						</LiteralForeground>
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
