import axios from "axios";
import { format } from 'date-fns';
import { FaUser } from "react-icons/fa";
import { Link  } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { FaArchive } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { RiEdit2Fill } from "react-icons/ri";
import { IoCalendarSharp } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import Loading from "../../../assets/Loading_Image.gif";
import Button from "../../../Components/Common/Button/Button";
import Project from "../../../Components/Common/Project/Project";
import { useGetUserID } from "../../../Components/Hooks/useGetUserID"; 

const Ticket_Details:React.FC = () => {

    const { id } = useParams()
    const UserID = useGetUserID(); 
    const [Cookie, _] = useCookies(["auth_token"])

    // USESTATE HOOK

    const [Users, setUsers] = useState<[]>([])
    const [userOwner, __] = useState<any>(UserID)
    const [Tickets, setTickets] = useState<any>([])
    const [Assigned, setAssigned] = useState<[]>([])
    const [Comments, setComments] = useState<[]>([])
    const [Projects, setProjects] = useState<any>([])
    const [Success, setSuccess] = useState<string>("")
    const [Comment, setComment] = useState<string>("")
    const [TicketID, setTicketID] = useState<string>("")
    const [Submitted, setSubmitted] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [ProjectName, setProjectName] = useState<string>("")
    const [CommentError, setCommentError] = useState<string>("")

    // FETCHING TICKET DETAILS BY USER ID

    useEffect(() => {

        const FetchTickets = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/${id}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setTickets(Response.data)
                setTicketID(Response.data._id)
                setProjectName(Response.data.Project)
            })
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } 
    
        FetchTickets()
    
    },[])
    
    // FETCHING PROJECT NAME
    
    useEffect(() => {
    
        const FetchProject = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Projects/Name/${ProjectName}`, {
            headers: { authorization: Cookie.auth_token }
            }) 
            .then((Response) => {
                setProjects(Response.data)
                setAssigned(Response.data.Assigned[0])
            })
        }

        FetchProject()
    
    },[ProjectName])
    
    // FETCHING TICKET COMMENT(S) BY TICKET ID
    
    useEffect(() => {
    
        const FetchComments = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Comments/Comment/${TicketID}`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setComments(Response.data)     
            })
        }

        FetchComments()
    
    },[TicketID])

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
    
    // FETCHING NAMES OF ITRACK USERS
    
    useEffect(() => {
    
        const FetchUsers = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Users/`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setUsers(Response.data)
            })
        } 
    
        FetchUsers()
    
    },[])
    
    // ADDING A COMMENT TO A TICKET
    
    const AddComment = (e: any) => {
        e.preventDefault()

        if (Comment === "") {
            setCommentError("Kindly add a name and comment!") 
        } else {
            const data = {
                Comment, TicketID, Submitted, userOwner
            }
            try {
                axios.post("https://itrack-server-9s7w.onrender.com/Comments/AddComment", data , {
                    headers: { authorization: Cookie.auth_token },
                }) 
                .then(() => { 
                    setComment("")
                    setSuccess("Comment successfully added.") 
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                })
            } catch (error) {
                
                console.error(error) 
            }
        }
    }
    
    // DATE CONVERSION FROM MONGO DB FORMAT TO DATE FORMAT

    const setDate = (date: any) => {
        const dateObj = new Date(date);
        return format(dateObj, 'dd-MM-yyyy');
    }

return (
    <div className='flex flex-col'> 
        {isLoading ? (
            <div className="hidden xl:flex items-center justify-center w-screen">
                <img src={Loading} alt="Loading..." className='Loading' />
            </div>
            ) : (
            <div className='grid grid-cols-1 gap-5 px-5 text-black lg:grid-cols-2'>
            <section className="hidden lg:block">
                <h2 className='font-bold pb-2 text-3xl underline'>Project Details</h2>
                <Project
                    Image={Projects.Image}
                    Name={Projects.Name}
                    Description={Projects.Description}
                    Priority={Projects.Priority}
                    StartDate={Projects.StartDate}
                    EndDate={Projects.EndDate}
                    Manager={Projects.Manager}
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
            <article>
                <section className="mb-5" >
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:-mb-1'>
                        <h2 className='font-bold pb-2 text-3xl'>{Tickets.Name}</h2>
                        <div className='flex justify-between sm:items-center sm:justify-center gap-5'>
                            <b>Ticket Date: {setDate(Tickets.Date)}</b>
                            <div id='ArchiveTicket'>
                                <FaArchive size="1.8rem" className='cursor-pointer p-1 rounded' color="red" onClick={() => handleArchive(Tickets._id)} />
                            </div>
                            <Link id="EditTicket" className='no-underline text-black' to={`/Ticket/${Tickets._id}`} key={Tickets._id} >
                                <RiEdit2Fill size="2rem" className='cursor-pointer rounded-full' color="green"/>
                            </Link> 
                        </div>
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
                    <ul className="max-h-48 overflow-y-scroll" >
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
                <section className="flex flex-col gap-2 mt-5 mb-5"> 
                    <h2 className='font-bold pb-2 text-3xl'>Add a Comment</h2>
                    <textarea className="border-black border-b h-20 outline-none truncate px-1 py-1 text-black w-12/12" name="" id="" value={Comment} onChange={(e: any) => setComment(e.target.value)}></textarea>
                    <label className='font-bold'>Submitted By</label>
                        <select name="" id="Submitted" value={Submitted} onChange={(e: any) => setSubmitted(e.target.value)} className="border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-13" required >
                            <option value="">Select from the options below</option>
                            {
                            Users.map((User: any) => {
                                return(
                                    <option value={User.Name}>{User.Name}</option> 
                                )
                            })
                            }
                        </select>
                    <p className='font-bold pt-5 text-center text-red-700 text-4xl'>{CommentError}</p>
                    <h4 className='font-bold text-center text-green-700'>{Success}</h4>
                    <div className="flex items-center justify-center lg:items-start lg:justify-start">
                        <Button 
                            onClick={AddComment}
                            ButtonStyle="bg-red-800 cursor-pointer text-center text-white px-3 py-1 rounded w-56"
                            ButtonText="Add Comment"
                        />
                    </div>
                </section>
            </article>
        </div> 
        )}
    </div>
)}

export default Ticket_Details
