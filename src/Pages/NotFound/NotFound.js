import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import styles from '../../Assets/Styles/styles.module.css';

const NotFound = () => {

    return (
        <div className={styles.bgStyle}>
            <Header />
            <div className={styles.contentStyle}>
                <div className='text-center text-danger'>
                    <h1>404</h1>
                    <h5>Page Not Found</h5>
                    <p>The resourse requested could not be found on this server</p>
                    <Link to="/home">
                        <Button variant="dark">Go Home </Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;