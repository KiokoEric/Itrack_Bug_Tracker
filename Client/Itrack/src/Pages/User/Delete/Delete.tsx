import React from 'react';
import { MdDelete } from "react-icons/md";
import { ImUserMinus } from "react-icons/im";
import Button from '../../../Components/Common/Button/Button';

const Delete:React.FC = () => {
return (
    <div className='flex flex-col text-black w-11/12'>
        <figure className='flex gap-4' >
            <ImUserMinus size="3rem" />
            <h1 className='font-bold pb-2 text-5xl'>Delete User</h1>
        </figure>
        <hr />
        <div className='flex flex-col items-center justify-center gap-5 m-auto w-11/12'>
            <h1 className='text-center text-5xl'>Confirm Delete!</h1>
            <Button
                Children={<MdDelete size="1.4rem" />}
                ButtonText='Delete Profile'
                ButtonStyle='bg-black cursor-pointer flex items-center justify-center gap-2 mt-1 text-center text-white px-3 py-1.5 rounded w-40'
            />
        </div>
    </div>
)
}

export default Delete