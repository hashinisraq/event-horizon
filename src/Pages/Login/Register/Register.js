import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Dropdown, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import useFirebase from '../../../hooks/useFirebase';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const { signInUsingGooogle, user } = useAuth();
    const location = useLocation();


    const [selectedOption, setSelectedOption] = useState('');

    const [availability, setAvailability] = useState([{ startTime: '', endTime: '' }]);
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setAvailability((prevState) => {
            const updatedAvailability = [...prevState];
            updatedAvailability[index][name] = value;
            return updatedAvailability;
        });
    };
    const handleAddSlot = () => {
        setAvailability((prevState) => [...prevState, { startTime: '', endTime: '' }]);
    };
    const handleRemoveSlot = (index) => {
        setAvailability((prevState) => {
            const updatedAvailability = [...prevState];
            updatedAvailability.splice(index, 1);
            return updatedAvailability;
        });
    };


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
            registerUser(loginData.email, loginData.password, loginData.name, history, selectedOption, loginData.phoneNo, [], loginData.profileImageLink);
        }

        if (selectedOption === 'owner') {
            const venues = [{
                name: loginData.venueName,
                venueImgLink: loginData.venueImgLink,
                venueRegNo: loginData.venueRegNo,
                venuePrice: loginData.venuePrice,
                location: loginData.venueLocation,
                capacity: loginData.venueCapacity,
                size: loginData.venueSize,
                amenities: loginData.venueAmenities,
                availability: availability,
                booked: false,
                bookedInfo: [],
                status: 'pending'
            }]
            registerUser(loginData.email, loginData.password, loginData.name, history, selectedOption, loginData.phoneNo, venues, loginData.profileImageLink);
        }
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        history(location.state?.from || '/home');

        if (user.abcd === undefined) {
            history("/googleRegister")
        }
    }


    return (
        <div>
            <Header />
            <div>
                <Container className='d-flex align-items-center justify-content-center py-5'>
                    <Row className='p-2' style={{ width: "50%", border: "1px solid gray", borderRadius: "8px" }}>
                        <Col sm={12} md={12} lg={12} className='text-white'>
                            <h2 className='text-center text-warning'>Register</h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="formGroupName">
                                    <Form.Label className='text-dark'>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        onBlur={handleOnBlur}
                                        placeholder="Name"
                                        required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label className='text-dark'>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        onBlur={handleOnBlur}
                                        placeholder="Email"
                                        required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label className='text-dark'>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        onBlur={handleOnBlur}
                                        placeholder="Password"
                                        required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupRePassword">
                                    <Form.Label className='text-dark'>Re-type Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password2"
                                        onBlur={handleOnBlur}
                                        placeholder="Password"
                                        required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGroupProfileImageLink">
                                    <Form.Label className='text-dark'>Profile Banner Link</Form.Label>
                                    <Form.Control
                                        type="test"
                                        name="profileImageLink"
                                        onBlur={handleOnBlur}
                                        placeholder="Profile Banner Link"
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
                                                <Form.Label className='text-dark'>Venue Name:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="venueName"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Name'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="venueImgLink" className="mb-3">
                                                <Form.Label className='text-dark'>Venue Image Link:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="venueImgLink"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Image Link'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="venueRegNo" className="mb-3">
                                                <Form.Label className='text-dark'>Venue Registration No:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="venueRegNo"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Registration No'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="venuePrice" className="mb-3">
                                                <Form.Label className='text-dark'>Venue Price:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="venuePrice"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Price'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="venueLocation" className="mb-3">
                                                <Form.Label className='text-dark'>Venue Location:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="venueLocation"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Location'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="venueCapacity" className="mb-3">
                                                <Form.Label className='text-dark'>Venue Capacity:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="venueCapacity"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Capacity'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="venueSize" className="mb-3">
                                                <Form.Label className='text-dark'>Venue Size:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="venueSize"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Big/Small/Medium'
                                                    required />
                                            </Form.Group>

                                            <Form.Group controlId="venueAmenities" className="mb-3">
                                                <Form.Label className='text-dark'>Venue Amenities:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="venueAmenities"
                                                    onBlur={handleOnBlur}
                                                    placeholder='Venue Amenities'
                                                    required />
                                            </Form.Group>


                                            <Form.Label className='text-dark'>Venue Availablity:</Form.Label>
                                            {availability.map((timeSlot, index) => (
                                                <div key={index}>
                                                    <div className='d-flex'>
                                                        <Form.Group className='pe-3' controlId={`startTime-${index}`}>
                                                            <Form.Label className='text-dark'>Start Time</Form.Label>
                                                            <Form.Control
                                                                type="time"
                                                                name="startTime"
                                                                value={timeSlot.startTime}
                                                                onChange={(e) => handleChange(e, index)}
                                                                required
                                                            />
                                                        </Form.Group>

                                                        <Form.Group controlId={`endTime-${index}`}>
                                                            <Form.Label className='text-dark'>End Time</Form.Label>
                                                            <Form.Control
                                                                type="time"
                                                                name="endTime"
                                                                value={timeSlot.endTime}
                                                                onChange={(e) => handleChange(e, index)}
                                                                required
                                                            />
                                                        </Form.Group>
                                                    </div>

                                                    {index > 0 && (
                                                        <Button className='my-2' variant="danger" onClick={() => handleRemoveSlot(index)}>
                                                            Remove
                                                        </Button>
                                                    )}

                                                    <hr />
                                                </div>
                                            ))}

                                            <Button className='mb-3' variant="dark" onClick={handleAddSlot}>
                                                Add Time Slot
                                            </Button>

                                            <Form.Group controlId="phoneNo" className="mb-3">
                                                <Form.Label className='text-dark'>Phone No:</Form.Label>
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
                                                <Form.Label className='text-dark'>Phone No:</Form.Label>
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

                                <div className="pb-3">
                                    <Button className='w-100' variant="warning" onClick={e => handleRegisterSubmit(e)}>Sign up</Button>
                                    {authError && <Alert variant="danger">{authError}</Alert>}
                                </div>

                                <div className='text-center text-dark'>
                                    <h6>OR</h6>
                                </div>

                                <div className='text-center pt-3 pb-5'>
                                    <Button
                                        variant='transparent'
                                        style={{ border: "1px solid yellow" }}
                                        className='text-warning w-100 h-10'
                                        onClick={() => {
                                            signInUsingGooogle();
                                            handleGoogleSignIn();
                                        }}
                                    >
                                        <img className='pe-2' width="30px" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google-logo" srcSet="" />
                                        Sign in with Google
                                    </Button>
                                </div>

                                {/* <div className='text-center pt-3 pb-5'>
                                    <Link to="/login">
                                        <Button className='w-100' variant="light">Already A User? Please Login</Button>
                                    </Link>
                                </div> */}
                            </Form>
                            {isLoading && <div className="d-flex justify-content-center align-items-center"><Spinner animation="border" variant="dark" /></div>}
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div >
    );
};

export default Register;