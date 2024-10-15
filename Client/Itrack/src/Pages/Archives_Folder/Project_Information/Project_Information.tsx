import axios from "axios";
import { useCookies } from "react-cookie";
import { FaArchive } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Loading from "../../../assets/Loading_Image.gif";
import { Paper, TableBody, TableContainer } from '@mui/material';
import Project from "../../../Components/Common/Project/Project";
import TableOutput from "../../../Components/Common/Table_Output/Table_Output";
import TableHeading from "../../../Components/Common/Table_Head/Table_Heading";

const Project_Information:React.FC = () => {

    const { id } = useParams()
    const [Cookie, _] = useCookies(["auth_token"])

    // USESTATE HOOK

    const [Tickets, setTickets] = useState([])
    const [Assigned, setAssigned] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [Projects, setProjects] = useState<any>([])
    const [ProjectName, setProjectName] = useState("")

    // FETCHING PROJECT DETAILS BY PROJECT ID

    useEffect(() => {
        axios.get(`http://localhost:4000/ProjectArchives/${id}`, { 
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

return (
    <div className="flex justify-between">
        {isLoading ? (
            <div className="flex items-center justify-center">
                <img src={Loading} alt="Loading..." className='m-auto w-11/12' /> 
            </div>
            ) : (
            <div>
            <section>
                <Project
                    Image= {Projects.Image}
                    Name= {Projects.Name}
                    EndDate= {Projects.EndDate}
                    Manager= {Projects.Manager}
                    Priority= {Projects.Priority}
                    StartDate= {Projects.StartDate}
                    Description= {Projects.Description}
                    ContainerStyle= 'grid grid-cols-1 lg:grid-cols-2 lg:gap-10 m-auto w-11/12'
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
            <section className="hidden lg:block">
                <TableContainer  component={Paper}>
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
                                children={<FaArchive id='Archive' size="1.8rem" className='cursor-pointer p-1 rounded' color="red" onClick={() => handleArchive(Ticket._id)} />}
                            />
                        )) : (<h2 className='font-bold pt-5 text-center text-red-700 text-4xl'>No Tickets Found.</h2> )
                    }
                    </TableBody>
                </TableContainer>
            </section>
        </div>
            )
        }
    </div>
)
}

export default Project_Information
