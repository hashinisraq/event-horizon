import React, { useState } from 'react';
import { Button, Container, Dropdown, Form } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';

const DeleteVenue = () => {
    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];


    const handleDelete = e => {
        // if (venueName.venueName === undefined) {
        //     alert("Complete the field to delete the venue!");
        //     return
        // }
        // // console.log(venueName.venueName)

        // let fieldValue = document.getElementById("venueName");
        // fieldValue.value = ""; // field empty
        // setVenueName({}); // state empty

        e.preventDefault();
    }


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



    const handleRegisterSubmit = e => {
        // if (loginData.password !== loginData.password2) {
        //     alert('Your password did not match');
        //     return
        // }

        // if (selectedOption === 'customer') {
        //     registerUser(loginData.email, loginData.password, loginData.name, history, selectedOption, loginData.phoneNo, []);
        // }

        // if (selectedOption === 'owner') {
        //     const venues = [{
        //         name: loginData.venueName,
        //         location: loginData.venueLocation,
        //         capacity: loginData.venueCapacity,
        //         size: loginData.venueSize,
        //         amenities: loginData.venueAmenities,
        //         availability: availability,
        //         booked: false,
        //         bookedInfo: [],
        //         status: 'pending'
        //     }]
        //     registerUser(loginData.email, loginData.password, loginData.name, history, selectedOption, loginData.phoneNo, venues);
        // }
        e.preventDefault();
    }

    let selectedVenue = selectedUser?.venues.filter(vn => `{${vn.name}}` === selectedOption)[0];
    // console.log(selectedVenue)

    return (
        <Container>
            <h5 className='text-center pb-3'>Delete Venue</h5>

            <Form>
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

                {selectedOption !== "" ? <>
                    <Form.Group className='mb-3 d-flex justify-content-around align-items-center'>
                        <Form.Label>Selected Venue </Form.Label>
                        <Form.Control
                            id="venueName"
                            type='venueName'
                            name='venueName'
                            placeholder={`${selectedVenue.name}`}
                            style={{ width: "50%" }}
                            required />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="dark" onClick={handleDelete}>Delete</Button>
                    </div>
                </> :
                    <></>
                }
            </Form>

        </Container>
    );
};

export default DeleteVenue;