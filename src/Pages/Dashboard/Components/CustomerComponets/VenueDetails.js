import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';
import Header from '../../../Shared/Header/Header';
import Footer from '../../../Shared/Footer/Footer';

const VenueDetails = () => {
    const venueTitle = useParams();
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];

    let selectedVenues = users
        ?.filter((item) => item.role === 'owner')
        .flatMap((item) => item.venues.filter((venue) => venue.status === 'accepted'));


    const selectedVenue = selectedVenues?.filter(vn => vn.name === venueTitle.venueTitle)[0];

    const selectedVenueOwner = users?.find(user => user.venues?.includes(selectedVenue));

    const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

    const isDateBooked = selectedVenue?.bookedInfo.some(info => info.Day === formattedDate);


    const handleOnClick = e => {
        const paymentPrice = selectedSlots?.length * parseInt(selectedVenue?.venuePrice);
        const info = {
            product_name: selectedVenue?.name,
            product_profile: selectedVenue?.amenities,
            product_image: selectedVenue?.venueImgLink,
            total_amount: paymentPrice,
            cus_name: selectedUser?.name,
            cus_email: selectedUser?.email,
            order: {
                venueName: selectedVenue?.name,
                customerName: selectedUser?.name,
                customerEmail: selectedUser?.email,
                customerPhone: selectedUser?.phoneNo,
                Slot: selectedSlots,
                Day: formattedDate,
                status: 'pending',
            }
        }

        if (selectedSlots?.length > 0 && formattedDate !== "") {
            if (window.confirm("Are you sure to place this booking?")) {
                // fetch('http://localhost:5000/init', {
                fetch('https://event-horizon-8f3s.onrender.com/init', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(info)
                })
                    .then(res => res.json())
                    .then(data => {
                        window.location.replace(data)
                    })
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

            <div
                style={{
                    backgroundImage: 'linear-gradient(to right, #000000, #ffffff)'
                }}
                className='py-5'
            >
                <Container className='text-white'>
                    <Row>
                        <Col sm={12} md={6} className='text-start px-5'>
                            <h4>{selectedVenue?.name}</h4>
                            <p>Email: {selectedVenueOwner?.email} <br />
                                Phone: {selectedVenueOwner?.phoneNo}<br />
                                Address: {selectedVenueOwner?.address}</p>
                        </Col>
                        <Col sm={12} md={6} className='px-5 text-center'>
                            <img style={{ borderRadius: "50%", width: "100px" }} src={`${selectedVenueOwner?.profileImageLink}`} alt="profile pic" srcSet="" />
                        </Col>
                    </Row>
                </Container>
            </div>

            <div>
                <Container>
                    <Row>
                        <Col sm={6} className='d-flex align-items-center justify-content-center'>
                            <div>
                                <h5 className="text-warning pt-4">{selectedVenue?.name}</h5>
                                <h6 className="text-dark pt-3">
                                    <img className='pb-1' width="14px" src="https://i.ibb.co/w4cRFqk/location.png" alt="location" srcSet="" /> {selectedVenue?.location}
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
                            <img src={`${selectedVenue?.venueImgLink}`} width="100%" alt="venue logo" srcSet="" />
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

export default VenueDetails;