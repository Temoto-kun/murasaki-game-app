import * as React from 'react'
import * as PropTypes from 'prop-types'

/**
 * Component for displaying graphical icons.
 */
const Icon = ({ name, size = '1.5rem', style, ...etcProps }) => {
	switch (name) {
		case 'check':
			return (
				<span
					{...etcProps}
					style={{
						...style,
						display: 'inline-block',
						boxSizing: 'border-box',
						width: size,
						height: size,
						textAlign: 'center',
						verticalAlign: 'middle',
						lineHeight: 1,
						//placeContent: 'center',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							borderStyle: 'solid',
							borderWidth: '0 0.125rem 0.125rem 0',
							boxSizing: 'border-box',
							width: '25%',
							height: '50%',
							transform: 'rotate(45deg)',
							transformOrigin: 'left',
							verticalAlign: 'middle',
							marginRight: '-0.125rem',
						}}
					/>
				</span>
			)
		case 'caret-down':
			return (
				<span
					{...etcProps}
					style={{
						...style,
						display: 'inline-block',
						boxSizing: 'border-box',
						width: size,
						height: size,
						textAlign: 'center',
						verticalAlign: 'middle',
						lineHeight: 1,
						//placeContent: 'center',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							borderStyle: 'solid',
							borderWidth: '0 0.125rem 0.125rem 0',
							boxSizing: 'border-box',
							width: '50%',
							height: '50%',
							transform: 'rotate(45deg)',
							verticalAlign: 'middle',
						}}
					/>
				</span>
			)
		case 'search':
			return (
				<span
					{...etcProps}
					style={{
						...style,
						display: 'inline-block',
						boxSizing: 'border-box',
						width: size,
						height: size,
						textAlign: 'center',
						verticalAlign: 'middle',
						lineHeight: 1,
						//placeContent: 'center',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							width: '100%',
							height: '100%',
							transform: 'rotate(-45deg)',
							verticalAlign: 'middle',
						}}
					>
						<span
							style={{
								display: 'block',
								margin: '0 auto',
								borderStyle: 'solid',
								borderWidth: '0.125rem',
								boxSizing: 'border-box',
								width: '60%',
								height: '60%',
								borderRadius: '50%',
							}}
						/>
						<span
							style={{
								display: 'block',
								margin: '0 auto',
								backgroundColor: 'currentColor',
								boxSizing: 'border-box',
								width: '0.125rem',
								height: '40%',
							}}
						/>
					</span>
				</span>
			)
		default:
			break
	}
	return null
}

Icon.propTypes = {
	/**
	 * Name of the icon to display.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * Size of the icon. This controls both the width and the height.
	 */
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number, ]),
	/**
	 * CSS style of the icon. For icon dimensions, use `size` instead.
	 */
	style: PropTypes.object,
}

Icon.displayName = 'Icon'

export default Icon
