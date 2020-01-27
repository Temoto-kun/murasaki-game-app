import * as React from 'react'
import * as PropTypes from 'prop-types'

import styled, { themable, } from '../../services/themable.js'

const MIN_HEIGHTS = {
	small: '2.5rem',
	medium: '3rem',
	large: '4rem',
}

const Base = styled('button')({
	appearance: 'none',
	padding: '0 2rem',
	font: 'inherit',
	fontFamily: 'var(--font-family-base)',
	textTransform: 'uppercase',
	fontWeight: 'bolder',
	borderWidth: '0.125rem',
	borderStyle: 'solid',
	borderRadius: '0.25rem',
	placeContent: 'center',
	cursor: 'pointer',
	textDecoration: 'none',
	boxSizing: 'border-box',
	':disabled': {
		opacity: 0.5,
	},
})

const defaultVariantStyleSet = {
	...themable('background-color', 'transparent'),
	...themable('border-color', 'var(--color-primary, currentColor)'),
	...themable('color', 'var(--color-primary, currentColor)'),
}
const variantStyleSets = {
	outline: defaultVariantStyleSet,
	primary: {
		...themable('background-color', 'var(--color-primary, currentColor)'),
		...themable('border-color', 'var(--color-primary, currentColor)'),
		...themable('color', 'var(--color-primary-inverse, white)'),
	}
}

/**
 * Component for performing an action upon activation (e.g. when clicked).
 */
const Button = ({
	as = 'button',
	size = 'medium',
	variant = 'outline',
	block = false,
	disabled = false,
	children,
	...etcProps
}) => {
	const { [variant]: theVariantStyleSet = defaultVariantStyleSet, } = variantStyleSets

	return (
		<Base
			{...etcProps}
			as={disabled ? 'button' : as}
			disabled={disabled}
			style={{
				...theVariantStyleSet,
				minHeight: MIN_HEIGHTS[size],
				width: block ? '100%' : null,
				display: block ? 'grid' : 'inline-grid',
			}}
		>
			{typeof children !== 'undefined' && children !== null ? String(children) : ''}
		</Base>
	)
}

Button.propTypes = {
	/**
	 * The resulting rendered element or component represented by this component.
	 */
	as: PropTypes.elementType,
	/**
	 * Size of the component.
	 */
	size: PropTypes.oneOf(['small', 'medium', 'large', ]),
	/**
	 * Variant of the component.
	 */
	variant: PropTypes.oneOf(['outline', 'primary']),
	/**
	 * Should the component take up the remaining space parallel to the content flow?
	 */
	block: PropTypes.bool,
	/**
	 * Is component unable to be activated?
	 */
	disabled: PropTypes.bool,
	/**
	 * Text to identify the action associated upon activation of the component.
	 */
	children: PropTypes.any,
}

Button.displayName = 'Button'

export default Button
