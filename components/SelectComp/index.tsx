"use clinet"
import React from 'react'
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';


const options = [
    { label: 'Enes', value: 'enes' },
    { label: 'Enes2', value: 'enes2' },
    { label: 'Enes3', value: 'enes3' },
    { label: 'Enes4', value: 'enes4' },
]

type PropsType = {
    selectTitle: string;
    onChange?: (value: string) => void;

}
const handleChange = (value: string[]) => {
    console.log(value)

};


const SelectComp = ({ selectTitle, onChange }: PropsType) => {

    return (
        <div>
            <p>{selectTitle}</p>
            <Space style={{ width: '100%' }} direction="vertical">
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                />
            </Space>
        </div>
    )
}

export default SelectComp