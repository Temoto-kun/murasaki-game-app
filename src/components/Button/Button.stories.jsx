import * as Storybook from '@storybook/react'
import { boolean, select, text } from '@storybook/addon-knobs'
import * as React from 'react'

import Button from './Button.jsx'

Storybook
	.storiesOf('Tesseract Web', module)
	.add('Button', () => (
		<Button
			size={select('Size', 'small medium large'.split(' '), 'medium')}
			variant={select('Variant', 'outline primary'.split(' '), 'outline')}
			block={boolean('Block', false)}
		>
			{text('Label', 'Foobar')}
		</Button>
	))
