import React, { useEffect, useState } from 'react'

interface Props {
    id: number,
    mode: string,
    handleRangeInput(value: number): void
}

const RangeInput: React.FC<Props> = ({ id, mode, handleRangeInput }) => {

    const [value, setValue] = useState<number>(100);

    useEffect(() => {
        if (mode == "shades") {
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
        <><input type="range" min="0" max="100" value={value} onChange={handleInput}/>{value}</>
    )
}

export default RangeInput;