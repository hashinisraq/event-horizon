import React, { useState } from 'react';
import { Button, Container, Dropdown, Form } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';

const UpdateVenue = () => {
    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];


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

    const [provideData, setProvideData] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newProvideData = { ...provideData };
        newProvideData[field] = value;
        setProvideData(newProvideData);
    }

    const handleRegisterSubmit = e => {
        const emailAddress = selectedUser.email;
        const oldVenue = selectedVenue.name;
        const venue = {
            name: provideData.venueName,
            venueRegNo: provideData.venueRegNo,
            venueImgLink: provideData.venueImgLink,
            location: provideData.venueLocation,
            capacity: provideData.venueCapacity,
            size: provideData.venueSize,
            amenities: provideData.venueAmenities,
            availability: availability,
        }

        if (window.confirm("Are you sure you want to update your venue?")) {
            fetch('https://event-horizon-8f3s.onrender.com/venue_update', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ emailAddress, oldVenue, venue })
            })
                .then(res => res.json())
                .then(result => {
                })
            setSelectedOption('');
            setAvailability([{ startTime: '', endTime: '' }]);
            setProvideData({});
        }

        e.preventDefault();
    }

    let selectedVenue = selectedUser?.venues.filter(vn => `{${vn.name}}` === selectedOption)[0];


    return (
        <Container style={{ height: "100vh" }}>
            <h5 className='text-center pb-3'>Update Venue</h5>


            <Form>
                <Form.Group className='pt-2 pb-3'>
                    <Dropdown onSelect={handleOptionChange} className='pb-3'>
                        <Dropdown.Toggle variant="dark" id="registration-dropdown">
                            Select Venue
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                selectedUser?.venues.map(vn => <Dropdown.Item
                                    eventKey={`{${vn.name}}`}
                                    key={vn.name}
                                >{vn.name}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                    {selectedOption !== "" && (
                        <div className='pb-4'>
                            <Form.Group controlId="venueName" className="mb-3 d-flex justify-content-around align-items-center">
                                <Form.Label className="pt-3">Venue Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="venueName"
                                    onBlur={handleOnBlur}
                                    style={{ width: "50%" }}
                                    placeholder={`${selectedVenue.name}`}
                                    required />
                            </Form.Group>

                            <Form.Group controlId="venueLocation" className="mb-3 d-flex justify-content-around align-items-center">
                                <Form.Label>Venue Location:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="venueLocation"
                                    onBlur={handleOnBlur}
                                    style={{ width: "50%" }}
                                    placeholder={`${selectedVenue.location}`}
                                    required />
                            </Form.Group>

                            <Form.Group controlId="venueRegNo" className="mb-3">
                                <Form.Label className='text-dark'>Venue Registration No:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="venueRegNo"
                                    onBlur={handleOnBlur}
                                    style={{ width: "50%" }}
                                    placeholder={`${selectedVenue?.venueRegNo}`}
                                    required />
                            </Form.Group>

                            <Form.Group controlId="venueCapacity" className="mb-3 d-flex justify-content-around align-items-center">
                                <Form.Label>Venue Capacity:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="venueCapacity"
                                    onBlur={handleOnBlur}
                                    style={{ width: "50%" }}
                                    placeholder={`${selectedVenue.capacity}`}
                                    required />
                            </Form.Group>

                            <Form.Group controlId="venueSize" className="mb-3 d-flex justify-content-around align-items-center">
                                <Form.Label>Venue Size:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="venueSize"
                                    onBlur={handleOnBlur}
                                    style={{ width: "50%" }}
                                    placeholder={`${selectedVenue.size}`}
                                    required />
                            </Form.Group>

                            <Form.Group controlId="venueAmenities" className="mb-3 d-flex justify-content-around align-items-center">
                                <Form.Label>Venue Amenities:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="venueAmenities"
                                    onBlur={handleOnBlur}
                                    style={{ width: "50%" }}
                                    placeholder={`${selectedVenue.amenities}`}
                                    required />
                            </Form.Group>


                            <Form.Group controlId="venueImgLink" className="mb-3">
                                <Form.Label>Venue Image Link:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="venueImgLink"
                                    onBlur={handleOnBlur}
                                    placeholder={`${selectedVenue.venueImgLink}`}
                                    required />
                            </Form.Group>




                            <div className="py-3">
                                <Form.Label>Add New Venue Availablity:</Form.Label>
                                {availability.map((timeSlot, index) => (
                                    <div key={index}>
                                        <div className='d-flex justify-content-center align-items-center'>
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
                            <div className="pb-5">
                                <Button className='w-50' variant="dark" onClick={e => handleRegisterSubmit(e)}>Update</Button>
                            </div>
                        </div>
                    )}
                </Form.Group>


            </Form>
        </Container>
    );
};

export default UpdateVenue;