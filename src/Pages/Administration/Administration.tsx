import axios from "axios";
import { useCookies } from "react-cookie";
import { FaUserTie } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import React, { useEffect, useState } from 'react';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const Administration:React.FC = () => {

    const [Users, setUsers] = useState([])
    const [Cookie, _] = useCookies(["auth_token"]);

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
    <div>
        <section>
            <figure className='flex gap-4' >
                <FaUsersGear size="3rem" />
                <h1 className='font-bold pb-2 text-5xl'>Administration</h1>
            </figure>
            <hr />
        </section>
            <TableContainer component={Paper} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , justifyItems: 'center' , overflow: 'hidden', width: '1200px' }}>
            <TableHead>
                <TableRow sx={{ borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', alignContent: 'center', height: '40px', margin: 'auto',  width: '1150px' , overflow: 'hidden' }}>
                        <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}></Typography></TableCell>
                        <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>Name</Typography></TableCell>
                        <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>Email</Typography></TableCell>
                        <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>Position</Typography></TableCell>
                </TableRow>
            </TableHead>
                <TableBody>
                {
                    (Users.length > 0) ? 
                    Users.map((User: any) => (
                        <TableRow  sx={{ borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', height: '40px', width: '1150px' , overflow: 'hidden' }}>
                            <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{<FaUserTie />}</Typography></TableCell>
                            <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{User.Name}</Typography></TableCell>
                            <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{User.Email}</Typography></TableCell>
                            <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{User.Position}</Typography></TableCell>
                        </TableRow>
                    )) : (<h2 className='font-bold pt-5 text-center text-red-700 text-4xl'>No Users Found.</h2>)
                }
                </TableBody>
            </TableContainer>
    </div>
)
}

export default Administration