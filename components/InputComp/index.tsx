"use client"
import React, {useState} from 'react';
import {Input} from 'antd';
import styles from './index.module.scss';

type PropsType = {
    inputText: string;
    placeHolderTitle: string;
    name: string;
    onChange?: (name: string, value: string) => void
};

const InputComp = ({inputText, name, placeHolderTitle, onChange}: PropsType) => {
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        if (typeof onChange === "function") {
            onChange(event.target.name, event.target.value)
        }
    };

    return (
        <div className={styles.inputClass}>
            <p className={styles.inputTitle}>{inputText}</p>
            <Input
                name={name}
                placeholder={placeHolderTitle}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default InputComp;
