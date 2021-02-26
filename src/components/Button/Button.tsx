import React from "react"

interface Props {
    text: string,
    handleClick: () => void
}

const Button:React.FC<Props> = ({text, handleClick}) => {
    return (
        <div className="button" onClick={handleClick}>
            <span>{text}</span>
        </div>
    )
}

export default Button;