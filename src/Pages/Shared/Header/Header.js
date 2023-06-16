import React from 'react';
import logo from "../../../Assets/Images/logo.png";
import { Link } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';
import { Button } from 'react-bootstrap';

const Header = () => {
    const { user, emailLogOut, googleLogOut } = useFirebase();

    return (
        <div className='text-center pb-2 pt-4'>
            <Link to="/home"><img src={logo} alt="bg" srcSet="" width="15%" /></Link>
            {user.displayName !== undefined ? <div className='d-flex justify-content-center align-item-center text-white'>
                <h4 className='pe-2'>Welcome, {user.displayName}</h4>
                <Button variant='dark' onClick={googleLogOut}>Logout</Button>
            </div> : <></>}
        </div>
    );
};

export default Header;