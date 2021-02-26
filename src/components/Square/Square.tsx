import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { StateType, ColorType } from "../../reducers/types"
import {decToHex} from "../ColorWheel/ColorWheelController"

import RangeInput from "../RangeInput/RangeInput"

interface Props {
    id: number,
    mode: string,
    colors: ColorType[]
}

const Square: React.FC<Props> = ({ id, mode, colors }) => {

    const [shade, setShade] = useState<number>(100);

    const handleRangeInput = (value: number) => {
        setShade(value);
    }

    useEffect(()=> {
        decToHex(254);
    })

    return (
        <div className="colorSquare d-flex flex-column col-2 align-items-center">
        <div className="square" style={{ background: "rgb("+
                                                        Math.floor(colors[id].r*shade/100)+","+
                                                        Math.floor(colors[id].g*shade/100)+","+
                                                        Math.floor(colors[id].b*shade/100)+")" }}>
        </div>
        <span className="hexValue">
            #{decToHex(Math.floor(colors[id].r*shade/100))}
            {decToHex(Math.floor(colors[id].g*shade/100))}
            {decToHex(Math.floor(colors[id].b*shade/100))}
        </span>
        <span className="rgbValue">
        {"rgb("+Math.floor(colors[id].r*shade/100)+","+Math.floor(colors[id].g*shade/100)+","+Math.floor(colors[id].b*shade/100)+")"}
        </span>
        <div className="brightnessValue d-flex align-items-center justify-content-center">&#9728;<RangeInput id={id} mode={mode} handleRangeInput={handleRangeInput}/></div>
        </div>
    )
}

const mapStateToProps = (state: StateType) => ({
    colors: state.colors
})

export default connect(mapStateToProps)(Square);