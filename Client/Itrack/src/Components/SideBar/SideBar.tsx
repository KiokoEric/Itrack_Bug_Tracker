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
import { useNavigate } from "react-router-dom";
import { MdFolderShared } from "react-icons/md";
import { BsFillTagsFill } from "react-icons/bs";
import { IoFolderSharp } from "react-icons/io5";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";
import React, { useEffect, useState } from 'react';
import Navigate from "../Common/Navigate/Navigate";
import { useGetUserID } from "../Hooks/useGetUserID";
import { faX } from '@fortawesome/free-solid-svg-icons';
import { AdministrationID } from "../Hooks/Administrator";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBugs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SideBar: React.FC = () => {

    const userID = useGetUserID();
    const navigate = useNavigate();
    const Administrator = AdministrationID();
    const [ Cookie, setCookie ] = useCookies(["auth_token"]);

    // USESTATE HOOK

    const [Name, setName] = useState<string>("")
    const [Showticket, setShowticket] = useState<boolean>(false);
    const [Showproject, setShowproject] = useState<boolean>(false);
    const [ExtendNavbar,setExtendNavbar ] = useState<boolean>(true)

    // DISPLAYING AND HIDING OF PASSWORDS
    
    const toggleMenu = () => {
        setExtendNavbar(!ExtendNavbar);
    };

    // FETCHING THE USER'S NAME

    useEffect(() => {
        
        const FetchName  = async() => {
            await axios.get(`http://localhost:4000/Users/${userID}/Name`, {
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

    // LOGOUT FUNCTION

    const Logout = () => {
        setCookie("auth_token", "");
        window.localStorage.clear();
        navigate("/");
    }

return (
    <div>
        <div id="SideBar" className="hidden bg-red-700 flex-col justify-between min-h-screen min-w-max mt-0.5 py-5 rounded text-white xl:flex">
            <section className="flex flex-col gap-3 px-5">
                <div>
                    <figure className="flex font-bold justify-center gap-1.5">
                        <FontAwesomeIcon icon={faBugs} className=" text-white rounded-full text-5xl" />
                        <h1 className="text-4xl">Itrack</h1>
                    </figure>
                    {userID ? <h3 className="font-bold mt-5 text-center"><span className="mr-1">Welcome</span>{Name}</h3> : null }
                </div>
                <div className="flex flex-col gap-3.5 mt-2 px-5">
                    <Navigate
                        children={<BiSolidDashboard size="1.5rem" />}
                        Navigation="/Dashboard"
                        NavigateStyle="cursor-pointer flex items-center gap-1.5 text-lg"
                        NavigateText="Dashboard"
                    />
                    <section>
                        <h3 onClick={() => setShowproject(!Showproject)} className='cursor-pointer flex items-center gap-1.5 font-bold text-lg'>
                            <IoFolderSharp size="1.5rem" />Projects
                        </h3>
                        {Showproject ? (
                            <article className="flex flex-col gap-2 m-3">
                                <Navigate
                                    children={<FaFolderPlus className='cursor-pointer text-white no-underline'  />}
                                    Navigation="/Create_Project"
                                    NavigateStyle="cursor-pointer flex gap-2"
                                    NavigateText="Create Project"
                                />
                                {
                                    Administrator ? null : 
                                    <Navigate
                                        children={<MdFolderShared className='cursor-pointer text-white no-underline'  />}
                                        Navigation="/My_Projects"
                                        NavigateStyle="cursor-pointer flex gap-2"
                                        NavigateText="My Projects"
                                    />
                                }
                                <Navigate
                                    children={<FaFolder className='cursor-pointer text-white no-underline'  />}
                                    Navigation="/Projects"
                                    NavigateStyle="cursor-pointer flex gap-2"
                                    NavigateText="All Projects"
                                />
                                <Navigate
                                    children={<FaArchive className='cursor-pointer text-white no-underline'  />}
                                    Navigation="/ProjectArchives"
                                    NavigateStyle="cursor-pointer flex gap-2"
                                    NavigateText="Archived Projects"
                                />
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
                                <Navigate
                                    children={<BsFillTagFill className='cursor-pointer text-white no-underline'  />}
                                    Navigation="/Create_Ticket"
                                    NavigateStyle="cursor-pointer flex gap-2"
                                    NavigateText="Create Ticket"
                                />
                                {
                                    Administrator ? null :
                                    <Navigate
                                        children={<FaUserTag className='cursor-pointer text-white no-underline'  />}
                                        Navigation="/My_Tickets"
                                        NavigateStyle="cursor-pointer flex gap-2"
                                        NavigateText="My Tickets"
                                    />
                                }
                                
                                <Navigate
                                    children={<BsFillTagsFill className='cursor-pointer text-white no-underline'  />}
                                    Navigation="/Tickets"
                                    NavigateStyle="cursor-pointer flex gap-2"
                                    NavigateText="All Tickets"
                                />
                                <Navigate
                                    children={<FaArchive className='cursor-pointer text-white no-underline'  />}
                                    Navigation="/TicketArchives"
                                    NavigateStyle="cursor-pointer flex gap-2"
                                    NavigateText="Archived Tickets"
                                />
                            </article>
                        ) : ""
                        }
                    </section>
                    {
                        Administrator ? 
                        <Navigate
                            children={<SiCommerzbank size='1.5rem' className='cursor-pointer text-white no-underline'  />}
                            Navigation="/Administration"
                            NavigateStyle="cursor-pointer flex items-center gap-1.5 text-lg"
                            NavigateText="Administration"
                        /> : null
                    }
                </div>
            </section>
            <section className="flex flex-col gap-5 px-5">
                <div className="flex flex-col gap-3.5" >
                    {
                    userID ? 
                        <Navigate
                            children={<AiOutlineUser className='cursor-pointer text-white no-underline'  />}
                            Navigation={`/${userID}`}
                            NavigateStyle="cursor-pointer flex gap-1.5 text-lg"
                            NavigateText="Profile"
                        /> : ""
                    }
                    {
                    Administrator ? 
                    <Navigate
                        children={<AiOutlineUserAdd className='cursor-pointer text-white no-underline'  />}
                        Navigation={"/Registration"}
                        NavigateStyle="cursor-pointer flex gap-1.5 text-lg"
                        NavigateText="Create New User"
                    /> : ""
                    }
                    {
                    !Cookie.auth_token ?
                    (
                    <Navigate
                        children={<FiLogIn className='cursor-pointer text-white no-underline'  />}
                        Navigation={"/"}
                        NavigateStyle="cursor-pointer flex gap-1.5 text-lg"
                        NavigateText="Login"
                    />
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
        {/* MOBILE MENU */}
        <div className="flex items-center justify-between px-2 py-1 shadow-lg sticky text-black w-screen z-50 xl:hidden">
            <Navigate
                Navigation={"/Dashboard"}
                NavigateStyle="font-bold text-4xl"
                NavigateText="Itrack"
            />
            <div className="flex items-center justify-center gap-3">
                <Navigate
                    ID='ProfileIcon'
                    children={<FontAwesomeIcon icon={faUser} className="bg-black text-white p-2 rounded-full text-base" />}
                    Navigation={`/${userID}`}
                />
                <button onClick={toggleMenu} className="focus:outline-none">
                    {ExtendNavbar ? <FontAwesomeIcon icon={faX} className="text-sm" /> : <FontAwesomeIcon icon={faBars} className="text-base" />}
                </button>
                {userID ? <h3 className="font-bold flex flex-col text-center"><span>Welcome</span>{Name}</h3> : null }
            </div>
            {ExtendNavbar && (
                <nav className="bg-white absolute top-14 right-0 flex flex-col gap-4 m-auto pl-4 pt-2 pb-8 rounded-Header text-base text-black w-36 xl:hidden">
                    <Navigate
                        Navigation="/Dashboard"
                        NavigateStyle="border-b border-black text-black no-underline w-28"
                        NavigateText="Dashboard"
                    />
                    <section>
                        <h3 onClick={() => setShowproject(!Showproject)} className='border-b border-black cursor-pointer flex items-center gap-1.5 font-bold text-lg w-28'>
                            Projects
                        </h3>
                        {Showproject ? (
                            <article className="flex flex-col gap-2 m-3">
                                <Navigate
                                    Navigation="/Create_Project"
                                    NavigateStyle="border-b border-black text-black no-underline w-28"
                                    NavigateText="Create Project"
                                />
                                <Navigate
                                    Navigation="/My_Projects"
                                    NavigateStyle="border-b border-black text-black no-underline w-28"
                                    NavigateText="My Projects"
                                />
                                <Navigate
                                    Navigation="/Projects"
                                    NavigateStyle="border-b border-black text-black no-underline w-28"
                                    NavigateText="All Projects"
                                />
                                <Navigate
                                    Navigation="/ProjectArchives"
                                    NavigateStyle="border-b border-black text-black no-underline w-28"
                                    NavigateText="Archived Projects"
                                />
                            </article>
                        ) : ""}
                    </section>
                    <section>
                        <h3 onClick={() => setShowticket(!Showticket)} className='border-b border-black cursor-pointer flex items-center gap-1.5 font-bold text-lg w-28'>
                            Tickets
                        </h3>
                        {Showticket ? (
                            <article className="flex flex-col gap-2 m-3">
                                <Navigate
                                    Navigation="/Create_Ticket"
                                    NavigateStyle="border-b border-black text-black no-underline w-28"
                                    NavigateText="Create Ticket"
                                />
                                <Navigate
                                    Navigation="/My_Tickets"
                                    NavigateStyle="border-b border-black text-black no-underline w-28"
                                    NavigateText="My Tickets"
                                />
                                <Navigate
                                    Navigation="/Tickets"
                                    NavigateStyle="border-b border-black text-black no-underline w-28"
                                    NavigateText="All Tickets"
                                />
                                <Navigate
                                    Navigation="/TicketArchives"
                                    NavigateStyle="border-b border-black text-black no-underline w-28"
                                    NavigateText="Archived Tickets"
                                />
                            </article>
                        ) : ""}
                    </section>
                    {
                        Administrator ? 
                        <Navigate
                            Navigation="/Administration"
                            NavigateStyle="border-b border-black text-black no-underline w-28"
                            NavigateText="Administration"
                        /> : null
                    }
                    {
                    Administrator ?
                        <Navigate
                            Navigation="/Registration"
                            NavigateStyle="border-b border-black text-black no-underline w-28"
                            NavigateText="Create New User"
                        /> : null
                    }
                    {
                    !Cookie.auth_token ?
                    (
                        <Navigate
                            Navigation="/"
                            NavigateStyle="border-b border-black text-black no-underline w-28"
                            NavigateText="Login"
                        />
                    ) : 
                    (
                        <Navigate
                            NavigateStyle="border-b border-black text-black no-underline w-28"
                            NavigateText="Logout"
                            onClick={Logout}
                        />
                    )
                    }
                </nav>
            )}
        </div>
    </div>
)
}

export default SideBar
