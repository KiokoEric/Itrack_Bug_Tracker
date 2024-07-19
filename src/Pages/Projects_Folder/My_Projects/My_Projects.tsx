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
import { useGetUserID } from "../../../Components/Hooks/useGetUserID";

const Projects: React.FC = () => {

    const [Projects, setProjects] = useState([])
    const [Cookie, _] = useCookies(["auth_token"]); 
    const [isLoading, setIsLoading] = useState(true);

    const userID = useGetUserID();

    axios.defaults.withCredentials = true;
    useEffect(() => {

    const fetchProjects = async () => {
        await axios.get(`https://localhost:4000/Projects//${userID}/Project`, {
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

    const handleDelete= (_id: any) => {
        axios.delete(`https://itrack-server-9s7w.onrender.com/Projects/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        }) 
    }

return (
    <div>
        {isLoading ? (
            <div>
                <img src={Loading} alt="Loading..." className='Loading' />
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