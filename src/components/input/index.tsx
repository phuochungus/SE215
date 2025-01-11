import React, { FC, ChangeEvent } from 'react';

interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Input: FC<InputProps> = ({ type = "text", placeholder, value, onChange, className }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
        />
    );
};

export default Input;