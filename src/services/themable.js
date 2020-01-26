import { camelCase, } from 'camel-case'
import { paramCase, } from 'param-case'
import styledBase from 'styled-components'

let values = {}

const styled = (...args) => {
	values = {}
	return styledBase(...args)
}

const themable = (property, value) => {
	const cssProperty = camelCase(property)
	values[cssProperty] = value

	return {
		[cssProperty]: value,
		transitionProperty: Object
			.keys(values)
			.map(p => paramCase(p)).join(','),
	}
}

export {
	styled as default,
	themable
}
