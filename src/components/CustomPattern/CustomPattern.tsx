import React, { useState } from 'react'
import Button from "../Button/Button"
import { ColorType } from "../../reducers/types";
import { hexToRGB } from "../ColorWheel/ColorWheelController";

interface ColorSelectorProps {
    name: string,
    color: string,
    setColor: React.Dispatch<React.SetStateAction<string>> 
}
//input color component with important data
const ColorSelector: React.FC<ColorSelectorProps> = ({name, color, setColor}) => {
    return (
        <div className="color col-6 d-flex flex-row justify-content-around">
            <div className="d-flex flex-column align-items-center col-6">
                <span>{name}</span>
                <input type="color" onChange={e => setColor(e.target.value)} />
                <span>{color}</span>
                <span>rgb({hexToRGB(color).r},{hexToRGB(color).g},{hexToRGB(color).b})</span>
            </div>
            <div className="square" style={{ background: color }}></div>
        </div>
    )
}



interface Props {
    cancel: () => void,
    saveCustom(palette: ColorType[]): void
}

const CustomPattern: React.FC<Props> = ({ cancel, saveCustom }) => {

    const [color1, setColor1] = useState<string>("#000000");
    const [color2, setColor2] = useState<string>("#000000");
    const [color3, setColor3] = useState<string>("#000000");
    const [color4, setColor4] = useState<string>("#000000");
    const [color5, setColor5] = useState<string>("#000000");

    const save = () => {
        const rgbPalette = [
            hexToRGB(color1),
            hexToRGB(color2),
            hexToRGB(color3),
            hexToRGB(color4),
            hexToRGB(color5)
        ]
        console.log(rgbPalette)
        saveCustom(rgbPalette)
    }
    return (
        <div className="customPattern d-flex justify-content-center align-items-center">
            <div className="innerCustomPattern">
                <div className="header">
                    <h1>Custom Pattern Creator</h1>
                </div>
                <div className="colors d-flex flex-column justify-content-center align-items-center">

                    <ColorSelector name="color 1" color={color1} setColor={setColor1}/>
                    <ColorSelector name="color 2" color={color2} setColor={setColor2}/>
                    <ColorSelector name="color 3" color={color3} setColor={setColor3}/>
                    <ColorSelector name="color 4" color={color4} setColor={setColor4}/>
                    <ColorSelector name="color 5" color={color5} setColor={setColor5}/>
                    
                </div>
                <div className="buttons d-flex flex-row justify-content-center">
                    <Button text="Cancel" handleClick={cancel} />
                    <Button text="Save" handleClick={save} />
                </div>
                <div className="warning"><span>You need to be logged in to add a custom pattern.</span></div>
            </div>
        </div>
    )
}

export default CustomPattern;