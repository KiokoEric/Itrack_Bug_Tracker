import axios from "axios";
import { FaUser } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { RiFolder6Fill } from "react-icons/ri";
import { IoIosPricetags } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import Output from "../../Components/Common/Output/Output";
import Heading from "../../Components/Common/Heading/Heading";
import TypeLabels from "../../Components/Charts/Ticket_Type/Type_Lables";
import TicketType from "../../Components/Charts/Ticket_Type/Ticket_Type";
import TicketStatus from "../../Components/Charts/Ticket_Status/Ticket_Status";
import StatusLabels from "../../Components/Charts/Ticket_Status/Status_Labels";
import PriorityLabels from "../../Components/Charts/Ticket_Priority/Priority_Labels";
import TicketPriority from "../../Components/Charts/Ticket_Priority/Ticket_Priority";

const Dashboard:React.FC = () => {

    const [Cookie, _] = useCookies(["auth_token"]);

    // USESTATE HOOK

    const [Users, setUsers] = useState<string>("")
    const [Projects, setProjects] = useState<[]>([])
    const [Tickets, setTickets] = useState<string>('')
    const [ProjectNumber, setProjectNumber] = useState<string>("")

    // FETCHING ITRACK PROJECTS

    useEffect(() => {

        const fetchProjects = async () => {
            await axios.get(`http://localhost:4000/Projects/Projects`, {
            headers: { authorization: Cookie.auth_token },
            
            }) 
            .then((Response) => {
                setProjects(Response.data)
            });
        }
    
        fetchProjects()
    
    },[])
    
    // FETCHING THE NUMBER OF PROJECTS

    useEffect(() => {

        const ProjectNumber = async () => {
            await  axios.get(`http://localhost:4000/Projects/ProjectsTotal`, {
            headers: { authorization: Cookie.auth_token },
            
            }) 
            .then((Response) => {
                setProjectNumber(Response.data.ArrayLength)
            })
        }
    
        ProjectNumber()
    
    },[])
    
    // FETCHING THE NUMBER OF TICKETS
    
    useEffect(() => {

        const TicketNumber = async () => {
            await  axios.get(`http://localhost:4000/Ticket/TicketsTotal`, {
            headers: { authorization: Cookie.auth_token },
            
            }) 
            .then((Response) => {
                setTickets(Response.data.ArrayLength)
            })
        }
    
        TicketNumber()

    },[])
        
    // FETCHING THE NUMBER OF USERS
    
    useEffect(() => {

        const UserNumber = async () => {
            await  axios.get(`http://localhost:4000/Users/UsersLength`, {
            headers: { authorization: Cookie.auth_token },
            
            }) 
            .then((Response) => {
                setUsers(Response.data.ArrayLength)
            })
        }
    
        UserNumber()

    },[])

return (
    <div className="flex flex-col gap-5 mb-5 mx-auto w-11/12">
        <section className="grid grid-cols-1 gap-5 mx-auto w-11/12 md:justify-between md:grid-cols-3">
            <Heading
                BodyStyle="bg-red-700 pt-1 rounded"
                ContainerStyle="flex gap-2 items-center justify-center"
                Children={<RiFolder6Fill size="3rem" color="white"  />}
                TextStyle="font-bold pb-2 text-3xl text-white"
                HeadingText="Total Projects"
                HeadingStyle="font-bold pb-2 text-center text-4xl text-white"
                HeadingValue={ProjectNumber}
            />
            <Heading
                BodyStyle="bg-red-700 pt-1 rounded"
                ContainerStyle="flex gap-2 items-center justify-center"
                Children={<IoIosPricetags size="2.5rem" color="white"  />}
                TextStyle="font-bold pb-2 text-3xl text-white"
                HeadingText="Total Tickets"
                HeadingStyle="font-bold pb-2 text-center text-4xl text-white"
                HeadingValue={Tickets}
            />
            <Heading
                BodyStyle="bg-red-700 pt-1 rounded"
                ContainerStyle="flex gap-2 items-center justify-center"
                Children={<FaUser size="2.5rem" color="white" />}
                TextStyle="font-bold pb-2 text-3xl text-white"
                HeadingText="Total Users"
                HeadingStyle="font-bold pb-2 text-center text-4xl text-white"
                HeadingValue={Users}
            />
        </section>
            <h2 className="font-bold text-center text-4xl underline sm:text-left">Projects</h2>
        <section className="max">
            <div className="grid grid-cols-1 gap-8 items-center justify-center mt-2 sm:grid-cols-3">
                {
                (Projects.length > 0) ?  
                Projects.map((Project: any) => { 
                    return (
                        <Output
                            ID={Project._id}
                            Navigate = {`/ProjectDetails/${Project._id}`}
                            Image = {Project.Image}
                            Name = {Project.Name} 
                        />
                    )
                }) : <h2 className='font-bold m-auto text-center text-red-600 text-3xl w-screen'>No Projects Found.</h2> 
                }
            </div>
        </section>
        <section>
            <h2 className="font-bold mb-5 text-center text-4xl underline sm:text-left">Tickets</h2>
            <div className="grid grid-cols-1 items-center justify-center gap-5 md:grid-cols-3 md:items-start md:justify-between md:m-auto md:w-11/12">
                <div className="flex flex-col items-center gap-4">
                    <h3 className="font-bold mb-2 text-center text-3xl">Tickets by Status</h3>
                    <TicketStatus />
                    <StatusLabels />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <h3 className="font-bold mb-2 text-center text-3xl">Tickets by Priority</h3>
                    <TicketPriority />  
                    <PriorityLabels />
                </div>
                <div className="flex flex-col items-center gap-4">
                    <h3 className="font-bold mb-2 text-center text-3xl">Tickets by Type</h3>
                    <TicketType />
                    <TypeLabels />
                </div>
            </div>
        </section>
    </div>
)
}

export default Dashboard
