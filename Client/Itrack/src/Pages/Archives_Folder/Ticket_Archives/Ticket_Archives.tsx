import axios from "axios";
import { format } from 'date-fns';
import { MdDelete } from "react-icons/md";
import { useCookies } from "react-cookie";
import { TbRestore } from "react-icons/tb";
import { IoIosPricetags } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import Loading from "../../../assets/Loading_Image.gif";
import Heading from "../../../Components/Common/Heading/Heading";
import { Paper, TableBody, TableContainer } from '@mui/material';
import TableHeading from '../../../Components/Common/Table_Head/Table_Heading';
import TableOutput from "../../../Components/Common/Table_Output/Table_Output";
import TableHead from '../../../Components/Common/Mobile_TableHead/Table_Head';
import Table_Body from "../../../Components/Common/Tablet_TableBody/Table_Body";
import TableResults from "../../../Components/Common/Mobile_TableBody/Table_Results";
import Table_Heading from "../../../Components/Common/Tablet_TableHead/Table_Heading";

const Ticket_Archives:React.FC = () => {

    // USESTATE HOOK

    const [Archives, setArchives] = useState([]) 
    const [Cookie, _] = useCookies(["auth_token"]); 
    const [isLoading, setIsLoading] = useState(true); 

    // FETCHING ALL THE ARCHIVED TICKETS

    useEffect(() => {

        try{
            axios.get(`http://localhost:4000/TicketArchives/Archives`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setArchives(Response.data)
            })
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        } catch (error) {
            console.error(error) 
        }
        
    }, [])

    // DELETING THE TICKET BASED ON THE TICKET ID

    const handleDelete= (_id: any) => {
        axios.delete(`http://localhost:4000/TicketArchives/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        })
        .then(() => { 
            window.location.reload()
        })
    }

    // RESTORE ARCHIVED TICKET 

    const handleArchive = (id: any) => {
        try {
            axios.post(`http://localhost:4000/TicketArchives/moveTicket/${id}`,  {
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
    <div className='flex flex-col gap-5 px-5 text-black w-full'>
        {isLoading ? (
            <div className="flex items-center justify-center" >
                <img src={Loading} alt="Loading..." className='m-auto w-1/2' />
            </div>
            ) : (
            <div>
                <Heading
                    ContainerStyle="flex gap-2 justify-center xl:justify-start"
                    Children={<IoIosPricetags  size="3rem" />}
                    TextStyle="font-bold text-5xl"
                    HeadingText="Archived Tickets"
                />
                <hr />
                <br />
                <section className="items-center justify-center hidden xl:flex">
                    <TableContainer  component={Paper} sx={{ overflow: 'hidden', alignContent: 'center', justifyContent: 'center', width: '1150px' }}>
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
                        (Archives.length > 0) ? 
                        Archives.map((Ticket: any) => (
                            <TableOutput 
                                ID={Ticket._id}
                                Navigate={`/TicketArchives/${Ticket._id}`}
                                FirstOutput={Ticket.Priority}
                                SecondOutput={Ticket.Status}
                                ThirdOutput={Ticket.Name}
                                FourthOutput={Ticket.Project}
                                FifthOutput={Ticket.Category}
                                SixthOutput={Ticket.Submitted}
                                SeventhOutput={setDate(Ticket.Date)}
                                children = {
                                <div className="flex">
                                    <TbRestore size="1.8rem" className='cursor-pointer p-1 rounded' color="red" onClick={() => handleArchive(Ticket._id)} />
                                    <MdDelete size="2.1rem" className='cursor-pointer -mt-0.5 p-1 rounded' color="red" onClick={() => handleDelete(Ticket._id)}/>
                                </div>
                                }
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
                            (Archives.length > 0) ? 
                            Archives.map((Ticket: any) =>  (
                                <Table_Body 
                                    ID={Ticket._id}
                                    Navigate={`/TicketArchives/${Ticket._id}`}
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
                        (Archives.length > 0) ? 
                        Archives.map((Archive: any) =>  (
                            <TableResults 
                                ID={Archive._id}
                                FirstOutput={Archive.Name}
                                SecondOutput={Archive.Project}
                                ThirdOutput={Archive.Category}
                                Navigate={`/TicketArchives/${Archive._id}`}
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

export default Ticket_Archives
