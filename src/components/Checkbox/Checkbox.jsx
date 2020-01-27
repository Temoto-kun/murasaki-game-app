import * as React from 'react'
import * as PropTypes from 'prop-types'

import styled, { themable, } from '../../services/themable.js'
import Icon from '../Icon/Icon.jsx'

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
	borderRadius: '0.25rem',
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
	position: 'relative',
	boxSizing: 'border-box',
	display: 'inline-grid',
	placeContent: 'center',
	borderRadius: 'inherit',
	lineHeight: 1,
	[`${Input}:checked + ${IndicatorWrapper} &`]: {
		opacity: 1,
		width: '100%',
		height: '100%',
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
 * Component for values that have an on/off state.
 */
const Checkbox = React.forwardRef(({
	label = '',
	...etcProps
}, ref) => (
	<Base>
		<CaptureArea>
			<Input
				{...etcProps}
				type="checkbox"
				ref={ref}
			/>
			<IndicatorWrapper>
				<Border />
				<Indicator>
					<Icon
						name="check"
					/>
				</Indicator>
			</IndicatorWrapper>
			<Label>
				{typeof label !== 'undefined' && label !== null ? String(label) : ''}
			</Label>
		</CaptureArea>
	</Base>
))

Checkbox.propTypes = {
	/**
	 * Short textual description indicating the nature of the component's value.
	 */
	label: PropTypes.any,
}

Checkbox.displayName = 'Checkbox'

export default Checkbox

