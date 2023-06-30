import React, { useState } from 'react';
import styles from '../../../Assets/Styles/styles.module.css';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import { Button, Dropdown, Form } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import useUsers from '../../../hooks/useUsers';

const GoogleRegister = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [provideData, setProvideData] = useState({});
    const { saveUser, user } = useAuth();


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


    const [users] = useUsers();
    const selectedUser = users?.filter(usr => usr.email === user.email)
    const history = useNavigate();
    if (selectedUser[0]?.email !== undefined) {
        history("/dashboard")
    }


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


    const handleInfoSubmit = (e) => {
        if (selectedOption === 'customer') {
            saveUser(user.email, user.displayName, selectedOption, provideData.phoneNo, [], provideData.profileImageLink);
            history("/dashboard");
        }

        if (selectedOption === 'owner') {
            const venues = [{
                name: provideData.venueName,
                venueRegNo: provideData.venueRegNo,
                venuePrice: provideData.venuePrice,
                venueImgLink: provideData.venueImgLink,
                location: provideData.venueLocation,
                capacity: provideData.venueCapacity,
                size: provideData.venueSize,
                amenities: provideData.venueAmenities,
                availability: availability,
                booked: false,
                bookedInfo: [],
                status: 'pending'
            }]

            saveUser(user.email, user.displayName, selectedOption, provideData.phoneNo, venues, provideData.profileImageLink);
            history("/dashboard");
        }
        e.preventDefault();
    }

    return (
        <div className={styles.bgStyle}>
            <Header />
            <div className={styles.contentStyle}>
                <div className='text-white pt-3'>
                    <h3>Provide Details 🙋 </h3>

                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupProfileImageLink">
                            <Form.Label>Your Profile Banner Link</Form.Label>
                            <Form.Control
                                type="test"
                                name="profileImageLink"
                                onBlur={handleOnBlur}
                                placeholder="Profile Banner Link"
                                required />
                        </Form.Group>
                        <Form.Group className='pt-2'>
                            <Dropdown className='py-2' onSelect={handleOptionChange}>
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
                                    <Form.Group controlId="venueName" className='py-3'>
                                        <Form.Label>Venue Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="venueName"
                                            onBlur={handleOnBlur}
                                            placeholder='Venue Name'
                                            required />
                                    </Form.Group>

                                    <Form.Group controlId="venueImgLink" className="mb-3">
                                        <Form.Label>Venue Image Link:</Form.Label>
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

                                    <Form.Group controlId="venueLocation" className='py-3'>
                                        <Form.Label>Venue Location:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="venueLocation"
                                            onBlur={handleOnBlur}
                                            placeholder='Venue Location'
                                            required />
                                    </Form.Group>

                                    <Form.Group controlId="venueCapacity" className='py-3'>
                                        <Form.Label>Venue Capacity:</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="venueCapacity"
                                            onBlur={handleOnBlur}
                                            placeholder='Venue Capacity'
                                            required />
                                    </Form.Group>

                                    <Form.Group controlId="venueSize" className="mb-3">
                                        <Form.Label>Venue Size:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="venueSize"
                                            onBlur={handleOnBlur}
                                            placeholder='Big/Small/Medium'
                                            required />
                                    </Form.Group>

                                    <Form.Group controlId="venueAmenities" className='py-3'>
                                        <Form.Label>Venue Amenities:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="venueAmenities"
                                            onBlur={handleOnBlur}
                                            placeholder='Venue Amenities'
                                            required />
                                    </Form.Group>


                                    <Form.Label>Venue Availablity:</Form.Label>
                                    {availability.map((timeSlot, index) => (
                                        <div key={index}>
                                            <div className='d-flex'>
                                                <Form.Group className='pe-3' controlId={`startTime-${index}`}>
                                                    <Form.Label>Start Time</Form.Label>
                                                    <Form.Control
                                                        type="time"
                                                        name="startTime"
                                                        value={timeSlot.startTime}
                                                        onChange={(e) => handleChange(e, index)}
                                                        required
                                                    />
                                                </Form.Group>

                                                <Form.Group controlId={`endTime-${index}`}>
                                                    <Form.Label>End Time</Form.Label>
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

                                    <Form.Group controlId="phoneNo">
                                        <Form.Label>Phone No:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phoneNo"
                                            onBlur={handleOnBlur}
                                            placeholder='Phone No'
                                            required />
                                    </Form.Group>

                                    <div className='text-center py-3'>
                                        <Button variant='dark' onClick={handleInfoSubmit}>Submit</Button>
                                    </div>
                                </div>
                            )}

                            {selectedOption === 'customer' && (
                                <div className='pb-4'>
                                    <h5 className='text-center'>Customer Info</h5>
                                    <Form.Group controlId="phoneNo" className='py-3'>
                                        <Form.Label>Phone No:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phoneNo"
                                            onBlur={handleOnBlur}
                                            placeholder='Phone No'
                                            required />
                                    </Form.Group>
                                    <div className='text-center py-3'>
                                        <Button variant='dark' onClick={handleInfoSubmit}>Submit</Button>
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