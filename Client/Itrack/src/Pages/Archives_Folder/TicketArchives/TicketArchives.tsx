import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IoIosPricetags } from "react-icons/io";
import Loading from "../../../assets/Loading.gif";
import React, { useEffect, useState } from 'react';
import { Paper, TableBody, TableContainer } from '@mui/material';
import TableHeading from '../../../Components/Common/TableHead/TableHeading';
import TableOutput from "../../../Components/Common/TableOutput/TableOutput";

const TicketArchives:React.FC = () => {

    const navigate = useNavigate()
    const [Archives, setArchives] = useState([]) 
    const [Cookie, _] = useCookies(["auth_token"]); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        try{
            axios.get(`https://localhost:4000/TicketArchives/Archives`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setArchives(Response.data)
            })
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.error(error) 
        }
        
    }, [])

    const handleDelete= (_id: any) => {
        axios.delete(`https://localhost:4000/TicketArchives/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        })
        .then(() => { 
            window.location.reload()
        })
    }

    const handleArchive = (ID: any) => {
        try {
            axios.post(`https://localhost:4000/TicketArchives/moveTicket/${ID}`,  {
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
                    <h1 className='font-bold pb-2 text-5xl'>All Tickets</h1>
                </figure>
                <hr />
                <br />
                <TableContainer  component={Paper} sx={{ overflow: 'hidden' }}>
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
                        (Archives.length > 0) ? 
                        Archives.map((Ticket: any) => (
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

export default TicketArchives