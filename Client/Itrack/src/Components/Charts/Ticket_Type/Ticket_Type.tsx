import axios from "axios";
import { useCookies } from "react-cookie";
import { Doughnut } from "react-chartjs-2";
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement} from "chart.js";

ChartJS.register(ArcElement);

const TicketType:React.FC = () => {

    const [Cookie, _] = useCookies(["auth_token"]);

    // USESTATE HOOK

    const [ Defect, setDefect ] = useState<string>("")
    const [ Feature, setFeature ] = useState<string>("")
    const [ Hardware, setHardware ] = useState<string>("")
    const [ Enhancement, setEnhancement ] = useState<string>("")
    const [ Documentation, setDocumentation ] = useState<string>("")

    // FETCHING THE TOTAL NUMBER OF THE DIFFERENT TYPE CATEGORIES

    useEffect(() => {

        const FetchDefect = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/CategoryLength/Defect`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setDefect(Response.data.ArrayLength)
            })
        } 

        const FetchDocumentation = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/CategoryLength/Documentation`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setDocumentation(Response.data.ArrayLength)
            })
        } 

        const FetchEnhancement = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/CategoryLength/Enhancement`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setEnhancement(Response.data.ArrayLength)
            })
        } 

        const FetchFeature = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/CategoryLength/Feature_Request`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setFeature(Response.data.ArrayLength)
            })
        } 

        const FetchHardware = () => {
            axios.get(`https://itrack-server-9s7w.onrender.com/Ticket/CategoryLength/Hardware_Problem`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setHardware(Response.data.ArrayLength) 
            })
        } 

        FetchDefect() 

        FetchFeature()

        FetchHardware()

        FetchEnhancement()

        FetchDocumentation()

    },[])

    const Category = {

        data: {
        datasets: [{
            data: [Defect, Documentation, Enhancement, Feature, Hardware],
            backgroundColor: [
                '#065F46',
                '#1E3A8A',
                '#9D174D',
                '#B91C1C',
                '#4C1D95'
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
        <Doughnut {...Category}></Doughnut> 
    </div>
)
}

export default TicketType
