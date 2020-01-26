import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

const Base = styled('h1')({
	margin: 0,
	display: 'grid',
	placeContent: 'center',
	fontSize: '5rem',
	fontWeight: 'inherit',
})

const LiteralDisplay = ({
	literal = '',
	...etcProps
}) => (
	<Base
		{...etcProps}
	>
		{literal}
	</Base>
)

LiteralDisplay.propTypes = {
	literal: PropTypes.string,
}

export default LiteralDisplay
