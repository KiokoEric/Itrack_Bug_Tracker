import * as z from 'zod';
import Axios from "axios";
import React from 'react';
import { ImUser } from "react-icons/im";
import { useSnackbar } from 'notistack';
import { useCookies } from "react-cookie";
import LoginImage from "../../../assets/Login.jpg";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../../Components/Common/Button/Button';

interface FormValues {
    Email: string;
    Password: string;
};

const Login: React.FC  = () => {

    const LoginSchema = z.object({
        Email: z.string().min(1, { message: 'Email is required'}),
        Password: z.string().min(1, { message: 'Password is required'}),
    });

    const [_,setCookie] = useCookies(["auth_token"]);
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(LoginSchema)
    });

    const onLogin : SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await Axios.post("http://localhost:4000/Users/Login", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                enqueueSnackbar("Logged in successfully!" , {variant: "success"}) 
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
        } catch (error) { 
            enqueueSnackbar("Login unsuccessful!" , {variant: "error"})
            console.log(error)
        }
    }

return (
    <div>
        <figure className='flex gap-4' >
            <ImUser size="3rem" />
            <h1 className='font-bold pb-2 text-5xl'>Login</h1>
        </figure>
        <hr />
        <section className='grid grid-cols-2 gap-5 items-center justify-center'>
            <figure>
                <img src={LoginImage} alt="LoadingImage" />
            </figure>
            <form method="post" onSubmit={handleSubmit(onLogin)} encType="multipart/form-data" className='flex flex-col items-center justify-start gap-2'>
                <div className='mb-10'>
                    <h2 className='text-5xl'>Welcome to Itrack</h2>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold' htmlFor="Email">Email</label> 
                    <input placeholder="Enter Email..." {...register('Email', { required: 'Email is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-2 text-black w-96' required />
                    {errors.Email && <p className="text-center text-red-700">{errors.Email.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold' htmlFor="Password">Password</label> 
                    <input placeholder="Enter Password..." {...register('Password', { required: 'Password is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-2 text-black w-96' required />
                    {errors.Password && <p className="text-center text-red-700">{errors.Password.message}</p>}
                </div>
                <Button
                    ButtonText='Login'
                    ButtonStyle='bg-black cursor-pointer mt-1 text-center text-white px-3 py-1 rounded w-40'
                    onClick={handleSubmit(onLogin)}
                />
            </form>
        </section>
    </div>
)
}

export default Login