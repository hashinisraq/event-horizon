import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

const NotFound = () => {

    return (
        <div>
            <Header />
            <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
                <div className='text-center text-dark'>
                    <h1>404</h1>
                    <h5>Page Not Found</h5>
                    <p>The resourse requested could not be found on this server</p>
                    <Link to="/home">
                        <Button variant="warning">Go Home </Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NotFound;