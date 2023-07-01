import React from 'react';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

const AboutUs = () => {
    return (
        <div>
            <Header />
            <div className='d-flex justify-content-center align-items-center'>
                <div className='w-50 d-flex justify-content-center align-items-center'>
                    <div className='px-5'>
                        <h3 className="text-warning" style={{ fontWeight: "bold" }}>Why Event Horizon?</h3>
                        <p>Event Horizon provides an extensive database of diverse event venues for any occasion. With a user-friendly
                            interface, you can effortlessly browse, check availability, and book venues in just a few clicks.
                            Say goodbye to tedious emails and paperwork - <b>Event Horizon simplifies the booking process.</b></p>
                    </div>
                </div>
                <div style={{ padding: "15% 0" }} className='bg-warning w-50 d-flex justify-content-center align-items-center'>
                    <img src="https://i.ibb.co/bKw44rm/logo2.png" width="50%" alt="logo" />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;