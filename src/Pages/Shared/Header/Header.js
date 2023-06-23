import React from 'react';
import logo from "../../../Assets/Images/logo.png";
import { Link } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';
import { Button } from 'react-bootstrap';
import useUsers from '../../../hooks/useUsers';

const Header = () => {
    const { user, logOut } = useFirebase();
    const [users] = useUsers();

    const selectedUser = users.filter(usr => usr.email === user.email)[0];

    return (
        <div className='text-center pb-2 pt-4'>
            <Link to="/home"><img src={logo} alt="bg" srcSet="" width="15%" /></Link>
            {user.displayName !== undefined ? <div className='d-flex justify-content-center align-item-center text-white'>
                <h4 className='pe-2'>Welcome, {selectedUser?.name}</h4>
                <Button variant='dark' onClick={logOut}>Logout</Button>
            </div> : <></>}
        </div>
    );
};

export default Header;