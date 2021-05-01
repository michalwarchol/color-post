import React from "react"
import Modes from "../modes";

interface Props {
    handleModeChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const SelectModes: React.FC<Props> = ({ handleModeChange }) => {
    return (
        <div className="modes d-flex flex-column align-items-center align-items-sm-start" onChange={handleModeChange}>
            <h5>Select color rule mode: </h5>
            <select name="mode">
                <option value={Modes.PRIMARY}>Primary</option>
                <option value={Modes.SECONDARY}>Secondary</option>
                <option value={Modes.TRIAD}>Triad</option>
                <option value={Modes.COMPLEMENTARY}>Complementary</option>
                <option value={Modes.SHADES}>Shades</option>
            </select>
        </div>
    )
}

export default SelectModes;