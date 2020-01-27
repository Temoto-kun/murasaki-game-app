import * as React from 'react'
import { useForm, } from 'react-hook-form'
import styled from 'styled-components'

import Checkbox from '../../../../components/Checkbox/Checkbox.jsx'
import Select from '../../../../components/Select/Select.jsx'
import Button from '../../../../components/Button/Button.jsx'

const CheckboxRow = styled('div')({
	display: 'grid',
	gridGap: '1rem',
	gridTemplateColumns: 'repeat(2, 1fr)',
	'@media (min-width: 540px)': {
		gridTemplateColumns: 'repeat(3, 1fr)',
	},
	'@media (min-width: 720px)': {
		gridTemplateColumns: 'repeat(4, 1fr)',
	},
	'@media (min-width: 900px)': {
		gridTemplateColumns: 'repeat(5, 1fr)',
	},
	'@media (min-width: 1080px)': {
		gridTemplateColumns: 'repeat(6, 1fr)',
	},
})

const CheckboxContainer = styled('div')({

})

const FilterPanel = styled('div')({
	display: 'flex',
	flexWrap: 'wrap',
	margin: '0 -1rem',
})

const FilterFieldset = styled('fieldset')({
	display: 'none',
	width: '100%',
	order: 1,
})

const FilterTab = styled('label')({
	display: 'grid',
	placeContent: 'center',
	height: '3rem',
	order: -1,
	flex: 'auto',
	textAlign: 'center',
	textTransform: 'uppercase',
	paddingBottom: '0.125rem',
	position: 'relative',
	cursor: 'pointer',
	fontWeight: 'bold',
	'::before': {
		display: 'block',
		position: 'absolute',
		bottom: 0,
		content: "''",
		width: '100%',
		height: '0.125rem',
		left: 0,
		backgroundColor: 'currentColor',
		opacity: 0.125,
	},
	'::after': {
		display: 'block',
		position: 'absolute',
		bottom: 0,
		content: "''",
		width: '100%',
		height: '0.125rem',
		left: 0,
		backgroundColor: 'transparent',
	}
})

const FilterLegend = styled('legend')({
	position: 'absolute',
	left: -999999,
	width: 1,
	height: 1,
	overflow: 'hidden',
})

const FilterWrapper = styled('div')({
	width: '100%',
	padding: '0 1rem',
	boxSizing: 'border-box',
})

const FilterCheckbox = styled('input')({
	position: 'absolute',
	left: -999999,
	width: 1,
	height: 1,
	[`:checked + ${FilterTab}`]: {
		color: 'var(--color-primary)',
	},
	[`:checked + ${FilterTab}::after`]: {
		backgroundColor: 'var(--color-primary)',
	},
	[`:checked + ${FilterTab} + ${FilterFieldset}`]: {
		display: 'contents',
	}
})

const Section = styled('section')({
	margin: '1rem 0',
})

const OptionsForm = ({
	onSubmit,
}) => {
	const { handleSubmit, register, watch, setValue, } = useForm({
		filter: 'jlpt',
	})

	const filter = watch('filter')

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
		>
			<FilterPanel>
				<FilterCheckbox
					id="filterJlpt"
					type="radio"
					name="filter"
					value="jlpt"
					ref={register}
					onClick={() => {
						setValue('jouyou', [])
						setValue('jlpt', [])
					}}
				/>
				<FilterTab
					htmlFor="filterJlpt"
				>
					JLPT Level
				</FilterTab>
				<FilterFieldset
					disabled={filter !== 'jlpt'}
				>
					<FilterLegend>
						JLPT Level
					</FilterLegend>
					<FilterWrapper>
						<p>
							Murasaki will select items based on their appearance from the
							Japanese Language Proficiency Test levels (N5 being the easiest).
						</p>
						<CheckboxRow>
							<CheckboxContainer>
								<Checkbox
									name="jlpt"
									value="n1"
									label="N1"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jlpt"
									value="n2"
									label="N2"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jlpt"
									value="n3"
									label="N3"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jlpt"
									value="n4"
									label="N4"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jlpt"
									value="n5"
									label="N5"
									ref={register}
								/>
							</CheckboxContainer>
						</CheckboxRow>
					</FilterWrapper>
				</FilterFieldset>
				<FilterCheckbox
					id="filterJouyou"
					type="radio"
					name="filter"
					value="jouyou"
					ref={register}
					onClick={() => {
						setValue('jouyou', [])
						setValue('jlpt', [])
					}}
				/>
				<FilterTab
					htmlFor="filterJouyou"
				>
					Jouyou
				</FilterTab>
				<FilterFieldset
					disabled={filter !== 'jouyou'}
				>
					<FilterLegend>
						Jouyou Grade
					</FilterLegend>
					<FilterWrapper>
						<p>
							Murasaki will select items based on the school grade where the items
							are first introduced.
						</p>
						<CheckboxRow>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="1"
									label="G1"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="2"
									label="G2"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="3"
									label="G3"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="4"
									label="G4"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="5"
									label="G5"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="6"
									label="G6"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="7"
									label="G7"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="8"
									label="G8"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="9"
									label="G9"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="10"
									label="G10"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="11"
									label="G11"
									ref={register}
								/>
							</CheckboxContainer>
							<CheckboxContainer>
								<Checkbox
									name="jouyou"
									value="12"
									label="G12"
									ref={register}
								/>
							</CheckboxContainer>
						</CheckboxRow>
					</FilterWrapper>
				</FilterFieldset>
				<FilterCheckbox
					id="filterAll"
					type="radio"
					name="filter"
					value="all"
					ref={register}
					onClick={() => {
						setValue('jouyou', [])
						setValue('jlpt', [])
					}}
				/>
				<FilterTab
					htmlFor="filterAll"
				>
					All
				</FilterTab>
				<FilterFieldset>
					<FilterLegend>
						All
					</FilterLegend>
					<FilterWrapper>
						<p>
							Murasaki will select any item from the datasets.
						</p>
					</FilterWrapper>
				</FilterFieldset>
			</FilterPanel>
			<Section>
				<Select
					name="limit"
					label="Limit"
					block
					ref={register}
				>
					<option>10</option>
					<option>20</option>
					<option>50</option>
					<option>100</option>
					<option>200</option>
					<option>500</option>
				</Select>
			</Section>
			<Section>
				6355 Kanji
			</Section>
			<Button
				variant="primary"
				block
			>
				Start Game
			</Button>
		</form>
	)
}

export default OptionsForm
