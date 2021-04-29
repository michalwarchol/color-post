import React from "react"

interface Props {
    handleModeChange(e: React.ChangeEvent<HTMLInputElement>): void
}

const SelectModes: React.FC<Props> = ({ handleModeChange }) => {
    return (
        <div className="modes d-flex flex-column align-items-center align-items-sm-start" onChange={handleModeChange}>
            <h5>Select color rule mode: </h5>
            <select name="mode">
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="triad">Triad</option>
                <option value="complementary">Complementary</option>
                <option value="shades">Shades</option>
            </select>
        </div>
    )
}

export default SelectModes;