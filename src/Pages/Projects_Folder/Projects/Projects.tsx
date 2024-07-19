import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useCookies } from "react-cookie";
import { FaArchive } from "react-icons/fa";
import { RiFolder6Fill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";
import Loading from "../../../assets/Loading.gif";
import React, { useEffect, useState } from 'react';
import ProjectImage from "../../../assets/ProjectImage.png";
// import { useGetUserID } from "../../../Components/Hooks/useGetUserID";

const Projects: React.FC = () => {

    // const UserID = useGetUserID();

    const [Projects, setProjects] = useState([])
    const [Cookie, _] = useCookies(["auth_token"]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchProjects = async () => {
            await axios.get(`https://localhost:4000/Projects/AllProjects`, {
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
    
        // Delete Project
    
        const handleDelete= (id: any) => {
            axios.delete(`https://localhost:4000/Projects/${id}`, {
                headers: { authorization: Cookie.auth_token }
            })
            .then(() => { 
                window.location.reload()
            })
        }
    
        // Archive Project
    
        const handleArchive= (ID: any) => {
    
            try {
                axios.post(`https://localhost:4000/Projects/moveProject/${ID}`, {
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
    <div>
        {isLoading ? (
            <div className="flex items-center justify-center" >
                <img src={Loading} alt="Loading..." className='m-auto w-1/2' />
            </div>
            ) : (
            <div className='flex flex-col gap-5 px-5 text-black'>
                <figure>
                    <RiFolder6Fill size="3rem" />
                    <h1 className='font-bold pb-2 text-5xl'>All Projects</h1> 
                </figure>
                <section>
                    {
                    (Projects.length > 0) ?  
                    Projects.map((Project: any) => { 
                    return (
                    <div key={Project._id} >
                        <figure className='flex gap-4 items-center justify-center'>
                            <Link to={`/ProjectDetails/${Project._id}`} className='MyLink' >  
                                {Project.Image ? (<img src={Project.Image} alt="" />) : (<img src={ProjectImage} alt="" />) }
                                <figcaption>
                                    <h2 className="text-3xl">{Project.Title}</h2>
                                </figcaption>
                            </Link>
                            <div>
                                <Link to={`/Project/${Project._id}`} key={Project._id} >
                                    <MdEditDocument size="1rem" className='bg-red-700' color="black" />
                                </Link>
                                <MdDelete size="1rem" className='bg-red-700' color="black" onClick={() => handleDelete(Project._id)} /> 
                                <FaArchive size="1rem" className='bg-red-700' color="black" onClick={() => handleArchive(Project._id)} /> 
                            </div>
                        </figure> 
                    </div>
                    )
                    }) : <h2 className='Failure'>No Projects Found.</h2> 
                    }
                </section>
            </div>
            )
        }
    </div>
)
}

export default Projects