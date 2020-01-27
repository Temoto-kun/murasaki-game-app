import * as React from 'react'
import * as PropTypes from 'prop-types'
import { useForm, } from 'react-hook-form'
import styled from 'styled-components'

import TextInput from '../../../../components/TextInput/TextInput.jsx'
import Button from '../../../../components/Button/Button.jsx'

const Form = styled('form')({
	'@media (min-width: 720px)': {
		display: 'flex',
	},
})

const Fieldset = styled('fieldset')({
	display: 'contents',
})

const Legend = styled('legend')({
	position: 'absolute',
	left: -999999,
	width: 1,
	height: 1,
})

const TextInputWrapper = styled('div')({
	flex: 'auto',
	marginBottom: '1rem',
	'@media (min-width: 720px)': {
		marginRight: '1rem',
		marginBottom: 0,
	},
})

const ButtonWrapper = styled('div')({

})

const AnswerForm = ({
	onSubmit,
	...etcProps
}) => {
	const { handleSubmit, register, } = useForm()
	return (
		<Form
			{...etcProps}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Fieldset>
				<Legend>
					Answer
				</Legend>
				<TextInputWrapper>
					<TextInput
						label="Answer"
						type="text"
						name="answer"
						autoComplete="off"
						block
						ref={register}
					/>
				</TextInputWrapper>
				<ButtonWrapper>
					<Button
						variant="primary"
						type="submit"
						block
					>
						Submit
					</Button>
				</ButtonWrapper>
			</Fieldset>
		</Form>
	)
}

AnswerForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}

export default AnswerForm
