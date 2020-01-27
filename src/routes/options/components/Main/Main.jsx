import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

import OptionsForm from '../OptionsForm/OptionsForm.jsx'

const setOptions = (data, e) => {
	console.log(data)
}

const Base = styled('main')({
	padding: '0 1rem',
	boxSizing: 'border-box',
})

const Main = () => {
	return (
		<Base>
			<h1>
				Select Options
			</h1>
			<p>
				Choose how Murasaki selects items from the datasets.
			</p>
			<OptionsForm
				onSubmit={setOptions}
			/>
		</Base>
	)
}

export default Main
