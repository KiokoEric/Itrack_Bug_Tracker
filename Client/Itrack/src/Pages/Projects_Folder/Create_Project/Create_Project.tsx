import * as z from 'zod';
import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react';
import { MdCreateNewFolder } from "react-icons/md";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../../Components/Common/Button/Button';
import Heading from '../../../Components/Common/Heading/Heading';
import { useGetUserID } from '../../../Components/Hooks/useGetUserID'; 

interface FormValues {
    Name: string;
    Image: string;
    EndDate: string;
    Manager: string;
    Priority: string;
    StartDate: string;
    Assigned: string[];
    Description: string;
};

const Create_Project: React.FC = () => {

    const userID = useGetUserID();
    const [ Cookie,_ ] = useCookies(["auth_token"]);
    const [ ShowAssigned, setShowAssigned ] = useState<boolean>(false);

    // USESTATE HOOK

    const [ Users, setUsers ] = useState<[]>([])
    const [ Success, setSuccess ] = useState<string>('')

    // CREATION OF THE PROJECT ZOD SCHEMA

    const ProjectSchema = z.object({
        Assigned: z.array(z.string()),
        userOwner: z.any().default(userID),
        Name: z.string().min(1, 'Name is required'),
        Image: z.string().min(1, 'Image link is required'),
        EndDate: z.string().min(1, 'End Date are required'),
        Priority: z.string().min(1, 'Priority is required'),
        StartDate: z.string().min(1, 'Start date are required'),
        Description: z.string().min(1, 'Description is required'),
        Manager: z.string().min(1, 'Product manager is required'), 
    });

    type FormData = z.infer<typeof ProjectSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(ProjectSchema),
    });

    // ADD PROJECT FUNCTION

    const AddProject: SubmitHandler<FormValues> = async (data: FormData) => {
        await axios.post("https://itrack-server-9s7w.onrender.com/Projects/AddProject", data, {
            headers: { authorization: Cookie.auth_token },
        }) 
        setSuccess('Project has been successfully created.') 
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
            HeadingText="Create Project"
        />
        <hr />
        <form onSubmit={handleSubmit(AddProject)} method="post" encType="multipart/form-data" className='flex flex-col gap-10 w-12/12'>
            <div className='flex flex-col gap-4'>
                <label className='font-bold' htmlFor="">Project Name</label> 
                <input placeholder="Enter Project Name..." {...register('Name', { required: 'Name is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required />
                {errors.Name && <p className="text-center text-red-700">{errors.Name.message}</p>}
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-bold' htmlFor="">Image</label> 
                <input placeholder="Enter Image Url..." {...register('Image', { required: 'Image url is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required />
                {errors.Image && <p className="text-center text-red-700">{errors.Image.message}</p>}
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-bold' htmlFor="">Description</label> 
                <textarea placeholder="Enter Description..." {...register('Description', { required: 'Description is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required />
                {errors.Description && <p className="text-center text-red-700">{errors.Description.message}</p>}
            </div>
            <section className='grid grid-cols-1 gap-10 sm:justify-between sm:grid-cols-3 w-12/12'>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Priority</label> 
                    <select id="Select" {...register('Priority', { required: 'Priority is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required>
                        <option value="">Select a category</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                    {errors.Priority && <p className="text-center text-red-700">{errors.Priority.message}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Start Date</label> 
                    <input type="date" placeholder='Enter the Date' {...register('StartDate', { required: 'Start Date is required' })} className='border-black border-b uppercase h-8 outline-none truncate px-1 py-1 text-black w-12/12' required />
                    {errors.StartDate && <p className="text-center text-red-700">{errors.StartDate.message}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">End Date</label> 
                    <input type="date" placeholder='Enter the Date' {...register('EndDate', { required: 'End Date is required' })} className='border-black border-b uppercase h-8 outline-none truncate px-1 py-1 text-black w-12/12' required />
                    {errors.EndDate && <p className="text-center text-red-700">{errors.EndDate.message}</p>}
                </div>
            </section>
            <section className='grid grid-cols-1 items-center justify-center gap-28 lg:justify-between lg:grid-cols-2'>
                <div className='flex flex-col gap-4' >
                    <label className='font-bold' htmlFor="">Project Manager</label> 
                    <select id="Select" {...register('Manager', { required: 'Project Manager is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-12/12' required >
                        <option value="">Select from the options below</option>
                        {
                        Users.map((User: any) => {
                            return(
                                <option value={User.Name}>{User.Name}</option>
                            )
                        })
                        }
                    </select>
                    {errors.Manager && <p className="text-center text-red-700">{errors.Manager.message}</p>}
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
                                        <input type='checkbox' value={User.Name} {...register('Assigned', { required: 'Assigned is required' })} className=' items-start outline-none truncate px-1 py-1 text-black' />
                                        <label id={User.Name}>{User.Name}</label>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    ) : ""
                    }
                    {errors.Assigned && <p className="text-center text-red-700">{errors.Assigned.message}</p>}
                </div> 
            </section>
            <div className='flex flex-col items-center justify-center' >
                <h4 className='font-bold text-center text-green-700'>{Success}</h4>
                <Button
                    ButtonStyle='bg-red-800 cursor-pointer text-center text-white px-3 py-1 rounded w-56 hover:bg-black'
                    ButtonText='Create Project'
                    onClick={handleSubmit(AddProject)} 
                />
            </div>
        </form>
    </div>
)
}

export default Create_Project
