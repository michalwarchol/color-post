import React from "react"
import {connect} from "react-redux"

import RangeInput from "../RangeInput/RangeInput"
import {StateType, ColorType} from "../../reducers/types";
import {decToHex} from "../ColorWheel/ColorWheelController";

interface Props {
    colors: ColorType[],
    id: number,
    mode: string,
    shades: number[],
    setShade: React.Dispatch<React.SetStateAction<number[]>>
}

const SquareControls:React.FC<Props> = ({colors, id, mode, shades, setShade}) => {

    const handleRangeInput = (value: number) => {
        let shadesArray = shades.concat();
        shadesArray[id]=value;
        setShade(shadesArray);
    }

    return(
        <div className="d-flex flex-column align-items-center">
					<span className="hexValue">
                    #{decToHex(Math.floor(colors[id].r * shades[id] / 100))}
                    {decToHex(Math.floor(colors[id].g * shades[id] / 100))}
                    {decToHex(Math.floor(colors[id].b * shades[id] / 100))}
                </span>
                <span className="rgbValue">
                    {"rgb(" + Math.floor(colors[id].r * shades[id] / 100) + "," + Math.floor(colors[id].g * shades[id] / 100) + "," + Math.floor(colors[id].b * shades[id] / 100) + ")"}
                </span>
                <div className="brightnessValue d-flex align-items-center justify-content-center">&#9728;<RangeInput id={id} mode={mode} handleRangeInput={handleRangeInput} initialValue={shades[id]}/></div>
				</div>
    )
}

const mapStateToProps = (state: StateType) => ({
	colors: state.colors
})

export default connect(mapStateToProps)(SquareControls)