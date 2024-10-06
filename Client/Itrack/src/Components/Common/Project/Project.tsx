import React from 'react';
import ProjectImage from "../../../assets/ProjectImage.png";
interface ProjectProps {
    Image: any;
    Name: any;
    EndDate: any;
    Manager: any;
    children: any;
    Priority: any;
    StartDate: any;
    Description: any;
    ContainerStyle?: any;
}

const Project:React.FC<ProjectProps> = ({ ContainerStyle, Image, Name, EndDate, Manager, Priority, StartDate, Description, children }) => {
return (
    <div className={ContainerStyle}>
        <figure>
            {Image ? (<img src={Image} alt="" className='w-12/12' />) : (<img src={ProjectImage} alt="" className='w-12/12' />) }
        </figure>
        <figcaption className="flex flex-col gap-3 items-center mb-5 xl:items-start">
            <h2 className='font-bold mt-3 pb-2 text-3xl text-center underline lg:text-left'>{Name}</h2>
            <p className='text-center xl:text-left'>{Description}</p>
            <p><b>Priority Level</b>: {Priority}</p>
            <h3 className="font-bold flex flex-col gap-3 underline">Timeline</h3>
            <div className="flex flex-col gap-5 sm:gap-20 sm:flex-row">
                <p><b>Start Date</b>: {StartDate}</p>
                <p><b>End Date</b>: {EndDate}</p>
            </div>
            <p><b>Project Manager</b>: {Manager}</p> 
            {children}
        </figcaption>
    </div>
)
}

export default React.memo(Project)
