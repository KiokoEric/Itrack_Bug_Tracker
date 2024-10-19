import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiFolder6Fill } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import Loading from "../../../assets/Loading_Image.gif";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Output from "../../../Components/Common/Output/Output";
import Heading from '../../../Components/Common/Heading/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxArchive } from '@fortawesome/free-solid-svg-icons';

const Projects: React.FC = () => {

    const [Cookie, _] = useCookies(["auth_token"]);   
    
    // USESTATE HOOK

    const [Projects, setProjects] = useState<[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // FETCHING ALL PROJECTS CREATED ON ITRACK BY ALL ITRACK USERS

    useEffect(() => {

        const fetchProjects = async () => {
            await axios.get(`http://localhost:4000/Projects/Projects`, {
            headers: { authorization: Cookie.auth_token },
            
            }) 
            .then((Response) => {
                setProjects(Response.data)
            })
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    
        fetchProjects()
    
    },[])
    
    // DELETE PROJECT FROM ITRACK
    
    const handleDelete= (id: any) => {
        axios.delete(`http://localhost:4000/Projects/${id}`, {
            headers: { authorization: Cookie.auth_token }
        })
        .then(() => { 
            window.location.reload()
        })
    }
    
    // ARCHIVE PROJECT
    
    const handleArchive= (ID: any) => {
    
        try {
            axios.post(`http://localhost:4000/Projects/moveProject/${ID}`, {
                headers: { authorization: Cookie.auth_token }, 
            }) 
            .then(() => { 
                window.location.reload()
            })
        } catch (error) { 
            console.error(error) 
        }
    }

return (
    <div className="w-screen">
        {isLoading ? (
            <div className="flex items-center justify-center">
                <img src={Loading} alt="Loading..." className='m-auto w-1/2' />
            </div>
            ) : (
            <div className='flex flex-col gap-2 mb-5 px-5 text-black'>
                <Heading
                    ContainerStyle="flex gap-2 justify-center sm:justify-start"
                    Children={<RiFolder6Fill size="3rem" />}
                    TextStyle="font-bold text-5xl"
                    HeadingText="All Projects"
                />
                <hr />
                <section className="grid grid-cols-1 gap-8 items-end justify-center mt-2 sm:grid-cols-3">
                    {
                    (Projects.length > 0) ?  
                    Projects.map((Project: any) => { 
                        return (
                            <Output
                                ID = {Project._id}
                                Navigate = {`/ProjectDetails/${Project._id}`}
                                Image = {Project.Image}
                                Name = {Project.Name}
                                children={
                                <div className='flex items-start justify-center gap-2'>
                                    <Link id="Edit" to={`/Project/${Project._id}`} key={Project._id}>
                                        <BiSolidEditAlt size='2.1rem' className='bg-Blue cursor-pointer p-1 rounded-full text-lg text-white' />
                                    </Link>
                                    <div id="Delete">
                                        <FontAwesomeIcon icon={faTrash} id="Delete" className='bg-Blue cursor-pointer p-2 rounded-full text-white text-lg' onClick={() =>handleDelete(Project._id)} />
                                    </div>
                                    <div id="Archive">
                                        <FontAwesomeIcon icon={faBoxArchive} id="Archive" className='bg-Blue cursor-pointer p-2 rounded-full text-lg text-white' onClick={() => handleArchive(Project._id)} />
                                    </div>
                                </div>
                                }   
                            />
                        )
                    }) : <h2 className='font-bold m-auto text-center text-red-600 text-5xl w-screen'>No Projects Found.</h2> 
                    }
                </section>
            </div>
            )
        }
    </div>
)
}

export default Projects
