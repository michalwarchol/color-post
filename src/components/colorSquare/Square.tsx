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
        <div className="d-flex flex-column">
        <div className="square" style={{ background: "rgb("+
                                                        Math.floor(colors[id].r*shade/100)+","+
                                                        Math.floor(colors[id].g*shade/100)+","+
                                                        Math.floor(colors[id].b*shade/100)+")" }}>
        </div>
        <div>#{decToHex(Math.floor(colors[id].r*shade/100))}{decToHex(Math.floor(colors[id].g*shade/100))}{decToHex(Math.floor(colors[id].b*shade/100))}</div>
        <div>
        {"rgb("+Math.floor(colors[id].r*shade/100)+","+Math.floor(colors[id].g*shade/100)+","+Math.floor(colors[id].b*shade/100)+")"}
        </div>
        <RangeInput id={id} mode={mode} handleRangeInput={handleRangeInput}/>
        </div>
    )
}

const mapStateToProps = (state: StateType) => ({
    colors: state.colors
})

export default connect(mapStateToProps)(Square);