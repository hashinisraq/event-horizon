import React, { useState } from 'react';
import { Button, Container, Dropdown, Form } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';

const DeleteVenue = () => {
    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];


    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (eventKey) => {
        setSelectedOption(eventKey);
    };


    let selectedVenue = selectedUser?.venues.filter(vn => `{${vn.name}}` === selectedOption)[0];


    const handleDelete = (venue, email) => {
        if (window.confirm("Are you sure to delete this venue?")) {
            fetch("https://event-horizon-8f3s.onrender.com/owner_venue", {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ venue, email })
            })
                .then(res => res.json())
                .then(result => {
                })
            setSelectedOption('');
        }

    }

    return (
        <Container style={{ height: "100vh" }}>
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
                        <Button variant="dark" onClick={e => {
                            e.preventDefault();
                            handleDelete(selectedVenue, selectedUser.email)
                        }}>Delete</Button>
                    </div>
                </> :
                    <></>
                }
            </Form>

        </Container>
    );
};

export default DeleteVenue;