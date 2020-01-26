import * as fc from 'fast-check'
import * as Enzyme from 'enzyme'
import * as React from 'react'

import Button from './Button.jsx'

const CUSTOM_VARIANTS = ['primary']
const AVAILABLE_VARIANTS = [
	'outline',
	'primary',
	'unknown' // undefined button variant, should be the same with 'outline'
]
const BLOCK_DISPLAYS = [
	'block',
	'grid',
	'flex',
	'table',
]

describe('components/Button', () => {
	it('should render without crashing', () => {
		expect(() => <Button />).not.toThrow()
	})

	describe('on aiding with component behavior', () => {
		it('should render a label', () => {
			fc.assert(
				fc.property(
					fc.anything().filter(v => !Array.isArray(v)),
					label => {
						const wrapper = Enzyme.mount(
							<Button>
								{label}
							</Button>
						)

						expect(wrapper.text()).toBe(
							typeof label !== 'undefined' && label !== null
								? label.toString()
								: ''
						)
					}
				)
			)
		})
	})

	describe('on providing contextual clarity', () => {
		describe.each(AVAILABLE_VARIANTS)('on variants (variant=%p)', variant => {
			// silence console.error() from prop type validation since
			// we're checking for unknown variants
			const originalConsoleError = console.error
			console.error = () => {}
			const wrapper = Enzyme.mount(
				<Button variant={variant} />
			)
			console.error = originalConsoleError

			const button = wrapper.find('button')
			const buttonStyles = button.prop('style')

			it('should render background color', () => {
				if (CUSTOM_VARIANTS.includes(variant)) {
					expect(buttonStyles.backgroundColor).not.toBe('transparent')
					return
				}

				expect(buttonStyles.backgroundColor).toBe('transparent')
			})

			it('should render border color', () => {
				expect(typeof buttonStyles.borderColor).toBe('string')
			})

			it('should render color', () => {
				expect(typeof buttonStyles.color).toBe('string')
			})
		})
	})

	it('should render fullwidth when declared as block', () => {
		const wrapper = Enzyme.mount(
			<Button block />
		)

		const { width, } = wrapper.find('button').prop('style')

		expect(width).toBe('100%')
	})

	it('should render as block element when declared as block', () => {
		const wrapper = Enzyme.mount(
			<Button block />
		)

		const { display, } = wrapper.find('button').prop('style')

		expect(BLOCK_DISPLAYS).toContain(display)
	})
})
