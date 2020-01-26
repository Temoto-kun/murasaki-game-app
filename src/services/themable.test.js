import styled, { themable, } from './themable'

describe('services/themable', () => {
	it('should return a CSS style object', () => {
		styled('div')

		expect(typeof themable('foo', 'bar')).toBe('object')
	})

	it('should include the key as the CSS property in the returned object', () => {
		let cssObject
		styled('div')(cssObject = themable('foo', 'bar'))

		expect(Object.keys(cssObject).includes('foo')).toBe(true)
	})

	it('should include the value as the CSS property value in the returned object', () => {
		let cssObject
		styled('div')(cssObject = themable('foo', 'bar'))

		expect(cssObject['foo']).toBe('bar')
	})

	it('should add the `transitionProperty` key on the result CSS object', () => {
		let cssObject
		styled('div')(cssObject = themable('foo', 'bar'))

		expect(cssObject.transitionProperty).toBe('foo')
	})

	it('should get the most recent value in the returned object when called more than once', () => {
		let cssObject
		styled('div')(cssObject = {
			...themable('foo', 'bar'),
			...themable('foo', 'bar2')
		})

		expect(cssObject['foo']).toBe('bar2')
	})

	it('should not have the `transitionProperty` key on the returned object when `themable` has not been called yet', () => {
		let cssObject
		styled('div')(cssObject = {})

		expect(cssObject.transitionProperty).toBeUndefined()
	})

	it('should get all the themable properties and put it in `transitionProperty` as comma-separated', () => {
		let cssObject
		styled('div')(cssObject = {
			...themable('foo', 'bar'),
			...themable('bar', 'baz')
		})

		expect(cssObject.transitionProperty).toBe('foo,bar')
	})
})
