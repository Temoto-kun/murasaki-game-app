import * as Storybook from '@storybook/react'
import { text, select, boolean, } from '@storybook/addon-knobs'
import * as React from 'react'

import Select from './Select.jsx'

const OPTION_VALUES = {
	Ungrouped: 'ungrouped',
	Grouped: 'grouped',
}

const OPTIONS = {
	ungrouped: [
		<option>Foo</option>,
		<option>Bar</option>,
		<option>Baz</option>,
		<option>Looooong loooooooooong optiooooooooooooon</option>,
	],
	grouped: [
		<option>Foo</option>,
		<optgroup label="Group 1">
			<option>Bar</option>
			<option>Baz</option>
		</optgroup>,
		<optgroup label="Group 2">
			<option>Quux</option>
			<option>Quuux</option>
			<option>Quuuux</option>
		</optgroup>
	]
}

Storybook
	.storiesOf('Tesseract Web', module)
	.add('Select', () => (
		<Select
			label={text('Label', 'Foobar')}
			placeholder={text('Placeholder', 'Bazquux')}
			hint={text('Hint', 'e.g. Fooquux')}
			size={select('Size', 'small medium large'.split(' '), 'medium')}
			block={boolean('Block', false)}
			multiple={boolean('Multiple', false)}
		>
			{OPTIONS[select('Options', OPTION_VALUES, 'ungrouped')]}
		</Select>
	))
