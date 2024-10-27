import React from 'react';
import { Link } from 'react-router-dom';

interface NavigateProps {
    ID?: any;
    onClick?:any
    children?: any;
    Navigation?: any;
    NavigateText?: string;
    NavigateStyle?: string;
}

const Navigate: React.FC<NavigateProps> = ({ ID, Navigation, NavigateStyle, children, NavigateText, onClick }) => {
return (
    <Link id={ID} to={Navigation} className={NavigateStyle} onClick={onClick}>
        { children }
        { NavigateText }
    </Link>
)
}

export default React.memo(Navigate)
