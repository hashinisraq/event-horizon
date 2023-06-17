import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useUsers from '../../../hooks/useUsers';
import { Button, Container, Form } from 'react-bootstrap';

const DeleteVenue = () => {
    const { user } = useAuth();
    const [users] = useUsers();
    const [venueName, setVenueName] = useState({});

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];


    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...venueName };
        newLoginData[field] = value;
        setVenueName(newLoginData);
    }

    const handleDelete = e => {
        if (venueName.venueName === undefined) {
            alert("Complete the field to delete the venue!");
            return
        }
        // console.log(venueName.venueName)

        let fieldValue = document.getElementById("venueName");
        fieldValue.value = ""; // field empty
        setVenueName({}); // state empty

        e.preventDefault();
    }

    return (
        <Container>
            <h5 className='text-center pb-3'>Delete Venue</h5>

            <Form>
                <Form.Group className='mb-3 d-flex justify-content-around align-items-center'>
                    <Form.Label>Enter Venue Name</Form.Label>
                    <Form.Control
                        id="venueName"
                        type='venueName'
                        name='venueName'
                        placeholder='venue name'
                        onBlur={handleOnBlur}
                        style={{ width: "50%" }}
                        required />
                </Form.Group>
            </Form>

            <div className="text-center">
                <Button variant="dark" onClick={handleDelete}>Delete</Button>
            </div>
        </Container>
    );
};

export default DeleteVenue;