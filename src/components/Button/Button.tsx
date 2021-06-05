import React from "react"

type ButtonType = 
    "button" |
    "submit" |
    "reset" |
    undefined

interface Props {
    text: string,
    type: ButtonType,
    handleClick: () => void
}

const Button:React.FC<Props> = ({text, type, handleClick}) => {
    return (
        <button className="button" type={type} onClick={handleClick}>
            <span>{text}</span>
        </button>
    )
}

export default Button;