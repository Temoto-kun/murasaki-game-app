import * as fc from 'fast-check'
import * as Enzyme from 'enzyme'
import * as React from 'react'
import Select from './Select.jsx'

describe('components/Select', () => {
	it('should render without crashing', () => {
		expect(() => <Select />).not.toThrow()
	})

	it('should render a base element to put interactive elements on', () => {
		const wrapper = Enzyme.mount(
			<Select />
		)

		expect(
			wrapper
				.find('label')
		).toHaveLength(1)
	})

	it('should render a select component for choosing values', () => {
		const wrapper = Enzyme.mount(
			<Select/>
		)

		expect(
			wrapper
				.find('label')
				.find('select')
		).toHaveLength(1)
	})

	describe('on aiding user input', () => {
		it('should render a label to indicate the nature of the component\'s value', () => {
			const wrapper = Enzyme.mount(
				<Select
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
							<Select
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

	it('should render a hint for describing valid input values', () => {
		fc.assert(
			fc.property(
				fc.anything().filter(v => !Array.isArray(v)),
				label => {
					const wrapper = Enzyme.mount(
						<Select
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

	describe('on being declared a block component', () => {
		const BLOCK_DISPLAYS = [
			'block',
			'grid',
			'flex',
			'table',
		]

		it('should render the base element fullwidth', () => {
			const wrapper = Enzyme.mount(
				<Select block />
			)

			const { display, } = wrapper.find('div').prop('style')

			expect(BLOCK_DISPLAYS).toContain(display)
		})

		it('should render the input fullwidth', () => {
			const wrapper = Enzyme.mount(
				<Select block />
			)

			const { width, } = wrapper
				.find('label')
				.find('select')
				.prop('style')

			expect(width).toBe('100%')
		})

		it('should render the input as block element', () => {
			const wrapper = Enzyme.mount(
				<Select block />
			)

			const { display, } = wrapper
				.find('label')
				.find('select')
				.prop('style')

			expect(BLOCK_DISPLAYS).toContain(display)
		})
	})

	describe('on declaring component to have multiple values', () => {
		it('should allow selection of multiple values', () => {
			const wrapper = Enzyme.mount(
				<Select multiple />
			)

			expect(
				wrapper
					.find('label')
					.find('select')
			)
				.toBeTruthy()
		})
	})
})
