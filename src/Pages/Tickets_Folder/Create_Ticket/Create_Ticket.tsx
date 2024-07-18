import * as z from 'zod';
import axios from "axios";
import { GiTicket } from "react-icons/gi";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../../Components/Common/Button/Button';
// import { useGetUserID } from '../../../Components/Hooks/useGetUserID';

interface FormValues {
    Title: string;
    Status: string;
    Project: string;
    Category: string;
    Priority: string;
    Submitted: string;
    Description: string;
};

const Create_Ticket: React.FC = () => {

    // const userOwner = useGetUserID()
    const [ Users, setUsers ] = useState([])
    const [ Success, setSuccess ] = useState('')
    const [ Cookie,_ ] = useCookies(["auth_token"]);

    const TicketSchema = z.object({
        Title: z.string().min(1, 'Title is required'),
        Category: z.string().min(1, 'Category is required'),
        Priority: z.string().min(1, 'Priority is required'),
        Status: z.string().min(1, 'Ticket status is required'),
        Submitted: z.string().min(1, 'Submitted by is required'),
        Project: z.string().min(1, 'Project title are required'),
        Description: z.string().min(1, 'Description is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(TicketSchema),
    });

    const AddTicket: SubmitHandler<FormValues> = async () => {
        await axios.post("https://localhost:4000/Ticket/AddTicket", {
            headers: { authorization: Cookie.auth_token },
        }) 
        setSuccess('Ticket has been successfully added.') 
    };

    useEffect(() => {

        const FetchUsers = () => {
            axios.get(`https://localhost:4000/Users/`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setUsers(Response.data)
            })
        } 
    
        FetchUsers()

    },[])

return (
    <div className='flex flex-col gap-5 px-5 text-black w-full'>
        <section>
            <figure className='flex gap-4' >
                <GiTicket size="3rem" />
                <h1 className='font-bold pb-2 text-5xl'>Create Ticket</h1>
            </figure>
            <hr />
        </section>
        <section>
            <form onSubmit={handleSubmit(AddTicket)} method="post" encType="multipart/form-data" className='flex flex-col gap-10'>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Ticket Title</label> 
                    <input placeholder="Enter Project Name..." {...register('Title', { required: 'Title is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-full' required />
                    {errors.Title && <p className="text-center text-red-700">{errors.Title.message}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Project Title</label> 
                    <input placeholder="Enter Project Title..." {...register('Project', { required: 'Project title is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-full' required />
                    {errors.Project && <p className="text-center text-red-700">{errors.Project.message}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Description</label> 
                    <textarea placeholder="Enter Description..." {...register('Description', { required: 'Description is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-full' required />
                    {errors.Description && <p className="text-center text-red-700">{errors.Description.message}</p>}
                </div>
                <section className='flex gap-10 justify-between'>
                    <div className='flex flex-col gap-4'>
                        <label className='font-bold' htmlFor="">Ticket Category</label> 
                        <select id="Select" {...register('Category', { required: 'Category is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-120' required>
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
                        <select id="Select" {...register('Status', { required: 'Status is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-120' required>
                            <option value="">Select from the options below</option>
                            <option value="Open">Open</option>
                            <option value="In_Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                        {errors.Status && <p className="text-center text-red-700">{errors.Status.message}</p>}
                    </div>
                </section>
                <section className='flex gap-10 justify-between'>
                    <div className='flex flex-col gap-4'>
                        <label className='font-bold' htmlFor="">Priority</label> 
                        <select id="Select" {...register('Priority', { required: 'Priority is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-120' required>
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
                        <select id="Select" {...register('Submitted', { required: 'Submitted by is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-120' required >
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
                        ButtonStyle='bg-red-800 cursor-pointer text-center text-white px-3 py-1 rounded w-56'
                        ButtonText='Create Ticket'
                        onClick={handleSubmit(AddTicket)} 
                    />
                </div>
            </form>
        </section>
    </div>
)
}

export default Create_Ticket