import axios from "axios";
import { useCookies } from "react-cookie";
import { RiFolder6Fill } from "react-icons/ri";
import Loading from "../../../assets/Loading.gif";
import React, { useEffect, useState } from 'react';
import Output from "../../../Components/Common/Output/Output";
import { useGetUserID } from "../../../Components/Hooks/useGetUserID";

const My_Projects: React.FC = () => {

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
        axios.delete(`https://localhost:4000/Projects/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        }) 
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
                    <Output
                        ID = {Project._id}
                        Image = {Project.Image}
                        Name = {Project.Name}
                        Delete={() =>handleDelete(Project._id)}
                    />
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

export default My_Projects

