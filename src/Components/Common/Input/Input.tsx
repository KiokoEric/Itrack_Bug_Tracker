import React, { ChangeEvent } from 'react';

interface InputProps {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    ContainerStyle?: string;
    Label: string;
    LabelStyle: string,
    Placeholder?: string;
    inputStyle: string;
}

const Input: React.FC<InputProps> = ({ContainerStyle, Label, LabelStyle, Placeholder, inputStyle, onChange}) => {

return (
    <div className={ContainerStyle}>
        <label className={LabelStyle}>{Label}</label>
        <input type="text" placeholder={Placeholder} className={inputStyle} onChange={onChange} />
    </div>
)
}

export default React.memo(Input)

