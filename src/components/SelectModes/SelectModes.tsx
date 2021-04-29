import React from "react"
import { connect } from "react-redux"
import { StateType, ColorType } from "../../reducers/types";
import Button from "../Button/Button";

interface Props {
    handleModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    createCustomPattern: () => void
    palette: ColorType[]
}

const SelectModes: React.FC<Props> = ({ handleModeChange, createCustomPattern, palette }) => {


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
        <div className="modes d-flex flex-column flex-md-row justify-content-center" onChange={handleModeChange}>
            <div className="d-flex flex-column align-items-center">
                <h5>Select color rule mode: </h5>
                <select name="mode">
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="triad">Triad</option>
                    <option value="complementary">Complementary</option>
                    <option value="shades">Shades</option>
                </select>
            </div>
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
                <Button text="save pattern" handleClick={savePattern} />
                <Button text="create custom" handleClick={createCustomPattern} />
            </div>
        </div>
    )
}

const mapStateToProps = (state: StateType) => ({
	palette: state.colors
})

export default connect(mapStateToProps)(SelectModes);