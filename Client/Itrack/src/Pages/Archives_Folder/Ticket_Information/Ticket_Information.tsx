import axios from "axios";
import { format } from 'date-fns';
import { FaUser } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { FaArchive } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { IoCalendarSharp } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import Loading from "../../../assets/Loading_Image.gif";
import Heading from '../../../Components/Common/Heading/Heading';

const Ticket_Information:React.FC = () => {

    const { id } = useParams()
    const [Cookie, _] = useCookies(["auth_token"])

    // USESTATE HOOK

    const [Comments, setComments] = useState([])
    const [TicketID, setTicketID] = useState("")
    const [Tickets, setTickets] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true);

    // FETCHING TICKET BY TICKET ID

    useEffect(() => {

        const FetchTickets = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/TicketArchives/${id}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTickets(Response.data)
                setTicketID(Response.data.ID)
            })
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); 
    
        FetchTickets()
    
        },[])

    // FETCHING COMMENT BY TICKET ID

    useEffect(() => {

        const FetchComments = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Comments/Comment/${TicketID}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setComments(Response.data)     
            })
        }

        if (TicketID) {
            FetchComments()
        }

    },[TicketID])

    // DATE CONVERSION FROM MONGO DB FORMAT TO DATE FORMAT

    const setDate = (date: any) => {
        const dateObj = new Date(date);
        return format(dateObj, 'dd-MM-yyyy');
    }

return (
    <div className="mb-2 mx-auto w-10/12">
        {isLoading ? (
            <div className="flex items-center justify-center" >
                <img src={Loading} alt="Loading..." className='m-auto w-1/2' />
            </div>
            ) : (
        <div>
            <Heading
                ContainerStyle="flex gap-2 items-center justify-center xl:justify-start"
                Children={<FaArchive  size="3rem" />}
                TextStyle="font-bold text-3xl sm:text-5xl"
                HeadingText="Archived Tickets Details"
            />
            <hr />
            <br />
            <article>
            <section className="mb-5" >
                <div className='flex flex-row items-end justify-between'>
                    <h2 className='font-bold pb-2 text-3xl'>{Tickets.Name}</h2>
                    <b>Ticket Date: {setDate(Tickets.Date)}</b>
                </div>
                <hr />
                <div>
                    <h3 className='font-bold mt-3 pb-2 text-2xl'>Ticket Description</h3>
                    <p>{Tickets.Description}</p> 
                </div>
                <div className='flex justify-between mt-5'>
                    <h4 className='pb-2 text-lg'><b>Ticket Category</b>: {Tickets.Category}</h4>
                    <h4 className='pb-2 text-lg'><b>Submitted By</b>: {Tickets.Submitted}</h4>
                </div>
            </section>
            <section className='flex flex-col gap-5'>
                <h2 className='font-bold pb-2 text-3xl -mb-6'>Comments Section</h2>
                <hr />
                <ul>
                    { (Comments.length > 0) ? 
                        Comments.map((Comment: any) => {
                            return(
                                <li className="border-black border-b flex flex-col gap-2">
                                    <p className="flex items-center gap-2"><FaComment size='1.2rem' />{Comment.Comment}</p>
                                    <section className="flex justify-between" >
                                        <div className="flex gap-2 items-center">
                                            <IoCalendarSharp />
                                            <p>{setDate(Comment.Date)}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <FaUser />
                                            <p>{Comment.Submitted}</p>
                                        </div> 
                                    </section>
                                </li>
                            )
                        }) : (
                            <h2 className='font-bold pt-5 text-center text-red-700 text-4xl'>No Comments Found.</h2> 
                        )
                    }
                </ul>
            </section>
            </article>
        </div>
        )
    }
    </div>
)}

export default Ticket_Information
