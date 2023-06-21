import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import styles from '../../../../Assets/Styles/styles.module.css';
import Header from '../../../Shared/Header/Header';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';

const BookingCart = () => {
    const venueTitle = useParams();

    const { user } = useAuth();
    const [users] = useUsers();

    // const selectedUser = users?.filter(usr => usr.email === user.email);

    return (
        <div className={styles.bgStyle}>
            <Header />
            <div className={styles.contentStyle}>
                <Container>
                    {venueTitle.venueTitle}
                </Container>
            </div>

        </div>
    );
};

export default BookingCart;