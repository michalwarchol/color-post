import React from 'react'
import { connect } from 'react-redux'
import { StateType, ColorType } from "../../reducers/types"
import { decToHex } from "../ColorWheel/ColorWheelController"

import RangeInput from "../RangeInput/RangeInput"

interface Props {
    id: number,
    mode: string,
    colors: ColorType[],
    active: number | null,
    setActive(id: number): void,
    shades: number[],
    setShade: React.Dispatch<React.SetStateAction<number[]>>
}

const Square: React.FC<Props> = ({ id, mode, colors, active, setActive, shades, setShade }) => {

    const handleRangeInput = (value: number) => {
        let shadesArray = shades.concat();
        shadesArray[id]=value;
        setShade(shadesArray);
    }

    const handleClick = () => {
        setActive(id);
    }

    return (
        <div className="colorSquare d-flex flex-column col-2 align-items-center">
            <div className="square"
                onClick={handleClick}
                style={{
                    background: "rgb(" + Math.floor(colors[id].r * shades[id] / 100) + "," +
                        Math.floor(colors[id].g * shades[id] / 100) + "," +
                        Math.floor(colors[id].b * shades[id] / 100) + ")",
                    border: id === active ? "2px solid #1e2022" : undefined
                }}>
            </div>{active === null && 
            <>
                <span className="hexValue">
                    #{decToHex(Math.floor(colors[id].r * shades[id] / 100))}
                    {decToHex(Math.floor(colors[id].g * shades[id] / 100))}
                    {decToHex(Math.floor(colors[id].b * shades[id] / 100))}
                </span>
                <span className="rgbValue">
                    {"rgb(" + Math.floor(colors[id].r * shades[id] / 100) + "," + Math.floor(colors[id].g * shades[id] / 100) + "," + Math.floor(colors[id].b * shades[id] / 100) + ")"}
                </span>
                <div className="brightnessValue d-flex align-items-center justify-content-center">
                    &#9728;<RangeInput id={id} mode={mode} handleRangeInput={handleRangeInput} initialValue={shades[id]}/>
                </div>
            </>
            }
        </div>
    )
}

const mapStateToProps = (state: StateType) => ({
    colors: state.colors
})

export default connect(mapStateToProps)(Square);