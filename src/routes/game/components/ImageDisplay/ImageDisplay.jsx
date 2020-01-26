import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

const Base = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridTemplateRows: 'repeat(2, 1fr)',
	'@media (min-width: 640px)': {
		gridTemplateColumns: 'repeat(4, 1fr)',
		gridTemplateRows: 'repeat(1, 1fr)',
	},
})

const ImageWrapper = styled('div')({
	width: '100%',
	height: '100%',
	position: 'relative',
})

const Image = styled('img')({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	display: 'block',
	height: '100%',
	objectFit: 'cover',
	objectPosition: 'center',
})

const ImageDisplay = ({
	images = [],
	...etcProps
}) => (
	<Base
		{...etcProps}
	>
		{
			images.map(i => (
				<ImageWrapper
					key={i.src}
				>
					<Image
						src={i.src}
						alt={i.alt}
					/>
				</ImageWrapper>
			))
		}
	</Base>
)

ImageDisplay.propTypes = {
	images: PropTypes.arrayOf(PropTypes.object),
}

export default ImageDisplay
