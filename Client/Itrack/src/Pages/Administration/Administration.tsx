import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FaUserTie } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import React, { useEffect, useState } from 'react';
import Heading from "../../Components/Common/Heading/Heading";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Administration:React.FC = () => {

    const [Cookie, _] = useCookies(["auth_token"]);

    // USESTATE HOOK

    const [Users, setUsers] = useState<[]>([])

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
    <div className='flex flex-col gap-5 mb-5 px-2 text-black w-full sm:px-5'>
        <Heading
            ContainerStyle="flex gap-2 justify-center xl:justify-start"
            Children={<FaUsersGear size="3rem" />}
            TextStyle="font-bold text-5xl"
            HeadingText="Administration"
        />
        <hr />
        <section className="hidden xl:flex xl:justify-center">
            <TableContainer component={Paper} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , justifyItems: 'center' , overflow: 'hidden', width: '1150px' }}>
            <TableHead>
                <TableRow sx={{ borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', alignContent: 'center', height: '40px', margin: 'auto',  width: '1150px' , overflow: 'hidden' }}>
                    <TableCell><Typography sx={{ fontWeight: 'bold', width: '50px'}}></Typography></TableCell>
                    <TableCell><Typography sx={{ fontWeight: 'bold', width: '250px'}}>Name</Typography></TableCell>
                    <TableCell><Typography sx={{ fontWeight: 'bold', width: '250px'}}>Email</Typography></TableCell>
                    <TableCell><Typography sx={{ fontWeight: 'bold', width: '250px'}}>Position</Typography></TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                {
                    (Users.length > 0) ? 
                    Users.map((User: any) => (
                        <TableRow  sx={{ borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', alignContent: 'center', height: '40px', margin: 'auto', width: '1150px' , overflow: 'hidden' }}>
                            <TableCell><Typography sx={{ fontSize: 17, margin: 'auto', width: '50px'}}>{<FaUserTie />}</Typography></TableCell>
                            <TableCell><Typography sx={{ fontSize: 17, margin: 'auto', width: '250px' }}><Link to={`/${User._id}`} className='text-black no-underline'>{User.Name}</Link></Typography></TableCell>
                            <TableCell><Typography sx={{ fontSize: 17, margin: 'auto', width: '250px' }}><Link to={`/${User._id}`} className='text-black no-underline'>{User.Email}</Link></Typography></TableCell>
                            <TableCell><Typography sx={{ fontSize: 17, margin: 'auto', width: '250px' }}><Link to={`/${User._id}`} className='text-black no-underline'>{User.Role}</Link></Typography></TableCell>
                        </TableRow>
                    )) : (<h2 className='font-bold pt-5 text-center text-red-700 text-4xl'>No Users Found.</h2>)
                }
                </TableBody>
            </TableContainer>
        </section>
        <section className="items-center justify-center hidden sm:flex xl:hidden">
            <TableContainer component={Paper} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , justifyItems: 'center' , overflow: 'hidden', width: '700px' }}>
            <TableHead>
                <TableRow sx={{ borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', alignContent: 'center', height: '40px', margin: 'auto',  width: '730px' , overflow: 'hidden' }}>
                    <TableCell><Typography sx={{ fontWeight: 'bold', width: '50px'}}></Typography></TableCell>
                    <TableCell><Typography sx={{ fontWeight: 'bold', width: '100px'}}>Name</Typography></TableCell>
                    <TableCell><Typography sx={{ fontWeight: 'bold', width: '180px'}}>Email</Typography></TableCell>
                    <TableCell><Typography sx={{ fontWeight: 'bold', width: '180px'}}>Position</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                (Users.length > 0) ? 
                Users.map((User: any) => (
                    <TableRow  sx={{ borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', alignContent: 'center', height: '40px', margin: 'auto', width: '700px' , overflow: 'hidden' }}>
                        <TableCell><Typography sx={{ fontSize: 17, margin: 'auto', width: '50px'}}>{<FaUserTie />}</Typography></TableCell>
                        <TableCell><Typography sx={{ fontSize: 17, margin: 'auto', width: '100px' }}><Link to={`/${User._id}`} className='text-black no-underline'>{User.Name}</Link></Typography></TableCell>
                        <TableCell><Typography sx={{ fontSize: 17, margin: 'auto', width: '180px' }}><Link to={`/${User._id}`} className='text-black no-underline'>{User.Email}</Link></Typography></TableCell>
                        <TableCell><Typography sx={{ fontSize: 17, margin: 'auto', width: '180px' }}><Link to={`/${User._id}`} className='text-black no-underline'>{User.Role}</Link></Typography></TableCell>
                    </TableRow>
                )) : (<h2 className='font-bold pt-5 text-center text-red-700 text-4xl'>No Users Found.</h2>)
            }
            </TableBody>
            </TableContainer>
        </section>
        <section className="flex flex-col items-center justify-center sm:hidden">
            <TableRow sx={{ borderBottom: '1px solid black', display: 'flex', height: '40px', justifyContent: 'space-between', margin: 'auto', width: '345px' , overflow: 'hidden' }}>
                <TableCell><Typography sx={{ fontWeight: 'bold', width: '130px' }}>Name</Typography></TableCell>
                <TableCell><Typography sx={{ fontWeight: 'bold', width: '130px' }}>Position</Typography></TableCell>
            </TableRow>
            {
                (Users.length > 0) ? 
                Users.map((User: any) =>  (
                <TableRow key={User._id} sx={{ borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', height: '45px' ,margin: 'auto', width: '345px' , overflow: 'hidden' }}>
                    <TableCell><Typography sx={{ fontSize: 17, width: '150px'}}><Link to={`/${User._id}`} className='text-black no-underline'>{User.Name}</Link></Typography></TableCell>
                    <TableCell><Typography sx={{ fontSize: 17, width: '150px'}}><Link to={`/${User._id}`} className='text-black no-underline'>{User.Role}</Link></Typography></TableCell>
                </TableRow>
                )) : (<h2 className='font-bold pt-5 text-center text-red-700 text-2xl'>No Users Found.</h2> )
            }
        </section>
    </div>
)
}

export default Administration
