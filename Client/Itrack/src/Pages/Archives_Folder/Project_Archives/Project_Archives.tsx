import axios from "axios";
import { useCookies } from "react-cookie";
import { RiFolder6Fill } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
import Loading from "../../../assets/Loading_Image.gif";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Output from "../../../Components/Common/Output/Output";
import Heading from "../../../Components/Common/Heading/Heading";
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Projects_Archives: React.FC = () => {

    const [Cookie, _] = useCookies(["auth_token"]);
    
    // USESTATE HOOK

    const [Projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    // FETCHING ALL ARCHIVED PROJECTS

    useEffect(() => {

        const fetchProjects = async () => {
            await axios.get(`http://localhost:4000/ProjectArchives/Archives`, {
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
    
    // DELETE ARCHIVED PROJECT BY PROJECT ID

    const handleDelete= (id: any) => {
        axios.delete(`http://localhost:4000/ProjectArchives/${id}`, {
            headers: { authorization: Cookie.auth_token }
        })
        .then(() => { 
            window.location.reload()
        })
    }

    // RESTORE ARCHIVED PROJECT

    const handleArchive = (ID: any) => {
        try {
            axios.post(`http://localhost:4000/ProjectArchives/moveProject/${ID}`,  {
                headers: { authorization: Cookie.auth_token }
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
            <div className="flex items-center justify-center" >
                <img src={Loading} alt="Loading..." className='m-auto w-1/2' />
            </div>
            ) : (
            <div className='flex flex-col gap-5 mb-5 px-5 text-black'>
                <Heading
                    ContainerStyle="flex gap-2 justify-center sm:justify-start"
                    Children={<RiFolder6Fill size="3rem" />}
                    TextStyle="font-bold text-5xl"
                    HeadingText="Archived Projects"
                />
                <hr />
                <section className="grid grid-cols-1 gap-8 items-center justify-center mt-2 sm:grid-cols-3">
                    {
                    (Projects.length > 0) ?  
                    Projects.map((Project: any) => { 
                    return (
                        <Output
                            ID = {Project._id}
                            Navigate = {`/ProjectArchives/${Project._id}`}
                            Image = {Project.Image}
                            Name = {Project.Name}
                            children={
                                <div className='flex items-center justify-center gap-2'>
                                    <div id="Delete">
                                        <FontAwesomeIcon icon={faTrash} id="Delete" className='bg-black cursor-pointer p-2 rounded-full text-lg text-white' onClick={() =>handleDelete(Project._id)} />
                                    </div>
                                    <div id="Restore">
                                        <FontAwesomeIcon icon={faRotateLeft} className='bg-black cursor-pointer p-2 rounded-full text-lg text-white' onClick={() => handleArchive(Project._id)} />
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

export default Projects_Archives
