import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import styles from '../../Assets/Styles/styles.module.css';

const Home = () => {

    return (
        <div className={styles.bgStyle}>
            <Header />
            <div className={styles.contentStyle}>
                <div className='text-center text-white'>
                    <div className='pb-3'>
                        <h3>Creating Memories! 🙋 </h3>
                        <h3>One Event at a Time 😇 </h3>
                    </div>
                    <Link to='/login'>
                        <Button variant='dark'>Login/Sign up</Button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
