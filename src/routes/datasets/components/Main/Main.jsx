import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../../../../components/Button/Button.jsx'

const Base = styled('main')({
	padding: '0 1rem',
	boxSizing: 'border-box',
})

const Main = ({
	dataset,
}) => {
	return (
		<Base>
			<h1>
				Manage Datasets
			</h1>
			<h2>
				Kanji
			</h2>
			<React.Fragment>
				<p>
					Select a JSON file containing the kanji data.
					You may download up-to-date files in this <a href="#" target="_blank">GitHub page</a>.
				</p>
				<p>
					The integrity of the files are ensured as it is uploaded.
				</p>
			</React.Fragment>
			<React.Fragment>
				<p>
					<Button
						disabled
					>
						Update
					</Button>
				</p>
				<p>
					Your dataset is up-to-date
					(<time>2020-01-27 04:20:00</time>).
				</p>
			</React.Fragment>
			<h3>Local Data</h3>
			<p>
				You may delete local data by clicking the button below.
				If the button is disabled, it means there is no data currently saved.
			</p>
			<Button
				disabled
			>
				Delete
			</Button>
			<p>
				Upon deletion of the data, you may need to re-upload the data after retrieving it from
				the link above!
			</p>
			<h2>
				Stroke Order
			</h2>
			<p>
				Select a ZIP file containing stroke order data.
				You may download up-to-date files in this <a href="#" target="_blank">GitHub repository</a>.
			</p>
		</Base>
	)
}

export default Main
