import * as React from 'react'
import * as PropTypes from 'prop-types'

import styled, { themable, } from '../../services/themable.js'

const MIN_HEIGHTS = {
	small: '2.5rem',
	medium: '3rem',
	large: '4rem',
}

const LABEL_VERTICAL_PADDING_SIZES = {
	small: '0.0625rem',
	medium: '0.125rem',
	large: '0.25rem',
}

const INPUT_FONT_SIZES = {
	small: '0.85em',
	medium: '0.85em',
	large: '1em',
}

const SECONDARY_TEXT_SIZES = {
	small: '0.65em',
	medium: '0.75em',
	large: '0.85em',
}

const ComponentBase = styled('div')({
	position: 'relative',
	borderRadius: '0.25rem',
	fontFamily: 'var(--font-family-base)',
})

const CaptureArea = styled('label')({
	display: 'block',
})

const LabelWrapper = styled('span')({
	...themable('color', 'var(--color-primary, currentColor)'),
	boxSizing: 'border-box',
	position: 'absolute',
	top: 0,
	left: 0,
	paddingLeft: '0.5rem',
	fontSize: '0.85em',
	maxWidth: '100%',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	fontWeight: 'bolder',
})

const Border = styled('span')({
	...themable('border-color', 'var(--color-primary, currentColor)'),
	boxSizing: 'border-box',
	display: 'inline-block',
	borderWidth: '0.125rem',
	borderStyle: 'solid',
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	borderRadius: 'inherit',
})

const Input = styled('input')({
	boxSizing: 'border-box',
	position: 'relative',
	border: 0,
	paddingTop: 0,
	paddingBottom: 0,
	paddingLeft: '1rem',
	margin: 0,
	font: 'inherit',
	minHeight: '4rem',
	minWidth: '16rem',
	background: 'transparent',
	zIndex: 1,
})

const HintWrapper = styled('span')({
	boxSizing: 'border-box',
	position: 'absolute',
	bottom: 0,
	left: 0,
	paddingLeft: '1rem',
	fontSize: '0.85em',
	opacity: 0.5,
	maxWidth: '100%',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	':empty': {
		display: 'none',
	},
	'::before': {
		content: '"("',
		display: 'inline',
	},
	'::after': {
		content: '")"',
		display: 'inline',
	},
})

const IndicatorWrapper = styled('span')({
	...themable('color', 'var(--color-primary, currentColor)'),
	boxSizing: 'border-box',
	position: 'absolute',
	top: 0,
	right: 0,
	height: '100%',
	display: 'grid',
	placeContent: 'center',
	padding: '0 1rem',
})

/**
 * Component for inputting textual values.
 */
const TextInput = React.forwardRef(({
	label = '',
	className = '',
	hint = '',
	indicator = null,
	size = 'medium',
	block = false,
	...etcProps
}, ref) => (
	<ComponentBase
		style={{
			display: block ? 'block' : 'inline-block',
		}}
	>
		<Border />
		<CaptureArea
			className={className}
		>
			<LabelWrapper
				style={{
					paddingTop: LABEL_VERTICAL_PADDING_SIZES[size],
					paddingBottom: LABEL_VERTICAL_PADDING_SIZES[size],
					paddingRight: (
						indicator
							? MIN_HEIGHTS[size]
							: '0.5rem'
					),
					fontSize: SECONDARY_TEXT_SIZES[size],
				}}
			>
				{typeof label !== 'undefined' && label !== null ? String(label) : ''}
			</LabelWrapper>
			<Input
				{...etcProps}
				ref={ref}
				style={{
					display: block ? 'block' : 'inline-block',
					verticalAlign: 'top',
					fontSize: INPUT_FONT_SIZES[size],
					width: block ? '100%' : null,
					minHeight: MIN_HEIGHTS[size],
					paddingRight: (
						indicator
							? MIN_HEIGHTS[size]
							: '1rem'
					)
				}}
			/>
		</CaptureArea>
		<HintWrapper
			style={{
				paddingTop: LABEL_VERTICAL_PADDING_SIZES[size],
				paddingBottom: LABEL_VERTICAL_PADDING_SIZES[size],
				paddingRight: (
					indicator
						? MIN_HEIGHTS[size]
						: '1rem'
				),
				fontSize: SECONDARY_TEXT_SIZES[size],
			}}
		>
			{typeof hint !== 'undefined' && hint !== null ? String(hint) : ''}
		</HintWrapper>
		{
			indicator
			&& (
				<IndicatorWrapper
					style={{
						width: MIN_HEIGHTS[size],
					}}
				>
					{indicator}
				</IndicatorWrapper>
			)
		}
	</ComponentBase>
))

TextInput.propTypes = {
	/**
	 * Short textual description indicating the nature of the component's value.
	 */
	label: PropTypes.any,
	/**
	 * Class name for the component, used for styling.
	 */
	className: PropTypes.string,
	/**
	 * Short textual description as guidelines for valid input values.
	 */
	hint: PropTypes.any,
	/**
	 * Size of the component.
	 */
	size: PropTypes.oneOf(['small', 'medium', 'large', ]),
	/**
	 * Additional description, usually graphical, indicating the nature of the component's value.
	 */
	indicator: PropTypes.node,
	/**
	 * Should the component take up the remaining space parallel to the content flow?
	 */
	block: PropTypes.bool,
}

TextInput.displayName = 'TextInput'

export default TextInput
