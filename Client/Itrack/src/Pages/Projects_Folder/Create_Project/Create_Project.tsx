import * as z from 'zod';
import axios from "axios";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react';
import { MdCreateNewFolder } from "react-icons/md";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../../Components/Common/Button/Button';
// import { useGetUserID } from '../../../Components/Hooks/useGetUserID';

interface FormValues {
    Name: string;
    Image: string;
    EndDate: Date;
    StartDate: Date;
    Manager: string;
    Priority: string;
    Assigned: string;
    Description: string;
};

const Create_Project: React.FC = () => {

    // const userOwner = useGetUserID()
    const [ Users, setUsers ] = useState([])
    const [ Success, setSuccess ] = useState('')
    const [ Cookie,_ ] = useCookies(["auth_token"]);
    const [ ShowAssigned, setShowAssigned ] = useState(false);

    const ProjectSchema = z.object({
        Name: z.string().min(1, 'Name is required'),
        Image: z.string().min(1, 'Image link is required'),
        EndDate: z.string().min(1, 'End Date are required'),
        Priority: z.string().min(1, 'Priority is required'),
        Assigned: z.string().min(1, 'Assigned is required'),
        StartDate: z.string().min(1, 'Start date are required'),
        Manager: z.string().min(1, 'Product manager is required'),
        Description: z.string().min(1, 'Description is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(ProjectSchema),
    });

    const AddProject: SubmitHandler<FormValues> = async () => {
        await axios.post("https://localhost:4000/Projects/AddProject", {
            headers: { authorization: Cookie.auth_token },
        }) 
        setSuccess('Project has been successfully added.') 
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
    <div className='flex flex-col gap-5 px-5 text-black'>
        <section>
            <figure className='flex gap-4' >
                <MdCreateNewFolder size="3rem" />
                <h1 className='font-bold pb-2 text-5xl'>Create Project</h1>
            </figure>
            <hr />
        </section>
        <section>
            <form onSubmit={handleSubmit(AddProject)} method="post" encType="multipart/form-data" className='flex flex-col gap-10'>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Project Name</label> 
                    <input placeholder="Enter Project Name..." {...register('Name', { required: 'Name is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-full' required />
                    {errors.Name && <p className="text-center text-red-700">{errors.Name.message}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Image</label> 
                    <input placeholder="Enter Image Url..." {...register('Image', { required: 'Image url is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-full' required />
                    {errors.Image && <p className="text-center text-red-700">{errors.Image.message}</p>}
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-bold' htmlFor="">Description</label> 
                    <textarea placeholder="Enter Description..." {...register('Description', { required: 'Description is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-full' required />
                    {errors.Description && <p className="text-center text-red-700">{errors.Description.message}</p>}
                </div>
                <section className='flex gap-10 justify-between'>
                    <div className='flex flex-col gap-4'>
                        <label className='font-bold' htmlFor="">Priority</label> 
                        <select id="Select" {...register('Priority', { required: 'Priority is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-96' required>
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
                        <input type="date" placeholder='Enter the Date' {...register('StartDate', { required: 'Start Date is required' })} className='border-black border-b uppercase h-8 outline-none truncate px-1 py-1 text-black w-80' required />
                        {errors.StartDate && <p className="text-center text-red-700">{errors.StartDate.message}</p>}
                    </div>
                    <div className='flex flex-col gap-4'>
                        <label className='font-bold' htmlFor="">End Date</label> 
                        <input type="date" placeholder='Enter the Date' {...register('EndDate', { required: 'End Date is required' })} className='border-black border-b uppercase h-8 outline-none truncate px-1 py-1 text-black w-80' required />
                        {errors.EndDate && <p className="text-center text-red-700">{errors.EndDate.message}</p>}
                    </div>
                </section>
                <section className='grid grid-cols-2 justify-between'>
                    <div className='flex flex-col gap-4' >
                        <label className='font-bold' htmlFor="">Project Manager</label> 
                        <select id="Select" {...register('Manager', { required: 'Project Manager is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-96' required >
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
                        <label className='font-bold' onClick={() => setShowAssigned(!ShowAssigned)} >Assigned Developer(s)</label>
                        <div className='bg-black w-full h-0.5' />
                        {
                        ShowAssigned ? (
                            <div className='cursor-pointer'>
                                { 
                                    Users.map((User: any) => {
                                        return(
                                        <div className='cursor-pointer flex flex-col gap-2'>
                                            <input type='checkbox' {...register('Assigned', { required: 'Assigned Developers is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-96' />
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
                        ButtonStyle='bg-red-800 cursor-pointer text-center text-white px-3 py-1 rounded w-56'
                        ButtonText='Create Project'
                        onClick={handleSubmit(AddProject)} 
                    />
                </div>
            </form>
        </section>
    </div>
)
}

export default Create_Project