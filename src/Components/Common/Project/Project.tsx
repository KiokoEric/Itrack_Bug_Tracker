import React from 'react';
import Button from '../Button/Button';
import { MdEditDocument } from "react-icons/md";
import ProjectImage from "../../../assets/ProjectImage.png";

interface ProjectProps {
    Navigate?: (e: React.MouseEvent<HTMLDivElement>) => void;
    Image: any;
    Name: string;
    Assigned: any;
    EndDate: string;
    Manager: string;
    Priority: string;
    StartDate: string;
    Description: string;
    ContainerStyle: string;
}

const Project:React.FC<ProjectProps> = ({ ContainerStyle, Image, Name, EndDate, Manager, Priority, Assigned, StartDate, Description, Navigate }) => {
return (
    <div className={ContainerStyle} >
        <figure>
            {Image ? (<img src={Image} alt="" width="500px" />) : (<img src={ProjectImage} alt="" width="500px" />) }
        </figure>
        <figcaption>
            <h1 className='font-bold text-3xl'>{Name}</h1>
            <p>{Description}</p>
            <h3 className='font-bold underline'>Priority Level <p>{Priority}</p> </h3>
            <h3 className='font-bold underline'>Timeline</h3>
            <div className='flex gap-4'>
                <p className='font-bold'>Start Date: <span className='font-normal'>{StartDate}</span> </p>
                <p className='font-bold'>End Date: <span className='font-normal'>{EndDate}</span></p>
            </div>
            <p className='font-bold'>Project Manager: <span>{Manager}</span></p>
            <p>Assigned Developers: {Assigned.map((Item: any) => {
                return(
                    <div className='flex flex-col gap-3 list-disc mt-5'>
                        <li>{Item[0].Name}</li>
                    </div>
                )
            })}</p> 
            <Button
                onClick={Navigate}
                Children={<MdEditDocument />} 
                ButtonStyle='bg-blue-700 mt-5 p-3 rounded text-white'
                ButtonText='Edit Details'
            />
        </figcaption>
    </div>
)
}

export default Project