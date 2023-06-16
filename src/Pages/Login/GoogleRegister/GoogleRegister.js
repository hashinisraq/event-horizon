import React, { useState } from 'react';
import styles from '../../../Assets/Styles/styles.module.css';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import { Button, Dropdown, Form } from 'react-bootstrap';

const GoogleRegister = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [provideData, setProvideData] = useState({});

    const handleOptionChange = (eventKey) => {
        setSelectedOption(eventKey);
    };

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...provideData };
        newLoginData[field] = value;
        setProvideData(newLoginData);
    }

    return (
        <div className={styles.bgStyle}>
            <Header />
            <div className={styles.contentStyle}>
                <div className='text-white pt-3'>
                    <h3>Provide Details 🙋 </h3>

                    <Form>
                        <Form.Group className='pt-2'>
                            <Dropdown className='py-2' onSelect={handleOptionChange}>
                                <Dropdown.Toggle variant="dark" id="registration-dropdown">
                                    Choose Catagory
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="owner">Owner Venue</Dropdown.Item>
                                    <Dropdown.Item eventKey="customer">Customer</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            {selectedOption === 'owner' && (
                                <div className='pb-4'>
                                    <h5 className='text-center'>Owner Venue Info</h5>
                                    <Form.Group controlId="registrationNo" className='py-3'>
                                        <Form.Label>Venue Registration No:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="registationNo"
                                            onBlur={handleOnBlur}
                                            placeholder='Registration No'
                                            required />
                                    </Form.Group>

                                    <Form.Group controlId="mobileNo">
                                        <Form.Label>Mobile No:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="mobileNo"
                                            onBlur={handleOnBlur}
                                            placeholder='Mobile No'
                                            required />
                                    </Form.Group>

                                    <div className='text-center py-3'>
                                        <Button variant='dark'>Submit</Button>
                                    </div>
                                </div>
                            )}

                            {selectedOption === 'customer' && (
                                <div className='pb-4'>
                                    <h5 className='text-center'>Customer Info</h5>
                                    <Form.Group controlId="customerMobileNo" className='py-3'>
                                        <Form.Label>Mobile No:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="mobileNo"
                                            onBlur={handleOnBlur}
                                            placeholder='Mobile No'
                                            required />
                                    </Form.Group>
                                    <div className='text-center py-3'>
                                        <Button variant='dark'>Submit</Button>
                                    </div>
                                </div>
                            )}
                        </Form.Group>
                    </Form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GoogleRegister;