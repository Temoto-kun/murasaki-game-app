import * as Storybook from '@storybook/react'
import * as React from 'react'
import { select, number, } from '@storybook/addon-knobs'

import Icon from './Icon.jsx'

const AVAILABLE_ICONS = [
	'check',
	'caret-down',
	'search',
]

const AVAILABLE_UNITS = [
	'rem',
	'px',
]

const UNIT_RANGES = {
	rem: [1, 5, 0.5],
	px: [12, 64, 4],
}

Storybook
	.storiesOf('Tesseract Web', module)
	.add('Icon', () => {
		const name = select('Name', AVAILABLE_ICONS, 'check')
		const unit = select('Size unit', AVAILABLE_UNITS, 'rem')
		const [min, max, step] = UNIT_RANGES[unit]
		return (
			<Icon
				name={name}
				size={`${number('Size', 1.5, { range: true, min, max, step, })}${unit}`}
			/>
		)
	})
