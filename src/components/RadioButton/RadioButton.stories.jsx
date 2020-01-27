import * as Storybook from '@storybook/react'
import { array } from '@storybook/addon-knobs'
import * as React from 'react'

import RadioButton from './RadioButton.jsx'

Storybook
	.storiesOf('Tesseract Web', module)
	.add('RadioButton', () => (
		<React.Fragment>
			{
				array('Labels', ['Foo','Bar','Baz'], ',')
					.map(label => (
						<div
							style={{
								margin: '1rem 0',
							}}
							key={Math.random()}
						>
							<RadioButton
								name="group1"
								label={label}
							/>
						</div>
					))
			}
		</React.Fragment>
	))
