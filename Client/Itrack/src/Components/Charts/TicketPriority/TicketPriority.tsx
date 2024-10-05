import axios from "axios";
import { useCookies } from "react-cookie";
import { Doughnut } from "react-chartjs-2";
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement} from "chart.js";

ChartJS.register(ArcElement);

const TicketPriority:React.FC = () => {

    const [Cookie, _] = useCookies(["auth_token"]);

    // USESTATE HOOK

    const [ LowPriority, setLowPriority ] = useState<string>("")
    const [ HighPriority, setHighPriority ] = useState<string>("")
    const [ MediumPriority, setMediumPriority ] = useState<string>("")
    const [ CriticalPriority, setCriticalPriority ] = useState<string>("")

    // FETCHING THE TOTAL NUMBER OF THE DIFFERENT PRIORITY CATEGORIES

    useEffect(() => {

        const FetchLowPriority = () => {
            axios.get(`http://localhost:4000/Ticket/PriorityLength/Low`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setLowPriority(Response.data.ArrayLength) 
            })
        } 

        const FetchMediumPriority = () => {
            axios.get(`http://localhost:4000/Ticket/PriorityLength/Medium`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setMediumPriority(Response.data.ArrayLength)
            })
        } 

        const FetchHighPriority = () => {
            axios.get(`http://localhost:4000/Ticket/PriorityLength/High`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setHighPriority(Response.data.ArrayLength)
            })
        } 

        const FetchCriticalPriority = () => {
            axios.get(`http://localhost:4000/Ticket/PriorityLength/Critical`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setCriticalPriority(Response.data.ArrayLength)
            })
        } 

        FetchLowPriority()

        FetchHighPriority()

        FetchMediumPriority()

        FetchCriticalPriority()

    },[])

    const Priority = {

        data: {
        datasets: [{
            data: [LowPriority, MediumPriority, HighPriority, CriticalPriority],
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
        <Doughnut {...Priority}></Doughnut> 
    </div>
)
}

export default TicketPriority
