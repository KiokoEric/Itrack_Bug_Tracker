import axios from "axios";
import { ImUser } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useCookies } from "react-cookie";
import React, { useEffect, useState } from 'react';
import ProfileImage from "../../../assets/Profile.jpg";
import { useNavigate, useParams} from 'react-router-dom';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Input from '../../../Components/Common/Input/Input';
import Button from '../../../Components/Common/Button/Button';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Heading from "../../../Components/Common/Heading/Heading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AdministrationID } from "../../../Components/Hooks/Administrator";

const Profile:React.FC = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const Administrator = AdministrationID()
    const [Cookie, _] = useCookies(["auth_token"])

    // USESTATE HOOK

    const [Name, setName] = useState<string>("")
    const [Role, setRole] = useState<string>("")
    const [Email, setEmail] = useState<string>("")
    const [Password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    // DISPLAYING AND HIDING OF PASSWORDS

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    // FETCHING THE USER'S DETAILS

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

    },)

    // EDIT USER FUNCTION

    const EditUser = () => {
        navigate(`/EditProfile/${id}`)
    } 

    // DELETE USER FUNCTION

    const DeleteUser = () => {
        navigate(`/DeleteProfile/${id}`)
    }


return (
    <div className='flex flex-col gap-5 w-screen'>
    <Heading
        ContainerStyle="flex gap-2 items-center justify-center xl:items-start xl:justify-start"
        Children={<ImUser size="3rem" />}
        TextStyle="font-bold text-5xl"
        HeadingText="Profile"
    />
    <hr />
    <section className='grid grid-cols-1 items-center justify-center m-auto mt-1 lg:w-11/12 lg:gap-10 lg:grid-cols-2'>
        <figure className='hidden lg:block'>
            <img src={ProfileImage} alt="LoadingImage" />
        </figure>
        <form encType="multipart/form-data" className='flex flex-col items-center gap-3'>
            <div className='mb-10'>
                <h2 className='text-center text-5xl'>User Profile</h2>
            </div>
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Name'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'   
                Value={Name}
            />
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Email'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'  
                Value={Email}       
            />
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Position'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'  
                Value={Role}       
            />
            <Input 
                ContainerStyle = 'flex flex-col w-80 sm:w-96'
                Label = 'Password'
                type={showPassword ? 'text' : 'password'}
                LabelStyle = 'font-bold'
                inputStyle = 'h-5 outline-none truncate px-1 py-2 text-black w-80 sm:w-96'
                TextStyle="border-black border-b flex flex-row"
                Value={Password}
                Children={showPassword ? <FontAwesomeIcon icon={faEye} className="underline" onClick={handleTogglePassword} /> : <FontAwesomeIcon icon={faEyeSlash} className="underline" onClick={handleTogglePassword} />  }
            />
            <div className='flex gap-5 mt-5'>
                {
                    Administrator ? <Button
                    onClick={EditUser}
                    Children={<FaEdit size="1.3rem" />}
                    ButtonText='Edit Details'
                    ButtonStyle='bg-red-800 cursor-pointer flex items-center justify-center gap-2 mt-1 text-center text-white px-3 py-1.5 rounded w-40 hover:bg-black'
                /> : null
                }
                {
                    Administrator ? <Button
                        onClick={DeleteUser}
                        Children={<MdDelete size="1.4rem" />}
                        ButtonText='Delete Profile'
                        ButtonStyle='bg-red-800 cursor-pointer flex items-center justify-center gap-2 mt-1 text-center text-white px-3 py-1.5 rounded w-40 hover:bg-black'
                    /> : null
                }
            </div>
        </form>
    </section>
    </div>
)
}

export default Profile
