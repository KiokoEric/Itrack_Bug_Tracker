import React from 'react';
import { TableRow, TableCell, Typography } from '@mui/material'

interface TableProps {
    FirstHeading: string;
    ThirdHeading?: string;
    SecondHeading: string;
}

const TableHead:React.FC<TableProps> = ({FirstHeading, SecondHeading, ThirdHeading}) => {
return (
    <TableRow sx={{ borderBottom: '1px solid black', display: 'flex', height: '40px', justifyContent: 'space-between', margin: 'auto', width: '340px' , overflow: 'hidden' }}>
        <TableCell><Typography sx={{ fontWeight: 'bold', width: '90px' }}>{FirstHeading}</Typography></TableCell>
        <TableCell><Typography sx={{ fontWeight: 'bold', width: '90px' }}>{SecondHeading}</Typography></TableCell>
        <TableCell><Typography sx={{ fontWeight: 'bold', width: '90px' }}>{ThirdHeading}</Typography></TableCell>
    </TableRow>
)
}

export default React.memo(TableHead)
