import React from 'react'

interface StatusProps {
    Children?: any;
    StatusValue: any;
    TextStyle: string;
    StatusText: string;
    ContainerStyle: string;
}

const Status:React.FC<StatusProps> = ({ Children, StatusText, ContainerStyle, StatusValue, TextStyle }) => {
return (
    <div className={ContainerStyle} >
        <figure className='flex gap-2'>
            {Children}
            <figcaption>
                <h1 className={TextStyle}>{StatusText}</h1>
            </figcaption>
        </figure>
        <h1>{StatusValue}</h1>
    </div>
)
}

export default React.memo(Status)