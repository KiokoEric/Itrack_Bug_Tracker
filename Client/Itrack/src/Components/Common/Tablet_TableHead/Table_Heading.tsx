import React from 'react';
import {  TableHead, TableRow, TableCell, Typography } from '@mui/material'

interface TableHeadProps {
    FirstHeading: string;
    ThirdHeading: string;
    FifthHeading?: string;
    SixthHeading?: string;
    SecondHeading: string;
    FourthHeading: string;
}

const Table_Heading: React.FC<TableHeadProps> = ({ FirstHeading, SecondHeading, ThirdHeading, FourthHeading, FifthHeading, SixthHeading}) => {
return (
    <TableHead>
        <TableRow sx={{ borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', alignContent: 'center', height: '40px', margin: 'auto',  width: '725px' , overflow: 'hidden' }}>
            <TableCell><Typography sx={{ fontWeight: 'bold', width: '100px' }}>{FirstHeading}</Typography></TableCell>
            <TableCell><Typography sx={{ fontWeight: 'bold', width: '100px'  }}>{SecondHeading}</Typography></TableCell>
            <TableCell><Typography sx={{ fontWeight: 'bold', width: '100px'  }}>{ThirdHeading}</Typography></TableCell>
            <TableCell><Typography sx={{ fontWeight: 'bold', width: '100px'  }}>{FourthHeading}</Typography></TableCell>
            <TableCell><Typography sx={{ fontWeight: 'bold', width: '100px'  }}>{FifthHeading}</Typography></TableCell>
        </TableRow>
    </TableHead>
)
}

export default React.memo(Table_Heading)
