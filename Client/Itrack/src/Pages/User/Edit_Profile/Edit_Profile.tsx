import axios from "axios";
import { ImUser } from "react-icons/im";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ProfileImage from "../../../assets/Profile.jpg";
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Input from '../../../Components/Common/Input/Input';
import Button from "../../../Components/Common/Button/Button";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Heading from '../../../Components/Common/Heading/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Edit_Profile:React.FC = () => {

    const { id } = useParams()
    const [Cookie, _] = useCookies(["auth_token"])

    // USESTATE HOOK

    const [Name, setName] = useState<string>("")
    const [Role, setRole] = useState<string>("")
    const [Email, setEmail] = useState<string>("")
    const [Success, setSuccess] = useState<string>("")
    const [Password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    // DISPLAYING AND HIDING OF PASSWORDS

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // CALLING ON THE USER'S DETAILS

    useEffect(() => {

        const FetchUser =() => {
            try{
                axios.get(`https://itrack-server-9s7w.onrender.com/Users/${id}`, {
                headers: { authorization: Cookie.auth_token },
                }) 
                .then((Data) => {
                    setName(Data.data.Name)
                    setRole(Data.data.Role) 
                    setEmail(Data.data.Email)
                    setPassword(Data.data.Password) 
                })
            }
            catch (Error){
                console.log(Error)
            }
        }  
        
        FetchUser()

    }, [])

    // EDIT USER DETAILS FUNCTION

    const EditUserDetails = (e: any) => {
        e.preventDefault()

        const data = {
            Name, Email, Role, Password
        }
        try {
            axios.put(`https://itrack-server-9s7w.onrender.com/Users/${id}`, data , {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                setSuccess("User details have been succesffuly edited.")
            })
        } catch (error) {
            console.error(error) 
        }
    } 

return (
    <div className='flex flex-col gap-5 w-screen'>
        <Heading
            ContainerStyle="flex gap-2 items-center justify-center xl:items-start xl:justify-start"
            Children={<ImUser size="3rem" />}
            TextStyle="font-bold text-5xl"
            HeadingText='Edit Profile'
        />
        <hr />
        <section className='grid grid-cols-1 items-center justify-center mx-auto mt-1 lg:w-11/12 lg:gap-10 lg:grid-cols-2'>
            <figure className='hidden lg:block'>
                <img src={ProfileImage} alt="LoadingImage" />
            </figure>
            <form encType="multipart/form-data" className="flex flex-col items-center gap-3">
                <div className='mb-10'>
                    <h2 className='text-center text-5xl'>User Profile</h2>
                </div>
                <Input 
                    ContainerStyle = 'flex flex-col gap-1'
                    Label = 'Name'
                    LabelStyle = 'font-bold'
                    inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96' 
                    Value={Name}
                    Change={(e:any) => setName(e.target.value)}        
                />
                <Input 
                    ContainerStyle = 'flex flex-col gap-1'
                    Label = 'Email'
                    LabelStyle = 'font-bold'
                    inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'
                    Value={Email}
                    Change={(e:any) => setEmail(e.target.value)}  
                />
                <Input 
                    ContainerStyle = 'flex flex-col gap-1'
                    Label = 'Position'
                    LabelStyle = 'font-bold'
                    inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'  
                    Value={Role} 
                    Change={(e:any) => setRole(e.target.value)}      
                />
                <Input 
                    ContainerStyle = 'flex flex-col w-80 sm:w-96'
                    Label = 'Password'
                    type={showPassword ? 'text' : 'password'}
                    LabelStyle = 'font-bold'
                    inputStyle = 'h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'
                    TextStyle="border-black border-b flex flex-row"
                    Value={Password}
                    Change={(e:any) => setPassword(e.target.value)}  
                    Children={showPassword ? <FontAwesomeIcon icon={faEye} className="underline" onClick={handleTogglePassword} /> : <FontAwesomeIcon icon={faEyeSlash} className="underline" onClick={handleTogglePassword} />}
                />
                <div className='flex items-center justify-center mt-10'>
                    <h4 className='font-bold text-center text-green-700'>{Success}</h4>
                    <Button
                        onClick={EditUserDetails}
                        ButtonStyle="bg-red-800 cursor-pointer flex items-center justify-center gap-4 text-center text-white px-2 py-1.5 rounded w-64 hover:bg-black"
                        ButtonText="Edit Details"
                        Children={<FontAwesomeIcon icon={faPenToSquare} />}
                    />
                </div>
            </form>
        </section>
    </div>
)
}

export default Edit_Profile
