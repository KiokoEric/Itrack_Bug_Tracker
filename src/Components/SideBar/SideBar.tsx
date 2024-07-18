import axios from "axios";
import { FiLogIn } from "react-icons/fi";
import { useCookies } from "react-cookie";
import { BiLogOut } from "react-icons/bi";
import { FaFolder } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa6";
import { FaFolderPlus } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { SiCommerzbank } from "react-icons/si";
import { IoMdPricetags } from "react-icons/io";
import { BsFillTagFill } from "react-icons/bs";
import { MdFolderShared } from "react-icons/md";
import { BsFillTagsFill } from "react-icons/bs";
import { IoFolderSharp } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import React, { useEffect, useState } from 'react';
import { useGetUserID } from "../Hooks/useGetUserID";
import { Link, useNavigate } from "react-router-dom";
import { faBugs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideBar: React.FC = () => {

    const userID = useGetUserID();
    const navigate = useNavigate()
    const [Name, setName] = useState("")
    const [Showticket, setShowticket] = useState(false);
    const [Showproject, setShowproject] = useState(false);
    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    useEffect(() => {
        
        const FetchName  = async() => {
            await axios.get(`https://localhost:4000/Users/${userID}/Name`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setName(Response.data.Name)
            })
        } 
    
        if (userID) {
            FetchName()
        } 

    },[userID])

    const Logout = () => {
        setCookie("auth_token", "");
        window.localStorage.clear();
        navigate("/");
    }

return (
    <div id="SideBar" className="bg-red-700 flex flex-col justify-between mt-0.5 py-5 rounded text-white min-w-max" >
        <section className="flex flex-col gap-3 px-5">
            <div>
                <figure className="flex font-bold justify-center gap-1.5">
                    <FontAwesomeIcon icon={faBugs} className=" text-white rounded-full text-5xl" />
                    <h1 className="text-4xl" >Itrack</h1>
                </figure>
                {userID ? <h3>Welcome {Name}</h3> : null }
            </div>
            <div className="flex flex-col gap-3.5 mt-5 px-5">
                <Link to="/Dashboard" className='cursor-pointer flex items-center gap-1.5 text-lg'>
                    <BiSolidDashboard size="1.5rem" />Dashboard
                </Link>
                <section>
                    <h3 onClick={() => setShowproject(!Showproject)} className='cursor-pointer flex items-center gap-1.5 font-bold text-lg'>
                        <IoFolderSharp size="1.5rem" />Projects
                    </h3>
                    {Showproject ? (
                        <article className="flex flex-col gap-2 m-3" >
                            <Link to="/Create_Project" className='cursor-pointer flex gap-2' >
                                <FaFolderPlus className='text-white no-underline'  />
                                Create Project
                            </Link>
                            <Link to="/My_Projects" className='cursor-pointer flex gap-2' >
                                <MdFolderShared className='cursor-pointer text-white no-underline'  />
                                My Projects
                            </Link>
                            <Link to="/All_Projects" className='cursor-pointer flex gap-2' >
                                <FaFolder className='text-white no-underline'  />
                                All Projects
                            </Link>
                            <Link to="/ProjectArchives" className='cursor-pointer flex gap-2' >
                                <FaArchive className='text-white no-underline'  />
                                Archived Projects
                            </Link>
                        </article>
                    ) : ""}
                </section>
                <section>
                    <h3 onClick={() => setShowticket(!Showticket)} className='cursor-pointer flex items-center gap-1.5 font-bold text-lg'>
                        <IoMdPricetags size='1.5rem' />
                        Tickets
                    </h3>
                    {
                    Showticket ? (
                        <article className="flex flex-col gap-2 m-3">
                            <Link to="/Create_Ticket" className='cursor-pointer flex gap-2' >
                                <BsFillTagFill className='text-white no-underline'  />
                                Create Ticket
                            </Link>
                            <Link to="/My_Tickets" className='cursor-pointer flex gap-2' >
                                <FaUserTag className=' text-white no-underline'  />
                                My Tickets
                            </Link>
                            <Link to="/All_Tickets" className='cursor-pointer flex gap-2' >
                                <BsFillTagsFill className='text-white no-underline'  />
                                All Tickets
                            </Link>
                            <Link to="/TicketArchives" className='cursor-pointer flex gap-2' >
                                <FaArchive className='text-white no-underline'  />
                                Archived Tickets
                            </Link>
                        </article>
                    ) : ""
                    }
                </section>
                <Link to="/Administration" className='cursor-pointer flex items-center gap-1.5 text-lg'>
                <SiCommerzbank size='1.5rem' />
                    Administration
                </Link>
            </div>
        </section>
        <section className="flex flex-col gap-5 px-5">
            <div className="flex flex-col gap-3.5" >
                {
                userID ? <Link to={`/${userID}`} className='flex gap-1.5 text-lg'>
                    <AiOutlineUser className='cursor-pointer text-white no-underline' />
                    Profile
                </Link> : ""
                }
                {
                !userID ? <Link to="/Registration" className='flex gap-1.5 text-lg' >
                    <AiOutlineUserAdd className='cursor-pointer text-white no-underline' />
                        Create New User
                    </Link> : ""
                }
                {
                !Cookie.auth_token ?
                (
                    <Link to="/" className='flex gap-1.5 text-lg' >
                        <FiLogIn className='cursor-pointer text-white no-underline' />
                        Login
                    </Link>
                ) : 
                (
                    <button onClick={Logout} className='flex gap-1.5 text-lg'>
                        <BiLogOut className="cursor-pointer text-white no-underline" />
                        Logout
                    </button>
                )
                }
            </div>
        </section>
    </div>
)
}

export default SideBar