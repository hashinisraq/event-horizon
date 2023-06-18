import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';

const SetupVenue = () => {
    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];



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


    const [loginData, setLoginData] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }


    const handleRegisterSubmit = e => {
        //     const venues = [{
        //         name: loginData.venueName,
        //         location: loginData.venueLocation,
        //         capacity: loginData.venueCapacity,
        //         amenities: loginData.venueAmenities,
        //         availability: availability,
        //         booked: false,
        //         bookedTime: [],
        //         status: 'pending'
        //     }]

        e.preventDefault();
    }



    return (
        <Container>
            <h5 className='text-center pb-3'>Setup Venue</h5>

            <Form>
                <Form.Group className='pt-2 pb-3'>
                    <Form.Group controlId="venueName" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label>Venue Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="venueName"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Venue Name'
                            required />
                    </Form.Group>

                    <Form.Group controlId="venueLocation" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label>Venue Location:</Form.Label>
                        <Form.Control
                            type="text"
                            name="venueLocation"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Venue Location'
                            required />
                    </Form.Group>

                    <Form.Group controlId="venueCapacity" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label>Venue Capacity:</Form.Label>
                        <Form.Control
                            type="number"
                            name="venueCapacity"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Venue Capacity'
                            required />
                    </Form.Group>

                    <Form.Group controlId="venueAmenities" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label>Venue Amenities:</Form.Label>
                        <Form.Control
                            type="text"
                            name="venueAmenities"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Venue Amenities'
                            required />
                    </Form.Group>

                    <div className='py-3'>
                        <Form.Label>Venue Availablity:</Form.Label>
                        {availability.map((timeSlot, index) => (
                            <div key={index} >
                                <div className='d-flex justify-content-around align-items-center'>
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
                    </div>

                    <Form.Group controlId="phoneNo" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label>Phone No:</Form.Label>
                        <Form.Control
                            type="text"
                            name="phoneNo"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Phone No'
                            required />
                    </Form.Group>
                </Form.Group>


                <div className="pb-5">
                    <Button className='w-30' variant="dark" onClick={e => handleRegisterSubmit(e)}>Add Venue</Button>
                </div>

            </Form>


        </Container>
    );
};

export default SetupVenue;