import React from 'react';
import {  TableHead, TableRow, TableCell, Typography } from '@mui/material'

interface TableHeadProps {
    FirstHeading: string;
    ThirdHeading: string;
    FifthHeading?: string;
    SixthHeading?: string;
    SecondHeading: string;
    FourthHeading: string;
    EighthHeading?: string;
    SeventhHeading?: string;
}

const TableHeading: React.FC<TableHeadProps> = ({ FirstHeading, SecondHeading, ThirdHeading, FourthHeading, FifthHeading, SixthHeading, SeventhHeading, EighthHeading}) => {
return (
    <TableHead>
        <TableRow sx={{ borderBottom: '1px solid black', display: 'flex', justifyContent: 'space-between', alignContent: 'center', height: '40px', margin: 'auto',  width: '1150px' , overflow: 'hidden' }}>
                <TableCell><Typography sx={{ fontWeight: 'bold', width: '115px' }}>{FirstHeading}</Typography></TableCell>
                <TableCell><Typography sx={{ fontWeight: 'bold', width: '115px'  }}>{SecondHeading}</Typography></TableCell>
                <TableCell><Typography sx={{ fontWeight: 'bold', width: '115px'  }}>{ThirdHeading}</Typography></TableCell>
                <TableCell><Typography sx={{ fontWeight: 'bold', width: '115px'  }}>{FourthHeading}</Typography></TableCell>
                <TableCell><Typography sx={{ fontWeight: 'bold', width: '115px'  }}>{FifthHeading}</Typography></TableCell>
                <TableCell><Typography sx={{ fontWeight: 'bold', width: '115px'  }}>{SixthHeading}</Typography></TableCell>
                <TableCell><Typography sx={{ fontWeight: 'bold', width: '115px'  }}>{SeventhHeading}</Typography></TableCell>
                <TableCell><Typography sx={{ fontWeight: 'bold', width: '115px'  }}>{EighthHeading}</Typography></TableCell>
        </TableRow>
    </TableHead>
)
}

export default React.memo(TableHeading)
