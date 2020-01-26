import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled('div')({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	display: 'grid',
	placeContent: 'center',
})

const Loading = ({
	message = 'Loading...',
}) => (
	<Wrapper>
		{message}
	</Wrapper>
)

Loading.propTypes = {
	message: PropTypes.string,
}

export default Loading
