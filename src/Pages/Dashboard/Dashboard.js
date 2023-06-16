import React from 'react';
import styles from '../../Assets/Styles/styles.module.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className={styles.bgStyle}>
            <Header />
            <div className={styles.contentStyle}>
                <div className='text-center'>
                    <div className='pb-3'>
                        <h3 className='text-white'>DASHBOARD</h3>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;