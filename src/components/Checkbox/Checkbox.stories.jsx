import * as Storybook from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import * as React from 'react'

import Checkbox from './Checkbox.jsx'

Storybook
	.storiesOf('Tesseract Web', module)
	.add('Checkbox', () => (
		<Checkbox
			label={text('Label', 'Foobar')}
		/>
	))
