import axios from "axios";
import { GiTicket } from "react-icons/gi";
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Input from "../../../Components/Common/Input/Input";
import Button from "../../../Components/Common/Button/Button";
import Select from "../../../Components/Common/Select/Select";
import Heading from "../../../Components/Common/Heading/Heading";
import TextArea from "../../../Components/Common/TextArea/TextArea";
import { useGetUserID } from "../../../Components/Hooks/useGetUserID";

const Edit_Ticket:React.FC = () => {

    const { id } = useParams()
    const UserID = useGetUserID();
    const [Cookie, _] = useCookies(["auth_token"]); 

    // USESTATE HOOK

    const [Users, setUsers] = useState<[]>([])
    const [Name, setName] = useState<string>("")
    const [userOwner, __] = useState<any>(UserID)
    const [Status, setStatus] = useState<string>("")
    const [Projects,  setProjects] = useState<[]>([])
    const [Success, setSuccess] = useState<string>("")
    const [Project,  setProject] = useState<string>("")
    const [Priority, setPriority] = useState<string>("")
    const [Category, setCategory] = useState<string>("")
    const [Submitted, setSubmitted] = useState<string>("")
    const [Description, setDescription] = useState<string>("")

    // RECEIVING CREATED TICKET DETAILS

    useEffect(() => {
        axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/${id}`, {
                headers: { authorization: Cookie.auth_token },
            }) 
        .then((Data) => { 
            setName(Data.data.Name)
            setStatus(Data.data.Status)
            setProject(Data.data.Project)
            setCategory(Data.data.Category)
            setPriority(Data.data.Priority) 
            setSubmitted(Data.data.Submitted)
            setDescription(Data.data.Description)
        })
    }, [])

    // EDIT TICKET FUNCTION

    const EditTicket = async (e: any) => {
        e.preventDefault()

        const data = {
            Name, Project, Description, Category, Priority, Status, Submitted, userOwner
        }
        try {
            axios.put(`https://itrack-server-9s7w.onrender.com/Ticket/${id}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("Ticket details successfully edited.")
            })
        } catch (error) {
            console.error(error) 
        }
    }

    // FETCHING ITRACK USERS
    
    useEffect(() => {

        const FetchUsers = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Users/`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setUsers(Response.data)
            })
        } 
    
        FetchUsers()

    },[])

    // FETCHING PROJECT DETAILS

    useEffect(() => {

        const FetchProject = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Projects/Projects`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setProjects(Response.data)
            })
        } 
    
        FetchProject()

    },[])

return (
    <div className='flex flex-col gap-5 mb-5 px-5 text-black w-screen'>
            <Heading
                ContainerStyle="flex gap-2 justify-center sm:justify-start"
                Children={<GiTicket size="3rem" />}
                TextStyle="font-bold text-5xl"
                HeadingText="Edit Ticket"
            />
            <hr />
            <form onSubmit={EditTicket} method="post" encType="multipart/form-data" className='flex flex-col gap-10 px-2 w-12/12'>
                <Input 
                    ContainerStyle = 'flex flex-col gap-4'
                    Label = 'Ticket Name'
                    LabelStyle = 'font-bold'
                    inputStyle = 'border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-full' 
                    Value={Name}
                    Change={(e:any) => setName(e.target.value)}   
                />
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Project Name</label> 
                    <Select SelectStyle='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' Value={Project} onChange={e => setProject(e.target.value)}>
                        <option value="">Select from the options below</option>
                        {
                            Projects.map((Project: any) => {
                                return(
                                    <option key={Project._id} value={Project.Name}>{Project.Name}</option>
                                )
                            })
                        } 
                    </Select>
                </div>
                <TextArea 
                    ContainerStyle = 'flex flex-col gap-4'
                    Label = 'Description'
                    LabelStyle = 'font-bold'
                    inputStyle = 'border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12'   
                    Value={Description}
                    Change={(e: any) => setDescription(e.target.value)}
                />
                <section className='grid grid-cols-1 gap-10 sm:justify-between sm:grid-cols-2 w-12/12'>
                    <div className='flex flex-col gap-4 mb-5'>
                        <label className='font-bold' htmlFor="">Ticket Category</label> 
                        <Select SelectStyle='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' Value={Category} onChange={e => setCategory(e.target.value)}>
                            <option value="">Select from the options below</option>
                            <option value="Defect">Defect</option>
                            <option value="Documentation">Documentation</option>
                            <option value="Enhancement">Enhancement</option>
                            <option value="Feature_Request">Feature Request</option>
                            <option value="Hardware_Problem">Hardware Problem</option>
                        </Select>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <label className='font-bold' htmlFor="">Status</label> 
                        <Select SelectStyle='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' Value={Status} onChange={e => setStatus(e.target.value)}>
                            <option value="">Select from the options below</option>
                            <option value="Open">Open</option>
                            <option value="In_Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </Select>
                    </div>
                </section>
                <section className='grid grid-cols-1 gap-10 sm:justify-between sm:grid-cols-2 w-12/12'>
                <div className='flex flex-col gap-4 mb-5'>
                    <label className='font-bold' htmlFor="">Priority</label> 
                    <Select SelectStyle='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' Value={Priority} onChange={e => setPriority(e.target.value)}>
                        <option value="">Select from the options below</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </Select>
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Project Manager</label> 
                    <Select SelectStyle='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' Value={Submitted} onChange={e => setSubmitted(e.target.value)}>
                        <option value="">Select from the options below</option>
                        {
                            Users.map((User: any) => {
                                return(
                                    <option value={User.Name}>{User.Name}</option>
                                )
                            })
                        }
                    </Select>
                </div>
            </section>
            <div className='flex flex-col items-center justify-center' >
                <h4 className='font-bold text-center text-green-700'>{Success}</h4>
                <Button
                    ButtonStyle='bg-red-800 cursor-pointer text-center text-white px-3 py-1 rounded w-56'
                    ButtonText='Edit Ticket'
                    onClick={EditTicket} 
                />
            </div>
        </form>
    </div>
)
}

export default Edit_Ticket
