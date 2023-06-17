import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useUsers from '../../../hooks/useUsers';
import { Container } from 'react-bootstrap';

const SetupVenue = () => {
    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];


    return (
        <Container>
            <h5 className='text-center pb-3'>Setup Venue</h5>
        </Container>
    );
};

export default SetupVenue;