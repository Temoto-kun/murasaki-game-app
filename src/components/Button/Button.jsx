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
})

/**
 * Component for performing an action upon activation (e.g. when clicked).
 */
const Button = ({
	size = 'medium',
	variant = 'outline',
	block = false,
	children,
	...etcProps
}) => {
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

	const { [variant]: theVariantStyleSet = defaultVariantStyleSet, } = variantStyleSets

	return (
		<Base
			{...etcProps}
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
	 * Text to identify the action associated upon activation of the component.
	 */
	children: PropTypes.any,
}

Button.displayName = 'Button'

export default Button
