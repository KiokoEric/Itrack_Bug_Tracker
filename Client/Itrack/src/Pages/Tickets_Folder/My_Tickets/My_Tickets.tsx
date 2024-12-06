import axios from "axios";
import { format } from 'date-fns';
import { useCookies } from "react-cookie";
import { FaArchive } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import Loading from "../../../assets/Loading_Image.gif";
import Heading from "../../../Components/Common/Heading/Heading";
import { Paper, TableBody, TableContainer } from '@mui/material';
import { useGetUserID } from "../../../Components/Hooks/useGetUserID";
import TableHeading from '../../../Components/Common/Table_Head/Table_Heading';
import TableOutput from "../../../Components/Common/Table_Output/Table_Output";
import TableHead from '../../../Components/Common/Mobile_TableHead/Table_Head';
import Table_Body from "../../../Components/Common/Tablet_TableBody/Table_Body";
import TableResults from "../../../Components/Common/Mobile_TableBody/Table_Results";
import Table_Heading from "../../../Components/Common/Tablet_TableHead/Table_Heading";

const My_Tickets:React.FC = () => {

    const UserID = useGetUserID();
    const [Cookie, _] = useCookies(["auth_token"]); 

    // USESTATE HOOK

    const [Tickets, setTickets] = useState<[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // FETCHING ALL THE TICKETS CREATED BY AN ITRACK USER BASED ON THEIR USER ID

    useEffect(() => {

    const FetchTickets = () => {
        axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/${UserID}/Tickets`, {
        headers: { authorization: Cookie.auth_token },
        }) 
        .then((Response) => {
            setTickets(Response.data)
            
        }) 
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    } 

    FetchTickets()

    },[])

    // ARCHIVING THE TICKET BASED ON THE TICKET ID

    const handleArchive= (ID: any) => {
        try {
            axios.post(`https://itrack-server-9s7w.onrender.com/Ticket/moveTicket/${ID}`, ID ,  {
                headers: { authorization: Cookie.auth_token },
            }) 
            .then(() => { 
                window.location.reload()
            })
        } catch (error) {  
            console.error(error) 
        }
    }

    // DATE CONVERSION FROM MONGO DB FORMAT TO DATE FORMAT

    const setDate = (date: any) => {
        const dateObj = new Date(date);
        return format(dateObj, 'dd-MM-yyyy');
    }

return (
    <div className='flex flex-col gap-5 px-2 text-black w-full sm:px-5'> 
        {isLoading ? (
            <div className="flex items-center justify-center">
                <img src={Loading} alt="Loading..." className='m-auto w-1/2' /> 
            </div>
            ) : (
            <div>
                <Heading
                    ContainerStyle="flex gap-2 justify-center xl:justify-start"
                    Children={<IoIosPricetags  size="3rem" />}
                    TextStyle="font-bold text-5xl"
                    HeadingText="My Tickets"
                />
                <hr />
                <br />
                <section className="items-center justify-center hidden xl:flex">
                    <TableContainer  component={Paper} sx={{ overflow: 'hidden', alignContent: 'center', justifyContent: 'center', width: '1150px' }} >
                        <TableHeading
                            EighthHeading = 'Action'
                            SecondHeading = 'Status'
                            FirstHeading = 'Priority'
                            FifthHeading = 'Ticket Type'
                            ThirdHeading = 'Ticket Name'
                            SixthHeading = 'Submitted By'
                            SeventhHeading = 'Created On'
                            FourthHeading = 'Project Name'
                        />
                        <TableBody>
                            {
                                (Tickets.length > 0) ? 
                                Tickets.map((Ticket: any) => (
                                    <TableOutput 
                                        ID={Ticket._id}
                                        Navigate={`/TicketDetails/${Ticket._id}`}
                                        FirstOutput={Ticket.Priority}
                                        SecondOutput={Ticket.Status}
                                        ThirdOutput={Ticket.Name}
                                        FourthOutput={Ticket.Project}
                                        FifthOutput={Ticket.Category} 
                                        SixthOutput={Ticket.Submitted}
                                        SeventhOutput={setDate(Ticket.Date)} 
                                        children={<FaArchive id='Archive' size="1.8rem" className='cursor-pointer p-1 rounded' color="red" onClick={() => handleArchive(Ticket._id)} />}
                                    />
                                )) : (<h2 className='font-bold pt-5 text-center text-red-700 text-4xl'>No Tickets Found.</h2> )
                            }
                        </TableBody>
                    </TableContainer>
                </section>
                <section className="items-center justify-center hidden sm:flex xl:hidden"> 
                    <TableContainer  component={Paper} sx={{ overflow: 'hidden', alignContent: 'center', justifyContent: 'center', width: '730px' }} >
                        <Table_Heading
                            SecondHeading = 'Ticket Name'
                            FirstHeading = 'Priority'
                            FifthHeading = 'Submitted By'
                            ThirdHeading = 'Project Name'
                            FourthHeading = 'Ticket Type'
                        />
                        <TableBody>
                        {
                            (Tickets.length > 0) ? 
                            Tickets.map((Ticket: any) =>  (
                                <Table_Body
                                    ID={Ticket._id}
                                    Navigate={`/TicketDetails/${Ticket._id}`}
                                    FirstOutput={Ticket.Priority}
                                    SecondOutput={Ticket.Name}
                                    ThirdOutput={Ticket.Project}
                                    FourthOutput={Ticket.Category}
                                    FifthOutput={Ticket.Submitted}
                                />
                                )
                            ) : (<h2 className='font-bold pt-5 text-center text-red-700 text-4xl'>No Tickets Found.</h2> )
                        }
                        </TableBody>
                    </TableContainer>
                </section>
                <section className="flex flex-col sm:hidden">
                    <TableHead
                        FirstHeading="Ticket Name"
                        SecondHeading="Project Name"
                        ThirdHeading="Ticket Type"
                    />
                    {
                        (Tickets.length > 0) ? 
                        Tickets.map((Ticket: any) =>  (
                            <TableResults 
                                ID={Ticket._id}
                                FirstOutput={Ticket.Name}
                                SecondOutput={Ticket.Project}
                                ThirdOutput={Ticket.Category}
                                Navigate={`/TicketDetails/${Ticket._id}`}
                            />
                        )) : (<h2 className='font-bold pt-5 text-center text-red-700 text-2xl'>No Tickets Found.</h2> )
                    }
                </section>
            </div>
            )
        }
    </div>
)
}   

export default My_Tickets
