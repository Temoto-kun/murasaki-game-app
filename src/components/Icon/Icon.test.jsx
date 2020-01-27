import * as Enzyme from 'enzyme'
import * as React from 'react'

import Icon from './Icon.jsx'

describe('components/Icon', () => {
	it('should render without crashing', () => {
		expect(() => <Icon name="foo"/>).not.toThrow()
	})

	test.each([
		'check',
		'caret-down',
		'search',
	])('should render the icon (name=%p)', name => {
		const wrapper = Enzyme.shallow(
			<Icon name={name} />
		)

		expect(wrapper.find('span').at(0).children().length > 0).toBe(true)
	})

	it('should render null for an unknown icon name', () => {
		const wrapper = Enzyme.shallow(
			<Icon name="" />
		)

		expect(wrapper.getElement()).toBe(null)
	})
})
