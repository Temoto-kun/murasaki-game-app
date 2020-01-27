import * as React from 'react'
import * as PropTypes from 'prop-types'

import styled, { themable, } from '../../services/themable.js'

const Base = styled('div')({
	display: 'block',
})

const CaptureArea = styled('label')({
	marginTop: '0.25rem',
	'::after': {
		content: '""',
		clear: 'both',
	}
})

const Input = styled('input')({
	position: 'absolute',
	left: -999999,
	width: 1,
	height: 1,
})

const IndicatorWrapper = styled('span')({
	...themable('border-color', 'var(--color-primary, currentColor)'),
	boxSizing: 'border-box',
	backgroundColor: 'transparent',
	borderRadius: '0.75rem',
	position: 'relative',
	width: '1.5rem',
	height: '1.5rem',
	minWidth: '1.5rem',
	maxWidth: '1.5rem',
	display: 'inline-flex',
	verticalAlign: 'top',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
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

const Indicator = styled('span')({
	...themable('background-color', 'var(--color-primary, currentColor)'),
	...themable('color', 'var(--color-primary-inverse, white)'),
	...themable('width', 0),
	...themable('height', 0),
	...themable('opacity', 0),
	boxSizing: 'border-box',
	display: 'inline-grid',
	placeContent: 'center',
	borderRadius: '50%',
	[`${Input}:checked + ${IndicatorWrapper} &`]: {
		width: `${100 * 2 / 3}%`,
		height: `${100 * 2 / 3}%`,
		opacity: 1,
	},
})

const Label = styled('span')({
	display: 'block',
	verticalAlign: 'top',
	float: 'right',
	width: 'calc(100% - 2.5rem)',
	fontFamily: 'var(--font-family-base)',
})

/**
 * Component for values which are to be selected from a few list of options.
 */
const RadioButton = ({
	label = '',
	name,
	...etcProps
}) => (
	<Base>
		<CaptureArea>
			<Input
				{...etcProps}
				name={name}
				type="radio"
			/>
			<IndicatorWrapper>
				<Border />
				<Indicator />
			</IndicatorWrapper>
			<Label>
				{typeof label !== 'undefined' && label !== null ? String(label) : ''}
			</Label>
		</CaptureArea>
	</Base>
)

RadioButton.propTypes = {
	/**
	 * Group where the component belongs.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * Short textual description indicating the nature of the component's value.
	 */
	label: PropTypes.any,
}

RadioButton.displayName = 'RadioButton'

export default RadioButton

