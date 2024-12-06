import axios from "axios";
import { useCookies } from "react-cookie";
import { Doughnut } from "react-chartjs-2";
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement} from "chart.js";

ChartJS.register(ArcElement);

const TicketStatus:React.FC = () => {

    const [Cookie, _] = useCookies(["auth_token"]);

    // USESTATE HOOK

    const [Open, setOpen] = useState<string>("")
    const [Done, setDone] = useState<string>("")
    const [Progress, setProgress] = useState<string>("")
    const [Resolved, setResolved] = useState<string>("")

    // FETCHING THE TOTAL NUMBER OF THE DIFFERENT STATUS CATEGORIES

    useEffect(() => {

        const FetchOpen = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/StatusLength/Open`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setOpen(Response.data.ArrayLength)
            })
        } 

        const FetchProgressStatus = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/StatusLength/In_Progress`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setProgress(Response.data.ArrayLength)
            })
        } 

        const FetchResolvedStatus = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/StatusLength/Resolved`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setResolved(Response.data.ArrayLength)
            })
        } 

        const FetchDoneStatus = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/StatusLength/Done`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setDone(Response.data.ArrayLength)
            })
        } 

        FetchOpen()

        FetchDoneStatus()

        FetchProgressStatus()

        FetchResolvedStatus()

    },[])

        const Status = {

            data: {
            datasets: [{
                data: [Open, Progress, Resolved, Done],
                backgroundColor: [
                    '#065F46',
                    '#1E3A8A',
                    '#9D174D',
                    '#B91C1C'
                ],
                hoverOffset: 4,
                borderRadius: 5, 
                spacing: 0,
            }]},
        
            options: {
                cutout: 10 
            }
        }

return (
    <div className="mx-auto w-80 sm:w-52 xl:w-80">
        <Doughnut {...Status}></Doughnut> 
    </div>
)
}

export default TicketStatus
