"use client"
import React, { useState } from 'react';
import { Input } from 'antd';
import styles from './index.module.scss';

type PropsType = {
  inputText: string;
  placeHolderTitle: string;
  onChange?: (value: string) => void
};

const InputComp = ({ inputText, placeHolderTitle, onChange }: PropsType) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (typeof onChange === "function") {
      onChange(event.target.value)
    }
  };

  return (
    <div className={styles.inputClass}>
      <p className={styles.inputTitle}>{inputText}</p>
      <Input
        placeholder={placeHolderTitle}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputComp;
