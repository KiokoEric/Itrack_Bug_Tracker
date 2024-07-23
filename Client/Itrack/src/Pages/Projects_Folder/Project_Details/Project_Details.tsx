import axios from "axios";
import { useCookies } from "react-cookie";
import Loading from "../../../assets/Loading.gif";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, TableBody, TableContainer } from '@mui/material';
import Project from "../../../Components/Common/Project/Project";
import TableOutput from "../../../Components/Common/TableOutput/TableOutput";
import TableHeading from "../../../Components/Common/TableHead/TableHeading";

const Project_Details:React.FC = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [Tickets, setTickets] = useState([])
    const [Assigned, setAssigned] = useState([])
    const [Cookie, _] = useCookies(["auth_token"])
    const [isLoading, setIsLoading] = useState(true)
    const [Projects, setProjects] = useState<any>([])
    const [ProjectName, setProjectName] = useState("")

    useEffect(() => {
        axios.get(`https://localhost:4000/Projects/${id}`, {
        headers: { authorization: Cookie.auth_token }
        }) 
        .then((Response) => {
            setProjects(Response.data)
            setProjectName(Response.data.Name)
            setAssigned(Response.data.Assigned)
        }) 
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    },[]) 

    useEffect(() => {

        const FetchTickets = () => { 
            axios.get(`https://localhost:4000/Tickets/Projects/${ProjectName}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTickets(Response.data)
            })
        } 
    
        if (ProjectName) {
            FetchTickets()
        }
        },[ProjectName])

    const handleDelete= (_id: any) => {
        axios.delete(`https://localhost:4000/Tickets/${_id}`, {
            headers: { authorization: Cookie.auth_token }
        })
        .then(() => {
            window.location.reload()
        }  
        )
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
    <div className="flex justify-between">
        {isLoading ? (
            <div className='Gif' >
                <img src={Loading} alt="Loading..." className='m-auto w-1/2' />
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
                    Assigned= {Assigned}
                    StartDate= {Projects.StartDate}
                    Description= {Projects.Description}
                    ContainerStyle= 'flex justify-between'
                />
            </section>
            <TableContainer  component={Paper} >
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

export default Project_Details