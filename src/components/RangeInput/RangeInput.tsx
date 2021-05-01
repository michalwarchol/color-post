import React, { useEffect, useState } from 'react'
import Modes from "../modes";

interface Props {
    id: number,
    mode: Modes,
    handleRangeInput(value: number): void,
    initialValue: number
}

const RangeInput: React.FC<Props> = ({ id, mode, handleRangeInput, initialValue }) => {

    const [value, setValue] = useState<number>(initialValue);

    useEffect(()=>{
        setValue(initialValue);
    }, [initialValue])

    useEffect(() => {
        if (mode == Modes.SHADES) {
            handleRangeInput(100 - (id) * 15);
            setValue(100 - (id) * 15);
        }else{
            handleRangeInput(100);
            setValue(100);
        }
    }, [mode])

    const handleInput = (event: React.SyntheticEvent) => {
        handleRangeInput(parseInt((event.target as HTMLInputElement).value))
        setValue(parseInt((event.target as HTMLInputElement).value))
    }

    return (
        <input type="range" min="0" max="100" value={value} onChange={handleInput}/>
    )
}

export default RangeInput;