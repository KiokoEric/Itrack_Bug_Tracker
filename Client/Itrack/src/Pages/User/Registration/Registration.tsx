import * as z from 'zod';
import axios from "axios";
import React from 'react';
import { useSnackbar } from 'notistack';
import { ImUserPlus } from "react-icons/im";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../../Components/Common/Button/Button';
import Heading from '../../../Components/Common/Heading/Heading';
import RegistrationImage from "../../../assets/Registration.avif";

interface FormValues {
    Name: string;
    Role: string;
    Email: string;
    Password: string;
};

const Registration:React.FC = () => {

    // CREATION OF THE REGISTRATION ZOD SCHEMA

    const RegistrationSchema = z.object({
        Name: z.string().min(1, { message: 'Name is required'}),
        Role: z.string().min(1, { message: 'Role is required'}),
        Email: z.string().email({ message: "Invalid email address" }),
        Password: z.string().min(1, { message: 'Password is required'})
    });

    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(RegistrationSchema)
    });

    // ONREGISTRATION FUNCTION

    const onRegistration : SubmitHandler<FormValues> = async (data) => {
        try {
            await axios.post("http://localhost:4000/Users/Registration", data) 
                enqueueSnackbar("Registration Completed! Kindly Log in", { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right', 
                    },
                }) 
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
        } catch (error) { 
            enqueueSnackbar("Registration unsuccessful!" , { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
            console.log(error)
        }
    }

return (
    <div className='flex flex-col gap-5 w-screen'>
        <Heading
            ContainerStyle="flex gap-2 items-center justify-center xl:items-start xl:justify-start"
            Children={<ImUserPlus size="3rem" />}
            TextStyle="font-bold text-5xl"
            HeadingText="Registration"
        />
        <hr />
        <div className='grid grid-cols-1 items-center justify-center m-auto mt-1 lg:w-11/12 lg:gap-10 lg:grid-cols-2'>
            <figure className='hidden lg:block'>
                <img src={RegistrationImage} alt="" />
            </figure>
            <form method="post" onSubmit={handleSubmit(onRegistration)} encType="multipart/form-data" className='flex flex-col items-center justify-center gap-2 sm:justify-start'>
                <div className='mb-10'>
                    <h2 className='text-center text-5xl'>Create a user account</h2>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold' htmlFor="">Name</label> 
                    <input placeholder="Enter Name..." {...register('Name', { required: 'Name is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-2 text-black w-80 sm:w-96' required />
                    {errors.Name && <p className="text-center text-red-700">{errors.Name.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold' htmlFor="Email">Email</label> 
                    <input placeholder="Enter Email..." {...register('Email', { required: 'Email is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-2 text-black w-80 sm:w-96' required />
                    {errors.Email && <p className="text-center text-red-700">{errors.Email.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold' htmlFor="Password">Password</label> 
                    <input placeholder="Enter Password..." {...register('Password', { required: 'Password is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-2 text-black w-80 sm:w-96' required />
                    {errors.Password && <p className="text-center text-red-700">{errors.Password.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold' htmlFor="Password">Role</label> 
                    <select id="Select" {...register('Role', { required: 'Role is required' })} className='border-black border-b h-10 outline-none truncate px-1 py-2 text-black w-80 sm:w-96' required>
                        <option value="">Select from the options below</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Back End Web Developer">Back End Web Developer</option>
                        <option value="Database Administrator">Database Administrator</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Quality Assurance Engineer">Quality Assurance Engineer</option>
                        <option value="Security Engineer">Security Engineer</option>
                        <option value="Front End Web Developer">Front End Web Developer</option>
                        <option value="System Architect">System Architect</option>
                        <option value="Technical Writer">Technical Writer</option>
                        <option value="UI/UX Designer">UI/UX Designer</option>
                    </select>
                </div>
                <Button
                    ButtonText='Sign Up'
                    ButtonStyle='bg-red-800 cursor-pointer mt-1 text-center text-white px-3 py-1 rounded w-40 hover:bg-black'
                    onClick={handleSubmit(onRegistration)} 
                />
            </form>
        </div>
    </div>
)
}

export default Registration
