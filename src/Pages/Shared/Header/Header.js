import React from 'react';
import logo from "../../../Assets/Images/logo.png";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='text-center pb-5 pt-4'>
            <Link to="/home"><img src={logo} alt="bg" srcSet="" width="15%" /></Link>
        </div>
    );
};

export default Header;