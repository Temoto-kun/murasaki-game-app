import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

const ReadingButton = styled('button')({
	border: 0,
	padding: '1rem',
	font: 'inherit',
	lineHeight: 'inherit',
})

const ReadingsList = ({
	reading,
	match: {
		params: {
			type,
		},
	},
}) => {
	const [readings, setReadings, ] = React.useState([])

	React.useEffect(() => {
		const theReadings = reading
			.filter(r => r['@_r_type'] === type)
			.map(r => r['#text'])

		setReadings(theReadings)
	}, [reading, type, ])

	return (
		<div>
			{
				readings.map(r => (
					<ReadingButton
						key={r}
						type="button"
					>
						{r}
					</ReadingButton>
				))
			}
		</div>
	)
}

ReadingsList.propTypes = {
	reading: PropTypes.arrayOf(PropTypes.object),
	match: PropTypes.shape({
		params: PropTypes.shape({
			type: PropTypes.string,
		}),
	}),
}

export default ReadingsList
