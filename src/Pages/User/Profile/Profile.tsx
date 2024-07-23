import React from 'react';
import { ImUser } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ProfileImage from "../../../assets/Profile.jpg";
import Input from '../../../Components/Common/Input/Input';
import Button from '../../../Components/Common/Button/Button';

const Profile:React.FC = () => {

return (
    <div>
        <figure className='flex gap-4' >
            <ImUser size="3rem" />
            <h1 className='font-bold pb-2 text-5xl'>Profile</h1>
        </figure>
        <hr />
        <section className='grid grid-cols-2 gap-5 items-center justify-center'>
            <figure>
                <img src={ProfileImage} alt="LoadingImage" />
            </figure>
        <form encType="multipart/form-data" className='flex flex-col items-center gap-3'>
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Name'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-96'         
            />
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Email'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-96'         
            />
            <Input 
                ContainerStyle = 'flex flex-col gap-1'
                Label = 'Assigned Role'
                LabelStyle = 'font-bold'
                inputStyle = 'border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-96'         
            />
            <div className='flex gap-16 mt-5'>
                <Button
                    Children={<FaEdit size="1.3rem" />}
                    ButtonText='Edit Details'
                    ButtonStyle='bg-black cursor-pointer flex items-center justify-center gap-2 mt-1 text-center text-white px-3 py-1.5 rounded w-40'
                />
                <Button
                    Children={<MdDelete size="1.4rem" />}
                    ButtonText='Delete Profile'
                    ButtonStyle='bg-black cursor-pointer flex items-center justify-center gap-2 mt-1 text-center text-white px-3 py-1.5 rounded w-40'
                />
            </div>
        </form>
    </section>
    </div>
)
}

export default Profile