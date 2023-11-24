"use client"
import React, { useState } from 'react'
import { Select, Space } from 'antd';



interface OptionsTypes {
    label: string,
    value: number | string
}

type PropsType = {
    selectTitle: string;
    placeHoler: string;
    onChange?: (value: string) => void;
    options: OptionsTypes[]

}

const SelectComp = ({ selectTitle, onChange, options, placeHoler }: PropsType) => {
    const [valueData, setValueData] = useState("")

    const handleChange = (value: string) => {
        setValueData(value)
        if (typeof onChange === "function") {
            onChange(value)
        }
    };
    return (
        <div>
            <p>{selectTitle}</p>
            <Space style={{ width: '100%' }} direction="vertical">
                <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder={placeHoler}
                    onChange={handleChange}
                    options={options}
                />
            </Space>
        </div>
    )
}

export default SelectComp