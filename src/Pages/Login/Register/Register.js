import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Dropdown, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import styles from '../../../Assets/Styles/styles.module.css';
import useFirebase from '../../../hooks/useFirebase';

const Register = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (eventKey) => {
        setSelectedOption(eventKey);
    };

    const [loginData, setLoginData] = useState({});
    const { registerUser, isLoading, authError } = useFirebase();

    const history = useNavigate();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleRegisterSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Your password did not match');
            return
        }

        if (selectedOption === 'customer') {
            registerUser(loginData.email, loginData.password, loginData.name, history, selectedOption, loginData.phoneNo, []);
        }

        if (selectedOption === 'owner') {
            const venues = [{
                name: loginData.venueName,
                location: loginData.venueLocation,
                capacity: loginData.venueCapacity,
                amenities: loginData.venueAmenities,
                avalability: loginData.venueAvailability,
                status: 'pending'
            }]
            registerUser(loginData.email, loginData.password, loginData.name, history, selectedOption, loginData.phoneNo, venues);
        }
        e.preventDefault();
    }


    return (
        <div className={styles.bgStyle}>
            <Header />
            <div className={styles.contentStyle}>
                <Container className='px-5 pb-5'>
                    <Row>
                        <Col sm={12} md={12} lg={12} className='text-white'>
                            <h2 className='text-center'>Register</h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        onBlur={handleOnBlur}
                                        placeholder="Name"
                                        required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Your Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        onBlur={handleOnBlur}
                                        placeholder="Email"
                                        required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Your Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        onBlur={handleOnBlur}
                                        placeholder="Password"
                                        required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupRePassword">
                                    <Form.Label>Re-type Your Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password2"
                                        onBlur={handleOnBlur}
                                        placeholder="Password"
                                        required />
                                </Form.Group>

                                <Form.Group className='pt-2 pb-3'>
                                    <Dropdown onSelect={handleOptionChange}>
                                        <Dropdown.Toggle variant="dark" id="registration-dropdown">
                                            Set Role
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="owner">Owner</Dropdown.Item>
                                            <Dropdown.Item eventKey="customer">Customer</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    {selectedOption === 'owner' && (
                                        <div className='pb-4'>
                                            <h5 className='text-center'>Owner Venue Info</h5>
                                            <Form.Group controlId="venueName" className="mb-3">
                                                <Form.Label>Venue Name:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="venueName"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Name'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="venueLocation" className="mb-3">
                                                <Form.Label>Venue Location:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="venueLocation"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Location'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="venueCapacity" className="mb-3">
                                                <Form.Label>Venue Capacity:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="venueCapacity"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Capacity'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="venueAmenities" className="mb-3">
                                                <Form.Label>Venue Amenities:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="venueAmenities"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Amenities'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="venueAvailability" className="mb-3">
                                                <Form.Label>Venue Availablity:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="venueAvailability"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Availibility'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="phoneNo" className="mb-3">
                                                <Form.Label>Phone No:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phoneNo"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Phone No'
                                                    required />
                                            </Form.Group>
                                        </div>
                                    )}

                                    {selectedOption === 'customer' && (
                                        <div className='pb-4'>
                                            <h5 className='text-center'>Customer Info</h5>
                                            <Form.Group controlId="phoneNo">
                                                <Form.Label>Phone No:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phoneNo"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Phone No'
                                                    required />
                                            </Form.Group>
                                        </div>
                                    )}
                                </Form.Group>


                                <div className="pb-5">
                                    <Button className='w-100' variant="dark" onClick={e => handleRegisterSubmit(e)}>Sign up</Button>
                                    {authError && <Alert variant="danger">{authError}</Alert>}
                                </div>


                                <div className='text-center pt-3 pb-5'>
                                    <Link to="/login">
                                        <Button className='w-100' variant="light">Already A User? Please Login</Button>
                                    </Link>
                                </div>
                            </Form>
                            {isLoading && <div className="d-flex justify-content-center align-items-center"><Spinner animation="border" variant="dark" /></div>}
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default Register;