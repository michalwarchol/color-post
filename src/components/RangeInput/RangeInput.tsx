import React, { useState } from 'react'

interface Props {
    handleRangeInput(value: number): void
}

const RangeInput: React.FC<Props> = ({handleRangeInput}) => {

    const [value, setValue] = useState<number>(128);

    const handleInput = (event: React.SyntheticEvent) => {
        handleRangeInput(parseInt((event.target as HTMLInputElement).value))
        setValue(parseInt((event.target as HTMLInputElement).value))
    }

    return (
        <><input type="range" min="0" max="255" value={value} onChange={handleInput} />{value}</>
    )
}

export default RangeInput;