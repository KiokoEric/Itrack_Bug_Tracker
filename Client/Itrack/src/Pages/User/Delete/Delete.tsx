import React from 'react';
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useCookies } from "react-cookie";
import { ImUserMinus } from "react-icons/im";
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../Components/Common/Button/Button';
import Heading from '../../../Components/Common/Heading/Heading';

const Delete:React.FC = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [ Cookie, _ ] = useCookies(["auth_token"]); 

    const DeleteUser = () => {
        try{
            axios.delete(`http://localhost:4000/Users/Delete/${id}`, {
                headers: { authorization: Cookie.auth_token }
            })
            .then(() => { 
                navigate("/Registration")
                window.localStorage.clear()
            })
        }
        catch (Error){
            console.log(Error)
        }
    }

return (
    <div className='flex flex-col text-black w-11/12'>
        <Heading
            ContainerStyle="flex gap-2 items-center justify-center sm:items-start xl:justify-start"
            Children={<ImUserMinus size="3rem" />}
            TextStyle="font-bold text-5xl"
            HeadingText="Delete User"
        />
        <hr />
        <div className='flex flex-col items-center justify-center gap-5 m-auto mt-20'>
            <h1 className='text-center text-5xl'>Confirm Delete!</h1>
            <Button
                onClick={DeleteUser}
                Children={<MdDelete size="1.4rem" />}
                ButtonText='Delete Profile'
                ButtonStyle='bg-black cursor-pointer flex items-center justify-center gap-2 mt-1 text-center text-white px-3 py-1.5 rounded w-40'
            />
        </div>
    </div>
)
}

export default Delete
