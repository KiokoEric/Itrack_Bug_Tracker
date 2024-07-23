import React from 'react';
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaArchive } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import ProjectImage from "../../../assets/ProjectImage.png";

interface OutputProps {
    Delete?: (e: React.MouseEvent<SVGAElement>) => void;
    Archive?: (e: React.MouseEvent<SVGAElement>) => void;
    ID: any;
    Image: any;
    Name: string;
}

const Output: React.FC<OutputProps> = ({ ID, Image, Name, Delete, Archive }) => {
return (
    <div className='flex flex-col gap-5 px-5 text-black'>
        <div key={ID} >
            <figure className='flex gap-4 items-center justify-center'>
                <Link to={`/ProjectDetails/${ID}`} className='text-black no-underline' >  
                    {Image ? (<img src={Image} alt="" />) : (<img src={ProjectImage} alt="" />) }
                    <figcaption>
                        <h2 className="text-3xl">{Name}</h2>
                    </figcaption>
                </Link>
                <div>
                    <Link to={`/Project/${ID}`} key={ID} >
                        <MdEditDocument size="1rem" className='bg-red-700' color="black" />
                    </Link>
                    <MdDelete size="1rem" className='bg-red-700' color="black" onClick={Delete} /> 
                    <FaArchive size="1rem" className='bg-red-700' color="black" onClick={Archive} /> 
                </div>
            </figure> 
        </div>
    </div>

)
}

export default React.memo(Output)