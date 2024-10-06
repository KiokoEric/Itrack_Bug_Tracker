import React from 'react';
import { Link } from "react-router-dom";
import ProjectImage from "../../../assets/ProjectImage.png";
interface OutputProps {
    ID: any
    Image: any;
    Name: string;
    children?: any;
    Navigate: any;
}

const Output: React.FC<OutputProps> = ({ ID, Navigate, Image, Name, children }) => { 
return (
    <div className='flex flex-col gap-5 px-5 text-black'>
        <div key={ID}>
            <figure className='flex flex-col gap-4 items-center justify-center'>
                <Link to={Navigate} className='text-black no-underline' >  
                    {Image ? (<img src={Image} alt="" className='rounded' width='320px' />) : (<img src={ProjectImage} alt="" />) }
                    <figcaption>
                        <h2 className="font-bold mt-5 text-center text-3xl">{Name}</h2>
                    </figcaption>
                </Link>
                {children}
            </figure>  
        </div>
    </div>

)
}

export default React.memo(Output)
