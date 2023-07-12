import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';
import { Link } from 'react-router-dom';

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

    const setEmail = email => {
        const field = "emailAddress"
        const value = email;
        const newprofileData = { ...profileData };
        newprofileData[field] = value;
        setprofileData(newprofileData);
    }

    const handleSubmit = (email, g_name, phone, g_address) => {
        const field = "emailAddress"
        const value = email;
        const newprofileData = { ...profileData };
        newprofileData[field] = value;
        setprofileData(newprofileData);


        if (email === "" && g_name === "" && phone === "" && g_address === "" || profileData === {}) {
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
                setprofileData({});
            }
        }

    }

    // Update (Modal)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <div>
                <div
                    style={{
                        backgroundImage: 'linear-gradient(to right, #000000, #ffffff)'
                    }}
                    className='py-5'
                >
                    <Row>
                        <Col sm={12} md={6} className='text-start px-5'>
                            <h5 className='text-white'>{selectedUser?.name}</h5>
                            <p className='text-white'>Email: {selectedUser?.email} <br />
                                Phone: {selectedUser?.phoneNo} <br />
                                Address: {selectedUser?.address}
                            </p>
                        </Col>
                        <Col sm={12} md={6} className='px-5 text-center'>
                            <img style={{ borderRadius: "50%", width: "100px" }} src={`${selectedUser?.profileImageLink}`} alt="profile pic" srcSet="" />
                        </Col>
                    </Row>
                    <div className="text-center">
                        <Button variant="warning" onClick={e => {
                            handleShow();
                            setEmail(selectedUser?.email);
                        }}>Update Profile</Button>
                    </div>
                </div>

                <div className='p-3'>
                    <Row className='my-2'>
                        {selectedUser?.venues.map(venue => <Col sm={12} md={4} lg={4}
                            key={venue.name}
                        >
                            <div className='p-3 text-start' style={{ border: "1px solid grey", borderRadius: "12px" }}>
                                <h6 className='text-warning py-2'>{venue?.name}</h6>
                                <Container className='text-dark'>
                                    <p><img className='pb-1' width="14px" src="https://i.ibb.co/w4cRFqk/location.png" alt="location" srcSet="" /> {venue?.location}</p>
                                    <p>🏠 Amenity: <br />
                                        <span className='ps-5'>
                                            {venue?.amenities}
                                        </span>
                                    </p>
                                    <p>📔 Number of Bookings: {venue?.bookedInfo.length} </p>
                                    <p>🎰 Available Slots: {venue?.availability.length}</p>
                                    <p className="text-success">💸 Price: {venue?.venuePrice} BDT</p>
                                </Container>
                                <div className="text-center">
                                    <Link to={`/venueOwnerDetails/${venue.name}`}><Button variant="warning" className='my-2 mx-2'>See Details</Button></Link>
                                </div>
                            </div>
                        </Col>
                        )}
                    </Row>
                </div>
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Container style={{ "backgroundColor": "dark", "color": "#4B4870", "borderRadius": "10px" }}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" className='text-center'>Update your information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                                <Form.Label className="text-dark">Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    onBlur={handleOnBlur}
                                    placeholder={`${selectedUser?.name}`}
                                    style={{ width: "50%" }}
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                                <Form.Label className="text-dark">Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    placeholder={`${selectedUser?.email}`}
                                    style={{ width: "50%" }}
                                    disabled />
                            </Form.Group>

                            <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                                <Form.Label className="text-dark">Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNo"
                                    onBlur={handleOnBlur}
                                    placeholder={`${selectedUser?.phoneNo}`}
                                    style={{ width: "50%" }}
                                    required />
                            </Form.Group>

                            <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                                <Form.Label className="text-dark">Role </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="role"
                                    placeholder={`${selectedUser?.role}`}
                                    style={{ width: "50%" }}
                                    disabled />
                            </Form.Group>


                            <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                                <Form.Label className="text-dark">Address </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    onBlur={handleOnBlur}
                                    placeholder={`${selectedUser?.address}`}
                                    style={{ width: "50%" }}
                                    required />
                            </Form.Group>

                        </Form>
                        <div className="text-center">
                            <Button variant="warning" onClick={e => {
                                e.preventDefault();
                                handleSubmit(selectedUser?.email, selectedUser?.name, selectedUser?.phoneNo, selectedUser?.address);
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