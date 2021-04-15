import React from 'react'
import { connect } from "react-redux"
import { StateType, ColorType } from "../../reducers/types";
import Button from "../Button/Button";

interface Props {
	handleModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	createCustomPattern: () => void
	palette: ColorType[]
}

const RadioButtonModes: React.FC<Props> = ({ handleModeChange, palette, createCustomPattern }) => {
	const savePattern = () => {
		fetch("/api/v1/palette/create", {
			method: "post",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				palette: palette
			})
		}).then(response => {
			console.log(response)
			if (response.redirected == true) {
				location.assign(response.url)
			}
		}).catch(err => {
			console.log(err)
		})
	}

	return (
		<div className="modes d-flex flex-column col-3" onChange={handleModeChange}>
			<h5>Select color rule mode: </h5>
			<div className="radioButton d-flex flex-row align-items-center">
				<input type="radio" name="mode" value="primary" id="primary" defaultChecked /><label htmlFor="primary">Primary</label>
			</div>
			<div className="radioButton d-flex flex-row align-items-center">
				<input type="radio" name="mode" value="secondary" id="secondary" /><label htmlFor="secondary">Secondary</label>
			</div>
			<div className="radioButton d-flex flex-row align-items-center">
				<input type="radio" name="mode" value="triad" id="triad" /><label htmlFor="triad">Triad</label>
			</div>
			<div className="radioButton d-flex flex-row align-items-center">
				<input type="radio" name="mode" value="complementary" id="complementary" /><label htmlFor="complementary">Complementary</label>
			</div>
			<div className="radioButton d-flex flex-row align-items-center">
				<input type="radio" name="mode" value="shades" id="shades" /><label htmlFor="shades">Shades</label>
			</div>
			<Button text="save pattern" handleClick={savePattern} />
			<Button text="create custom pattern" handleClick={createCustomPattern} />
		</div>
	)
}

const mapStateToProps = (state: StateType) => ({
	palette: state.colors
})

export default connect(mapStateToProps)(RadioButtonModes);