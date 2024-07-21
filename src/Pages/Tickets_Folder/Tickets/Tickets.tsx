import React from 'react';
import { IoIosPricetags } from "react-icons/io";
import TableHeading from '../../../Components/Common/TableHead/TableHeading';
import { TableContainer } from '@mui/material';

const Tickets:React.FC = () => {
return (
    <div className='text-black' >
        <figure className='flex gap-4' >
            <IoIosPricetags size="3rem" />
            <h1 className='font-bold pb-2 text-5xl'>All Tickets</h1>
        </figure>
        <hr />
        <TableContainer sx={{ maxHeight: '800px', }} >
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
        </TableContainer>
    </div>
)
}   

export default Tickets