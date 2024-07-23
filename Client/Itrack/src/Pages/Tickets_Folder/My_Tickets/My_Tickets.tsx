import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IoIosPricetags } from "react-icons/io";
import Loading from "../../../assets/Loading.gif";
import React, { useEffect, useState } from 'react';
import { Paper, TableBody, TableContainer } from '@mui/material';
import { useGetUserID } from "../../../Components/Hooks/useGetUserID";
import TableHeading from '../../../Components/Common/TableHead/TableHeading';
import TableOutput from "../../../Components/Common/TableOutput/TableOutput";

const My_Tickets:React.FC = () => {

    const UserID = useGetUserID();

    const navigate = useNavigate()
    const [Tickets, setTickets] = useState([])
    const [Cookie, _] = useCookies(["auth_token"]); 
    const [isLoading, setIsLoading] = useState(true);

useEffect(() => {

    // Fetch Tickets

    const FetchTickets = () => {
        axios.get(`https://localhost:4000/Tickets/${UserID}/Tickets`, {
        headers: { authorization: Cookie.auth_token },
        }) 
        .then((Response) => {
            setTickets(Response.data)
            
        }) 
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    } 

    FetchTickets()

    },[])

    const handleDelete= (_id: any) => {

        try {
            axios.post(`https://localhost:4000/Tickets/${_id}`,  {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                window.location.reload()
            })
        } catch (error) {  
            console.error(error) 
        }
    }

    const handleArchive= (ID: any) => {
        try {
            axios.post(`https://localhost:4000/Tickets/moveTicket/${ID}`, ID ,  {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                window.location.reload()
            })
        } catch (error) {  
            console.error(error) 
        }
    }

return (
    <div className='flex flex-col gap-5 px-5 text-black w-full'>
        {isLoading ? (
            <div className="flex items-center justify-center" >
                <img src={Loading} alt="Loading..." className='m-auto w-1/2' />
            </div>
            ) : (
            <div>
                <figure className='flex gap-4' >
                    <IoIosPricetags size="3rem" />
                    <h1 className='font-bold pb-2 text-5xl'>My Tickets</h1>
                </figure>
                <hr />
                <br />
                <TableContainer  component={Paper} sx={{ overflow: 'hidden' }} >
                    <TableHeading
                        EighthHeading = 'Action'
                        SecondHeading = 'Status'
                        FirstHeading = 'Priority'
                        FifthHeading = 'Ticket Type'
                        ThirdHeading = 'Ticket Title'
                        SixthHeading = 'Submitted By'
                        SeventhHeading = 'Created On'
                        FourthHeading = 'Project Title'
                    />
                    <TableBody>
                        {
                            (Tickets.length > 0) ? 
                            Tickets.map((Ticket: any) => (
                                <TableOutput 
                                    ID={Ticket._id}
                                    FirstOutput={Ticket.Priority}
                                    SecondOutput={Ticket.Status}
                                    ThirdOutput={Ticket.Title}
                                    FourthOutput={Ticket.Projects}
                                    FifthOutput={Ticket.Category}
                                    SixthOutput={Ticket.Submitted}
                                    SeventhOutput={Ticket.Date}
                                    Navigate={() => navigate(`/Ticket/${Ticket._id}`)}
                                    Delete={() => handleDelete(Ticket._id)}
                                    Archive={() => handleArchive(Ticket._id)}
                                />
                            )) : (<h2 className='font-bold pt-5 text-center text-red-700 text-4xl'>No Tickets Found.</h2> )
                        }
                    </TableBody>
                </TableContainer>
            </div>
            )
        }
    </div>
)
}   

export default My_Tickets