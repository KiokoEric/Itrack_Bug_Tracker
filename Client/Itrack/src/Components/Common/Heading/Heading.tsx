import React from 'react'

interface HeadingProps {
    Children?: any;
    TextStyle: string;
    BodyStyle?: string;
    HeadingValue?: any;
    HeadingText: string;
    HeadingStyle?: string;
    ContainerStyle: string;
}

const Heading:React.FC<HeadingProps> = ({ BodyStyle, Children, HeadingText, ContainerStyle, HeadingStyle, HeadingValue, TextStyle }) => {
return (
    <div className={BodyStyle}>
        <figure className={ContainerStyle}>
            {Children}
            <figcaption>
                <h1 className={TextStyle}>{HeadingText}</h1> 
            </figcaption>
        </figure>
        <h1 className={HeadingStyle} >{HeadingValue}</h1>
    </div>
)
}

export default React.memo(Heading)
