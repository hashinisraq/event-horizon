import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';
import Header from '../../../Shared/Header/Header';
import Footer from '../../../Shared/Footer/Footer';

const VeneueDetails = () => {
    const venueTitle = useParams();
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];


    const selectedVenues = users
        ?.filter(item => item.role === 'owner')
        .map(item => item.venues.filter(venue => venue.status === 'accepted'))[0];


    const selectedVenue = selectedVenues?.filter(vn => vn.name === venueTitle.venueTitle)[0];

    const selectedVenueOwner = users?.find(user => user.venues?.includes(selectedVenue));

    const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '';


    const isDateBooked = selectedVenue?.bookedInfo.some(info => info.Day === formattedDate);


    const navigate = useNavigate();

    const handleOnClick = e => {
        const order = {
            venueName: selectedVenue?.name,
            customerName: selectedUser?.name,
            customerEmail: selectedUser?.email,
            customerPhone: selectedUser?.phoneNo,
            Slot: selectedSlots,
            Day: formattedDate,
            status: 'pending',
        };

        if (order.Slot.length > 0 && order.Day !== "") {
            if (window.confirm("Are you sure to place this booking?")) {
                fetch('https://event-horizon-8f3s.onrender.com/orders', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(order)
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.acknowledged === true && result.insertedId !== "") {
                            navigate("/dashboard")
                        }
                    })
                alert('Successfully placed your booking. We will confrim you soon!');
            }
        }
        else {
            alert("Please complete all the fields carefully!");
        }

        e.preventDefault();
    }

    return (
        <div>
            <Header />
            {/* <h5 className='text-center text-white pb-3 pt-5'>Venue Details</h5>
            <div>
                <Container>
                    <Form className='text-white pb-5'>
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
                            <Form.Label>Venue Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="venueName"
                                placeholder={`${selectedVenue?.name}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Price</Form.Label>
                            <Form.Control
                                type="text"
                                name="venuePrice"
                                placeholder={`${selectedVenue?.venuePrice}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Location</Form.Label>
                            <Form.Control
                                type="venueLocation"
                                name="venueLocation"
                                placeholder={`${selectedVenue?.location}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Size</Form.Label>
                            <Form.Control
                                type="venueSize"
                                name="venueSize"
                                placeholder={`${selectedVenue?.size}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Capacity</Form.Label>
                            <Form.Control
                                type="venueCapacity"
                                name="venueCapacity"
                                placeholder={`${selectedVenue?.capacity}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Aminities</Form.Label>
                            <Form.Control
                                type="venueAmenities"
                                name="venueAmenities"
                                placeholder={`${selectedVenue?.amenities}`}
                                style={{ width: "50%" }}
                                disabled />
                        </Form.Group>


                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                style={{ width: "50%" }}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3 d-flex align-items-center justify-content-around">
                            <Form.Label>Venue Availability</Form.Label>
                            {selectedVenue?.booked === false ? (
                                <>
                                    {selectedVenue?.availability.map((slot) => (
                                        <div key={slot.startTime}>
                                            <Form.Check
                                                type="checkbox"
                                                label={`${slot.startTime} - ${slot.endTime}`}
                                                defaultChecked={selectedSlots.some(
                                                    (selectedSlot) =>
                                                        selectedSlot.startTime === slot.startTime &&
                                                        selectedSlot.endTime === slot.endTime
                                                )}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    if (isChecked) {
                                                        setSelectedSlots((prevSelectedSlots) => [
                                                            ...prevSelectedSlots,
                                                            { startTime: slot.startTime, endTime: slot.endTime }
                                                        ]);
                                                    } else {
                                                        setSelectedSlots((prevSelectedSlots) =>
                                                            prevSelectedSlots.filter(
                                                                (selectedSlot) =>
                                                                    selectedSlot.startTime !== slot.startTime ||
                                                                    selectedSlot.endTime !== slot.endTime
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {selectedVenue?.availability.map((slot) => (
                                        <div key={slot.startTime}>
                                            <Form.Check
                                                type="checkbox"
                                                label={`${slot.startTime} - ${slot.endTime}`}
                                                defaultChecked={selectedSlots.some(
                                                    (selectedSlot) =>
                                                        selectedSlot.startTime === slot.startTime &&
                                                        selectedSlot.endTime === slot.endTime
                                                )}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    if (isChecked) {
                                                        setSelectedSlots((prevSelectedSlots) => [
                                                            ...prevSelectedSlots,
                                                            { startTime: slot.startTime, endTime: slot.endTime }
                                                        ]);
                                                    } else {
                                                        setSelectedSlots((prevSelectedSlots) =>
                                                            prevSelectedSlots.filter(
                                                                (selectedSlot) =>
                                                                    selectedSlot.startTime !== slot.startTime ||
                                                                    selectedSlot.endTime !== slot.endTime
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                        </Form.Group>

                        <div className="text-center my-4">
                            {selectedVenue?.availability.length > 0 && (
                                <Button
                                    variant="dark"
                                    className="w-50"
                                    disabled={!selectedDate || isDateBooked}
                                    onClick={handleOnClick}
                                >
                                    {isDateBooked ? 'This date is booked' : 'Place Booking'}
                                </Button>
                            )}

                        </div>
                        <div className="text-center">
                            <Link to="/dashboard"><Button variant='primary'>Go to Dashboard</Button></Link>
                        </div>
                    </Form>
                </Container>
            </div> */}

            <div
                style={{
                    backgroundImage: `url(${selectedUser?.profileImageLink})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
                className='py-5'
            >
                <Container className='text-white'>
                    <h4>{selectedVenue?.name}</h4>
                    <p>Email: {selectedVenueOwner?.email} <br />
                        Phone: {selectedVenueOwner?.phoneNo}</p>
                </Container>
            </div>
            <div>
                <Container>
                    <Row>
                        <Col sm={6} className='d-flex align-items-center justify-content-center'>
                            <div>
                                <h5 className="text-warning pt-4">{selectedVenue?.name}</h5>
                                <h6 className="text-dark pt-3">
                                    <img className='pb-1' width="14px" src="https://i.ibb.co/w4cRFqk/location.png" alt="location" srcset="" /> {selectedVenue?.location}
                                </h6>
                                <h6 className="text-dark pt-3">
                                    🏠 Amenity: <br />
                                    <span className='ps-5'> {selectedVenue?.amenities}</span>
                                </h6>
                                <h6 className="text-dark pt-3">
                                    🎰 Available Slot: {selectedVenue?.availability.length}
                                </h6>
                                <h6 className="text-dark pt-3">
                                    💸 Price: {selectedVenue?.venuePrice} BDT
                                </h6>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <img src={`${selectedVenue?.venueImgLink}`} alt="venue logo" srcset="" />
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="text-center text-dark py-5">
                <Container className="py-5">
                    <Form>
                        <Form.Group className="mb-3 d-flex align-items-center justify-content-between">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                style={{ width: "50%" }}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3 d-flex align-items-center justify-content-between">
                            <Form.Label>Venue Availability</Form.Label>
                            {selectedVenue?.booked === false ? (
                                <>
                                    {selectedVenue?.availability.map((slot) => (
                                        <div key={slot.startTime}>
                                            <Form.Check
                                                type="checkbox"
                                                label={`${slot.startTime} - ${slot.endTime}`}
                                                defaultChecked={selectedSlots.some(
                                                    (selectedSlot) =>
                                                        selectedSlot.startTime === slot.startTime &&
                                                        selectedSlot.endTime === slot.endTime
                                                )}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    if (isChecked) {
                                                        setSelectedSlots((prevSelectedSlots) => [
                                                            ...prevSelectedSlots,
                                                            { startTime: slot.startTime, endTime: slot.endTime }
                                                        ]);
                                                    } else {
                                                        setSelectedSlots((prevSelectedSlots) =>
                                                            prevSelectedSlots.filter(
                                                                (selectedSlot) =>
                                                                    selectedSlot.startTime !== slot.startTime ||
                                                                    selectedSlot.endTime !== slot.endTime
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {selectedVenue?.availability.map((slot) => (
                                        <div key={slot.startTime}>
                                            <Form.Check
                                                type="checkbox"
                                                label={`${slot.startTime} - ${slot.endTime}`}
                                                defaultChecked={selectedSlots.some(
                                                    (selectedSlot) =>
                                                        selectedSlot.startTime === slot.startTime &&
                                                        selectedSlot.endTime === slot.endTime
                                                )}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    if (isChecked) {
                                                        setSelectedSlots((prevSelectedSlots) => [
                                                            ...prevSelectedSlots,
                                                            { startTime: slot.startTime, endTime: slot.endTime }
                                                        ]);
                                                    } else {
                                                        setSelectedSlots((prevSelectedSlots) =>
                                                            prevSelectedSlots.filter(
                                                                (selectedSlot) =>
                                                                    selectedSlot.startTime !== slot.startTime ||
                                                                    selectedSlot.endTime !== slot.endTime
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                        </Form.Group>

                        <div className="text-center my-4">
                            {selectedVenue?.availability.length > 0 && (
                                <Button
                                    variant="warning"
                                    disabled={!selectedDate || isDateBooked}
                                    onClick={handleOnClick}
                                >
                                    {isDateBooked ? 'This date is booked' : 'Place Booking'}
                                </Button>
                            )}
                        </div>
                    </Form>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default VeneueDetails;