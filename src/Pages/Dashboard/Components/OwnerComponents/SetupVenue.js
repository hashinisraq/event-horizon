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


    const [provideData, setProvideData] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newProvideData = { ...provideData };
        newProvideData[field] = value;
        setProvideData(newProvideData);
    }


    const handleRegisterSubmit = e => {
        const email = selectedUser.email;
        const venue = {
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
        }

        if (window.confirm("Are you sure to add this venue?")) {
            fetch('https://event-horizon-8f3s.onrender.com/venue_setup', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ venue, email })
            })
                .then(res => res.json())
                .then(result => {
                })
            setProvideData({});
            setAvailability([{ startTime: '', endTime: '' }]);
        }
        e.preventDefault();
    }



    return (
        <Container>
            <h5 className='text-center pb-3 text-dark'>Setup Venue</h5>

            <Form>
                <Form.Group className='pt-2 pb-3'>
                    <Form.Group controlId="venueName" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label className='text-dark'>Venue Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="venueName"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Venue Name'
                            required />
                    </Form.Group>

                    <Form.Group controlId="venueLocation" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label className='text-dark'>Venue Location:</Form.Label>
                        <Form.Control
                            type="text"
                            name="venueLocation"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Venue Location'
                            required />
                    </Form.Group>

                    <Form.Group controlId="venueRegNo" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label className='text-dark'>Venue Registration No:</Form.Label>
                        <Form.Control
                            type="text"
                            name="venueRegNo"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Venue Registration No'
                            required />
                    </Form.Group>

                    <Form.Group controlId="venuePrice" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label className='text-dark'>Venue Price:</Form.Label>
                        <Form.Control
                            type="text"
                            name="venuePrice"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Venue Price'
                            required />
                    </Form.Group>

                    <Form.Group controlId="venueCapacity" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label className='text-dark'>Venue Capacity:</Form.Label>
                        <Form.Control
                            type="text"
                            name="venueCapacity"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Venue Capacity'
                            required />
                    </Form.Group>

                    <Form.Group controlId="venueSize" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label className='text-dark'>Venue Size:</Form.Label>
                        <Form.Control
                            type="text"
                            name="venueSize"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Big/Small/Medium'
                            required />
                    </Form.Group>

                    <Form.Group controlId="venueAmenities" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label className='text-dark'>Venue Amenities:</Form.Label>
                        <Form.Control
                            type="text"
                            name="venueAmenities"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Venue Amenities'
                            required />
                    </Form.Group>

                    <Form.Group controlId="venueImgLink" className="mb-3 d-flex justify-content-around align-items-center">
                        <Form.Label className='text-dark'>Venue Image Link:</Form.Label>
                        <Form.Control
                            type="text"
                            name="venueImgLink"
                            onBlur={handleOnBlur}
                            style={{ width: "50%" }}
                            placeholder='Venue Image Link'
                            required />
                    </Form.Group>

                    <div className='py-3'>
                        <Form.Label>Venue Availablity:</Form.Label>
                        {availability.map((timeSlot, index) => (
                            <div key={index} >
                                <div className='d-flex justify-content-around align-items-center'>
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