import * as z from 'zod';
import axios from "axios";
import React from 'react';
import { ImUser } from "react-icons/im";
import { useSnackbar } from 'notistack';
import { useCookies } from "react-cookie";
import LoginImage from "../../../assets/Login.jpg";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../../Components/Common/Button/Button';
import Heading from '../../../Components/Common/Heading/Heading';

interface FormValues {
    Email: string;
    Password: string;
};
const Login: React.FC  = () => { 

    // CREATION OF THE LOGIN ZOD SCHEMA

    const LoginSchema = z.object({
        Email: z.string().min(1, { message: 'Email is required'}),
        Password: z.string().min(1, { message: 'Password is required'}),
    });

    const { enqueueSnackbar } = useSnackbar();
    const [_,setCookie] = useCookies(["auth_token"]);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(LoginSchema)
    });

    // ONLOGIN FUNCTION

    const onLogin : SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await axios.post("https://itrack-server-9s7w.onrender.com/Users/Login", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                enqueueSnackbar("Logged in successfully!" , { 
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
            enqueueSnackbar("Login unsuccessful!" , { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
            console.log(error)
        }
    }

    // DEMO LOGIN FUNCTION

    const DemoLogin = async (e: any) => {
        e.preventDefault()
        const data = {
            Email : "kiokoerick040@gmail.com" , Password : "Victory2024"
        }
        try {
                const response = await axios.post("https://itrack-server-9s7w.onrender.com/Users/Login", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                enqueueSnackbar("Logged in successfully!" , { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right', 
                    },
                })
                window.location.reload();
        } catch (error) { 
            enqueueSnackbar("Login unsuccessful!" , { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })
            console.log(error) 
        }
    }

    // ADMINISTRATOR LOGIN FUNCTION

    const Administrator = async (e: any) => {
        e.preventDefault()
        const data = {
            Email : "abeldamina@gmail.com" , Password : "Triumph2024"
        }
        try {
            const response = await axios.post("https://itrack-server-9s7w.onrender.com/Users/Administrator", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("Administrator", "Administration")
                enqueueSnackbar("Logged in successfully!" , { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right', 
                    },
                    })
                    window.location.reload();
        } catch (error) { 
            enqueueSnackbar("Login unsuccessful!" , { 
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
            Children={<ImUser size="3rem" />}
            TextStyle="font-bold text-5xl"
            HeadingText="Login"
        />
        <hr />
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center m-auto mt-1 w-11/12'>
            <figure className='hidden lg:flex'>
                <img src={LoginImage} alt="LoadingImage" />
            </figure>
            <form method="post" onSubmit={handleSubmit(onLogin)} encType="multipart/form-data" className='flex flex-col items-center justify-center gap-2'>
                <div className='mb-10'>
                    <h2 className='text-center text-5xl'>Welcome to Itrack</h2>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold' htmlFor="Email">Email</label> 
                    <input placeholder="Enter Email..." {...register('Email', { required: 'Email is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-2 text-black w-80 lg:w-96' required />
                    {errors.Email && <p className="text-center text-red-700">{errors.Email.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold' htmlFor="Password">Password</label> 
                    <input placeholder="Enter Password..." {...register('Password', { required: 'Password is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-2 text-black w-80 lg:w-96' required />
                    {errors.Password && <p className="text-center text-red-700">{errors.Password.message}</p>}
                </div>
                <div className='flex flex-col gap-4 sm:flex-row'>
                    <Button
                        ButtonText='Login'
                        ButtonStyle='bg-red-700 cursor-pointer mt-1 text-center text-white px-3 py-1 rounded w-40 hover:bg-black'
                        onClick={handleSubmit(onLogin)}
                    />
                    <Button
                        ButtonText='Demo Login'
                        ButtonStyle='bg-red-700 cursor-pointer text-center text-white px-3 py-1 rounded w-40 hover:bg-black'
                        onClick={DemoLogin}
                    />
                    <Button
                        ButtonText='Administrator Login'
                        ButtonStyle='bg-red-700 cursor-pointer text-center text-white px-3 py-1 rounded w-40 hover:bg-black'
                        onClick={Administrator}
                    />
                </div>
            </form>
        </section>
    </div>
)
}

export default Login
