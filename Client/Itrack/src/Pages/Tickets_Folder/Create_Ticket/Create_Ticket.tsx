import * as z from 'zod';
import axios from "axios";
import { GiTicket } from "react-icons/gi";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../../Components/Common/Button/Button';
import Heading from '../../../Components/Common/Heading/Heading';
import { useGetUserID } from '../../../Components/Hooks/useGetUserID';

interface FormValues {
    Name: string;
    Status: string;
    Project: string;
    Category: string;
    Priority: string;
    Submitted: string;
    Description: string;
};

const Create_Ticket: React.FC = () => {

    const userOwner = useGetUserID()
    const [ Cookie,_ ] = useCookies(["auth_token"]) 

     // USESTATE HOOK
    
    const [ Users, setUsers ] = useState<[]>([])
    const [Projects,  setProjects] = useState<[]>([])
    const [ Success, setSuccess ] = useState<string>('')
    
    // CREATION OF THE TICKET ZOD SCHEMA

    const TicketSchema = z.object({
        userOwner: z.any().default(userOwner),
        Name: z.string().min(1, 'Name is required'),
        Category: z.string().min(1, 'Category is required'),
        Priority: z.string().min(1, 'Priority is required'),
        Status: z.string().min(1, 'Ticket status is required'),
        Project: z.string().min(1, 'Project name is required'),
        Submitted: z.string().min(1, 'Submitted by is required'),
        Description: z.string().min(1, 'Description is required'),
    });

    type FormData = z.infer<typeof TicketSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(TicketSchema),
    });

    // ADD TICKET FUNCTION

    const AddTicket: SubmitHandler<FormValues> = async (data: FormData) => {
        await axios.post("https://itrack-server-9s7w.onrender.com/Ticket/AddTicket", data, {
            headers: { authorization: Cookie.auth_token },
        }) 
        setSuccess('Ticket has been successfully created.') 
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

    // FETCHING ALL PROJECTS CREATED BY ITRACK USERS

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
                HeadingText="Create Ticket"
            />
            <hr />
            <form onSubmit={handleSubmit(AddTicket)} method="post" encType="multipart/form-data" className='flex flex-col gap-10 px-2 w-12/12'>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Ticket Name</label> 
                    <input placeholder="Enter Ticket Name..." {...register('Name', { required: 'Name is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required />
                    {errors.Name && <p className="text-center text-red-700">{errors.Name.message}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Project Name</label> 
                    <select id="Project" {...register('Project', { required: 'Project is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required>
                            <option value="">Select from the options below</option>
                            {
                            Projects.map((Project: any) => {
                                return(
                                    <option key={Project._id} value={Project.Name}>{Project.Name}</option>
                                )
                            })
                            } 
                    </select> 
                    {errors.Project && <p className="text-center text-red-700">{errors.Project.message}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Description</label> 
                    <textarea placeholder="Enter Description..." {...register('Description', { required: 'Description is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required />
                    {errors.Description && <p className="text-center text-red-700">{errors.Description.message}</p>}
                </div>
                <section className='grid grid-cols-1 gap-10 sm:justify-between sm:grid-cols-2 w-12/12'>
                    <div className='flex flex-col gap-4 mb-5'>
                        <label className='font-bold' htmlFor="">Ticket Category</label> 
                        <select id="Select" {...register('Category', { required: 'Category is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required>
                            <option value="">Select from the options below</option>
                            <option value="Defect">Defect</option>
                            <option value="Documentation">Documentation</option>
                            <option value="Enhancement">Enhancement</option>
                            <option value="Feature_Request">Feature Request</option>
                            <option value="Hardware_Problem">Hardware Problem</option>
                        </select>
                        {errors.Category && <p className="text-center text-red-700">{errors.Category.message}</p>}
                    </div>
                    <div className='flex flex-col gap-4'>
                        <label className='font-bold' htmlFor="">Status</label> 
                        <select id="Select" {...register('Status', { required: 'Status is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required>
                            <option value="">Select from the options below</option>
                            <option value="Open">Open</option>
                            <option value="In_Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                        {errors.Status && <p className="text-center text-red-700">{errors.Status.message}</p>}
                    </div>
                </section>
                <section className='grid grid-cols-1 gap-10 sm:justify-between sm:grid-cols-2 w-12/12'>
                <div className='flex flex-col gap-4 mb-5'>
                    <label className='font-bold' htmlFor="">Priority</label> 
                    <select id="Select" {...register('Priority', { required: 'Priority is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required>
                        <option value="">Select from the options below</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                    {errors.Priority && <p className="text-center text-red-700">{errors.Priority.message}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Project Manager</label> 
                    <select id="Select" {...register('Submitted', { required: 'Submitted by is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required >
                        <option value="">Select from the options below</option>
                        {
                        Users.map((User: any) => {
                            return(
                                <option value={User.Name}>{User.Name}</option>
                            )
                        })
                        }
                    </select>
                    {errors.Submitted && <p className="text-center text-red-700">{errors.Submitted.message}</p>}
                </div>
            </section>
            <div className='flex flex-col items-center justify-center' >
                <h4 className='font-bold text-center text-green-700'>{Success}</h4>
                <Button
                    ButtonStyle='bg-red-800 cursor-pointer text-center text-white px-3 py-1 rounded w-56 hover:bg-black'
                    ButtonText='Create Ticket'
                    onClick={handleSubmit(AddTicket)} 
                />
            </div>
        </form>
    </div>
)
}

export default Create_Ticket
