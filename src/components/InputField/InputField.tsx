import React from "react";

type Props = {
    label: string;
    name: string;
    type: string;
    error: string;
    value: string;
    onChange(e: React.FormEvent<HTMLInputElement>): void;
}

const InputField: React.FC<Props> = ({label, name, type, error, value, onChange}) => {
    return(
        <div className="inputField d-flex flex-column">
            <label htmlFor={name}>{label}</label>
            <input
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              style={error.length>0?{borderColor: "#e5383b"}:{borderColor: "#222429"}}
            />
            <span>{error}</span>
        </div>
    )
}

export default InputField;