import React from "react"
import Button from "../Button/Button";

interface Props {
    handleModeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    createCustomPattern: () => void
}

const SelectModes: React.FC<Props> = ({ handleModeChange, createCustomPattern }) => {


    const savePattern = () => {
        //todo
        console.log("save pattern");
    }
    return (
        <div className="modes d-flex flex-row justify-content-around" onChange={handleModeChange}>
            <div className="d-flex flex-column">
                <h5>Select color rule mode: </h5>
                <select name="mode">
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="triad">Triad</option>
                    <option value="complementary">Complementary</option>
                    <option value="shades">Shades</option>
                </select>
            </div>
            <div className="d-flex flex-row">
                <Button text="save pattern" handleClick={savePattern} />
                <Button text="create custom pattern" handleClick={createCustomPattern} />
            </div>
        </div>
    )
}

export default SelectModes;