import React from 'react'
import Button from "../Button/Button";

interface Props {
	handleModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButtonModes: React.FC<Props> = ({ handleModeChange }) => {
	const savePattern = () => {
		//todo
		console.log("save pattern");
	}

	const createCustomPattern = () => {
		//todo
		console.log("customized pattern");
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

export default RadioButtonModes;