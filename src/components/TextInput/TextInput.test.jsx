import * as fc from 'fast-check'
import * as Enzyme from 'enzyme'
import * as React from 'react'

import TextInput from './TextInput.jsx'

describe('components/TextInput', () => {
	it('should render a base element to put interactive elements on', () => {
		const wrapper = Enzyme.mount(
			<TextInput />
		)

		expect(
			wrapper
				.find('label')
		).toHaveLength(1)
	})

	it('should render an element to input text on', () => {
		const wrapper = Enzyme.mount(
			<TextInput />
		)

		expect(
			wrapper
				.find('label')
				.find('input')
		).toHaveLength(1)
	})

	describe('on aiding user input', () => {
		it('should render a label to indicate the nature of the component\'s value', () => {
			const wrapper = Enzyme.mount(
				<TextInput
					label="foo"
				/>
			)

			expect(
				wrapper
					.find('label')
					.find('span')
			).toHaveLength(1)
		})

		it('should render the label', () => {
			fc.assert(
				fc.property(
					fc.anything().filter(v => !Array.isArray(v)),
					label => {
						const wrapper = Enzyme.mount(
							<TextInput
								label={label}
							/>
						)

						expect(
							wrapper
								.find('label')
								.find('span')
								.first()
								.text()
						).toBe(
							typeof label !== 'undefined' && label !== null
								? label.toString()
								: ''
						)
					}
				)
			)
		})
	})

	it('should render the rest of the passed props', () => {
		const wrapper = Enzyme.mount(
			<TextInput
				placeholder="foo"
			/>
		)

		expect(
			wrapper
				.find('label')
				.find('input')
				.prop('placeholder')
		).toBe('foo')
	})

	it('should render a hint for describing valid input values', () => {
		fc.assert(
			fc.property(
				fc.anything().filter(v => !Array.isArray(v)),
				label => {
					const wrapper = Enzyme.mount(
						<TextInput
							hint={label}
						/>
					)

					expect(
						wrapper
							.find('div')
							.childAt(2)
							.find('span')
							.text()
					).toBe(
						typeof label !== 'undefined' && label !== null
							? label.toString()
							: ''
					)
				}
			)
		)
	})

	it('should render an indicator as additional description for the content', () => {
		const wrapper = Enzyme.mount(
			<TextInput
				indicator="foobar"
			/>
		)

		expect(
			wrapper
				.find('div')
				.childAt(3)
				.text()
		).toBe('foobar')
	})

	describe('on being declared a block component', () => {
		const BLOCK_DISPLAYS = [
			'block',
			'grid',
			'flex',
			'table',
		]

		it('should render the base element fullwidth', () => {
			const wrapper = Enzyme.mount(
				<TextInput block />
			)

			const { display, } = wrapper.find('div').prop('style')

			expect(BLOCK_DISPLAYS).toContain(display)
		})

		it('should render the input fullwidth', () => {
			const wrapper = Enzyme.mount(
				<TextInput block />
			)

			const { width, } = wrapper
				.find('label')
				.find('input')
				.prop('style')

			expect(width).toBe('100%')
		})

		it('should render the input as block element', () => {
			const wrapper = Enzyme.mount(
				<TextInput block />
			)

			const { display, } = wrapper
				.find('label')
				.find('input')
				.prop('style')

			expect(BLOCK_DISPLAYS).toContain(display)
		})
	})
})
