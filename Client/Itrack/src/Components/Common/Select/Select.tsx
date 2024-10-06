import React from 'react';

interface SelectProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    Value: any;
    children: any;
    SelectStyle: any;
}

const Select: React.FC<SelectProps> = ({ Value, onChange, SelectStyle, children}) => {
return (
    <select name="" className={SelectStyle} value={Value} onChange={onChange}>{children}</select>
)
}

export default React.memo(Select);
