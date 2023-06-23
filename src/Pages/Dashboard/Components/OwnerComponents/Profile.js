import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';

const Profile = () => {
    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];

    const [profileData, setprofileData] = useState({});
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newprofileData = { ...profileData };
        newprofileData[field] = value;
        setprofileData(newprofileData);
    }

    const handleSubmit = (email, name, phone) => {
        const field = "emailAddress"
        const value = email;
        const newprofileData = { ...profileData };
        newprofileData[field] = value;
        setprofileData(newprofileData);

        if (profileData.name === "" || profileData.phoneNo === "") {
            alert("Please complete all the field or type previous data!")
        }
        else {
            if (window.confirm("Are you sure you want to update your details?")) {
                fetch('https://event-horizon-8f3s.onrender.com/owner_profile', {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(profileData)
                })
                    .then(res => res.json())
                    .then(result => {
                    })
                handleClose(); // Close the modal
            }
        }

    }

    // Update (Modal)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Container style={{ height: "100vh" }}>
                <h5 className='text-center pb-3'>Profile Information</h5>
                <Container className='text-start'>
                    <Form>
                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                name="name"
                                placeholder={`${selectedUser?.name}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder={`${selectedUser?.email}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="phoneNo"
                                name="phoneNo"
                                placeholder={`${selectedUser?.phoneNo}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Role </Form.Label>
                            <Form.Control
                                type="role"
                                name="role"
                                placeholder={`${selectedUser?.role}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>
                    </Form>
                    <div className="text-center">
                        <Button variant="dark" onClick={handleShow}>Update</Button>
                    </div>
                </Container>
            </Container>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Container style={{ "backgroundColor": "white", "color": "#4B4870", "borderRadius": "10px" }}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className='text-center'>Update your information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="name"
                                    name="name"
                                    onBlur={handleOnBlur}
                                    placeholder={`${selectedUser?.name}`}
                                    style={{ width: "50%" }}
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder={`${selectedUser?.email}`}
                                    style={{ width: "50%" }}
                                    disabled />
                            </Form.Group>

                            <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="phoneNo"
                                    name="phoneNo"
                                    onBlur={handleOnBlur}
                                    placeholder={`${selectedUser?.phoneNo}`}
                                    style={{ width: "50%" }}
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                                <Form.Label>Role </Form.Label>
                                <Form.Control
                                    type="role"
                                    name="role"
                                    placeholder={`${selectedUser?.role}`}
                                    style={{ width: "50%" }}
                                    disabled />
                            </Form.Group>
                        </Form>
                        <div className="text-center">
                            <Button variant="dark" onClick={e => {
                                e.preventDefault();
                                handleSubmit(selectedUser?.email, selectedUser?.name, selectedUser?.phoneNo);
                            }}>Submit</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Container>
            </Modal>
        </>
    );
};

export default Profile;