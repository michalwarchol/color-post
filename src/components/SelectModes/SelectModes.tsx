import React from "react"
import Modes from "../modes";
import Select from "react-select"

interface Props {
    handleModeChange(e: Option|null): void
}

type Option = {value: Modes, label: string}

const options: Option[] = [
    {value: Modes.PRIMARY, label: "primary"},
    {value: Modes.SECONDARY, label: "secondary"},
    {value: Modes.TRIAD, label: "triad"},
    {value: Modes.COMPLEMENTARY, label: "complementary"},
    {value: Modes.SHADES, label: "shades"}
]

const SelectModes: React.FC<Props> = ({ handleModeChange }) => {
    return (
        <div className="modes d-flex flex-column align-items-center align-items-sm-start">
            <Select options={options} onChange={handleModeChange} className="customSelect" placeholder="colorwheel mode" />
        </div>
    )
}

export default SelectModes;