import * as Storybook from '@storybook/react'
import { text, select, boolean, } from '@storybook/addon-knobs'
import * as React from 'react'

import TextInput from './TextInput.jsx'
import Icon from '../Icon/Icon.jsx'

const INDICATOR_VALUES = {
	None: 'none',
	'Simple text': 'simple',
	'Markup text': 'markup',
}

const INDICATORS = {
	none: false,
	simple: 'foo',
	markup: (
		<Icon
			name="search"
		/>
	)
}

Storybook
	.storiesOf('Tesseract Web', module)
	.add('TextInput', () => (
		<TextInput
			label={text('Label', 'Foobar')}
			placeholder={text('Placeholder', 'Bazquux')}
			hint={text('Hint', 'e.g. Fooquux')}
			size={select('Size', 'small medium large'.split(' '), 'medium')}
			indicator={INDICATORS[select('Indicator', INDICATOR_VALUES, 'none')]}
			block={boolean('Block', false)}
		/>
	))
