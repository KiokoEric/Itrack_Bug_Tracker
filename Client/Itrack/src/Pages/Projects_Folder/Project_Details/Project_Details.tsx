import axios from "axios";
import { format } from 'date-fns';
import { useCookies } from "react-cookie";
import { FaArchive } from "react-icons/fa";
import {  useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Loading from "../../../assets/Loading_Image.gif";
import { Paper, TableBody, TableContainer } from '@mui/material';
import Project from "../../../Components/Common/Project/Project";
import TableHeading from "../../../Components/Common/TableHead/TableHeading";
import TableOutput from "../../../Components/Common/TableOutput/TableOutput";
import TableHead from "../../../Components/Common/Mobile_TableHead/Table_Head";
import Table_Body from "../../../Components/Common/Tablet_TableBody/Table_Body";
import TableResults from "../../../Components/Common/Mobile_TableBody/Table_Results";
import Table_Heading from "../../../Components/Common/Tablet_TableHead/Table_Heading";

const Project_Details:React.FC = () => {

    const { id } = useParams()
    const [Cookie, _] = useCookies(["auth_token"])

    // USESTATE HOOK

    const [Tickets, setTickets] = useState<[]>([])
    const [Assigned, setAssigned] = useState<[]>([])
    const [Projects, setProjects] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [ProjectName, setProjectName] = useState<string>("")

    // FETCHING PROJECT DETAILS BY PROJECT ID

    useEffect(() => {
        axios.get(`http://localhost:4000/Projects/${id}`, {
        headers: { authorization: Cookie.auth_token }
        }) 
        .then((Response) => {
            setProjects(Response.data)
            setProjectName(Response.data.Name)
            setAssigned(Response.data.Assigned[0])
        }) 
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    },[]) 

    // FETCHING TICKETS BY THE PROJECT NAME

    useEffect(() => {
        const FetchTickets = () => { 
            axios.get(`http://localhost:4000/Ticket/Projects/${ProjectName}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTickets(Response.data)
            })
        } 
    
        FetchTickets()

    },[ProjectName])

    // ARCHIVING THE TICKET BASED ON THE TICKET ID

    const handleArchive = (ID: any) => {
        try {
            axios.post(`http://localhost:4000/TicketArchives/moveTicket/${ID}`,  {
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
    <div className="flex justify-between mb-5 w-screen">
        {isLoading ? (
            <div className='flex items-center justify-center'>
                <img src={Loading} alt="Loading..." className='m-auto w-11/12' />
            </div>
            ) : (
            <div>
            <section>
                <Project
                    ContainerStyle= 'grid grid-cols-1 lg:grid-cols-2 lg:gap-10 m-auto w-11/12'
                    Image= {Projects.Image}
                    Name= {Projects.Name}
                    EndDate= {Projects.EndDate}
                    Manager= {Projects.Manager}
                    Priority= {Projects.Priority}
                    StartDate= {Projects.StartDate} 
                    Description= {Projects.Description}  
                    children={
                        <p><b>Assigned Developers</b>: {Assigned.map((Item: any) => {
                            return(
                                <ul className="flex flex-col list-inside list-disc"> 
                                    <li>{Item}</li>
                                </ul>
                            )
                        })}</p>
                    }
                />
            </section>
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
                                children={<FaArchive size="1.8rem" className='cursor-pointer p-1 rounded' color="red" onClick={() => handleArchive(Ticket._id)} />}
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
        )}
    </div>
)
}

export default Project_Details
