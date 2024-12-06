import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md";
import Input from "../../../Components/Common/Input/Input";
import Select from "../../../Components/Common/Select/Select";
import Button from '../../../Components/Common/Button/Button';
import Heading from '../../../Components/Common/Heading/Heading';
import TextArea from "../../../Components/Common/TextArea/TextArea";
import { useGetUserID } from "../../../Components/Hooks/useGetUserID";

const Edit_Project:React.FC = () => {

    const { id } = useParams()
    const UserID = useGetUserID();
    const [ Cookie, _ ] = useCookies(["auth_token"]); 

    // USESTATE HOOK

    const [ Users, setUsers ] = useState<[]>([])
    const [ Name, setName ] = useState<string>('')
    const [ userOwner, __ ] = useState<any>(UserID)
    const [ Image, setImage ] = useState<string>('')
    const [ Success, setSuccess ] = useState<string>('')
    const [ Manager, setManager ] = useState<string>('')
    const [ EndDate, setEndDate ] = useState<string>('')
    const [ Priority, setPriority ] = useState<string>('')
    const [ Assigned, setAssigned ] = useState<string>('')
    const [ StartDate, setStartDate ] = useState<string>('')
    const [ Description, setDescription ] = useState<string>('')
    const [ ShowAssigned, setShowAssigned ] = useState<boolean>(false);

    // RECEIVING CREATED PROJECT DETAILS

    useEffect(() => {
        axios.get(`https://itrack-server-9s7w.onrender.com/Projects/${id}`, {
                headers: { authorization: Cookie.auth_token },
            }) 
        .then((Data) => { 
            setName(Data.data.Name)
            setImage(Data.data.Image)
            setEndDate(Data.data.EndDate) 
            setManager(Data.data.Manager)
            setPriority(Data.data.Priority)
            setAssigned(Data.data.Assigned)
            setStartDate(Data.data.StartDate)
            setDescription(Data.data.Description)
        })
    }, [])
    
    // EDIT PROJECT FUNCTION

    const EditProject = async (e:any) => {
        e.preventDefault()
    
        const data = {
            Name, Description, StartDate, EndDate, Assigned, Manager, Priority, Image, userOwner
        }
        axios.put(`https://itrack-server-9s7w.onrender.com/Projects/${id}`, data , {
            headers: { authorization: Cookie.auth_token },
        }) 
        .then(() => {
            setSuccess('Project has been successfully edited.') 
        })
    };

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

return (
    <div className='flex flex-col gap-5 mb-5 px-5 text-black w-screen'>
        <Heading
            ContainerStyle="flex gap-2 justify-center sm:justify-start"
            Children={<MdCreateNewFolder size="3rem" />}
            TextStyle="font-bold text-5xl"
            HeadingText="Edit Project"
        />
        <hr />
        <form onSubmit={EditProject} method="post" encType="multipart/form-data" className='flex flex-col gap-10 w-full'>
            <Input 
                ContainerStyle = 'flex flex-col gap-4'
                Label = 'Project Name'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-full' 
                Value={Name}
                Change={(e:any) => setName(e.target.value)}   
            />
            <Input 
                ContainerStyle = 'flex flex-col gap-4'
                Label = 'Image'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-full' 
                Value={Image}
                Change={(e:any) => setImage(e.target.value)}   
            />
            <TextArea 
                ContainerStyle = 'flex flex-col gap-4'
                Label = 'Description'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-full'   
                Value={Description}
                Change={(e: any) => setDescription(e.target.value)}
            />
            <section className='grid grid-cols-1 gap-10 sm:justify-between sm:grid-cols-3 w-full'>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Priority</label> 
                    <Select SelectStyle='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-full' Value={Priority} onChange={e => setPriority(e.target.value)}>
                        <option value="">Select a category</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </Select>
                </div>
                <Input 
                    ContainerStyle = 'flex flex-col gap-4'
                    Label = 'Start Date'
                    LabelStyle = 'font-bold'
                    inputStyle = 'border-black border-b uppercase h-8 outline-none truncate px-1 py-1 text-black w-full' 
                    type='date'
                    Value={StartDate}
                    Change={(e:any) => setStartDate(e.target.value)}   
                />
                <Input 
                    ContainerStyle = 'flex flex-col gap-4'
                    Label = 'End Date'
                    LabelStyle = 'font-bold'
                    inputStyle = 'border-black border-b uppercase h-8 outline-none truncate px-1 py-1 text-black w-full' 
                    type='date'
                    Value={EndDate}
                    Change={(e:any) => setEndDate(e.target.value)}   
                />
            </section>
            <section className='grid grid-cols-1 items-center justify-center gap-28 lg:justify-between lg:grid-cols-2'>
                <div className='flex flex-col gap-4' >
                    <label className='font-bold' htmlFor="">Project Manager</label> 
                    <Select SelectStyle='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' Value={Manager} onChange={e => setManager(e.target.value)}>
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
                <div className='cursor-pointer flex flex-col gap-1'>
                    <label className='cursor-pointer font-bold' onClick={() => setShowAssigned(!ShowAssigned)} >Assigned Developer(s)</label>
                    <div className='bg-black w-full h-0.5' />
                    {
                    ShowAssigned ? (
                        <div className='cursor-pointer flex flex-col gap-4 h-48 overflow-scroll'>
                            { 
                                Users.map((User: any) => {
                                    return(
                                    <div className='border-black border-b cursor-pointer flex flex-row items-center justify-start gap-4 w-84'>
                                        <input type='checkbox' value={Assigned} onChange={(e:any) => setAssigned(e.target.value)} className=' items-start outline-none truncate px-1 py-1 text-black' />
                                        <label id={User.Name}>{User.Name}</label>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    ) : ""
                    }
                </div> 
            </section>
            <div className='flex flex-col items-center justify-center' >
                <h4 className='font-bold text-center text-green-700'>{Success}</h4>
                <Button
                    ButtonStyle='bg-red-800 cursor-pointer text-center text-white px-3 py-1 rounded w-56'
                    ButtonText='Edit Project'
                    onClick={EditProject} 
                />
            </div>
        </form>
    </div>
)
}

export default Edit_Project
