import * as fc from 'fast-check'
import * as Enzyme from 'enzyme'
import * as React from 'react'
import Checkbox from './Checkbox.jsx'

describe('components/Checkbox', () => {
	it('should render without errors', () => {
		expect(() => <Checkbox />).not.toThrow()
	})

	it('should render a label to describe the intrinsic value of the component', () => {
		fc.assert(
			fc.property(
				fc.anything().filter(v => !Array.isArray(v)),
				label => {
					const wrapper = Enzyme.mount(
						<Checkbox
							label={label}
						/>
					)

					let expectedLabelText

					if (
						label === null
						|| typeof label === 'undefined'
					) {
						expectedLabelText = ''
					} else {
						expectedLabelText = label.toString()
					}

					expect(
						wrapper
							.find('label')
							.children()
							.last()
							.text()
					)
						.toBe(expectedLabelText)
				}
			),
		)
	})
})
