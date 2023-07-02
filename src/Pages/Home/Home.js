import React, { useState } from 'react';
import { Accordion, Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import useUsers from '../../hooks/useUsers';

const Home = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const [users] = useUsers();
    let selectedVenues = users
        ?.filter((item) => item.role === 'owner')
        .map((item) => item.venues.filter((venue) => venue.status === 'accepted'))[0];


    const [showAllVenues, setShowAllVenues] = useState(false);
    const navigate = useNavigate();

    const handleShowMore = () => {
        setShowAllVenues(true);
        navigate('/venues');
    };

    return (
        <div>
            <Header />

            {/* top part */}
            <div>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/8Y9MFb6/venue.jpg"
                            alt="First slide"
                            style={{ height: "550px" }}
                        />
                        <Carousel.Caption className="carousel-caption">
                            <h3>Find Your Perfect <br />
                                Venue for Memorable <br />
                                Events.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/x2XQXCS/venue3.jpg"
                            alt="Second slide"
                            style={{ height: "550px" }}
                        />

                        <Carousel.Caption className="carousel-caption">
                            <h3>Make Your Every <br />
                                Moments Memorable.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.ibb.co/JR3KYxw/venue6.jpg"
                            alt="Third slide"
                            style={{ height: "550px" }}
                        />

                        <Carousel.Caption className="carousel-caption">
                            <h3>Creating Memories! 🙋<br />
                                One Event at a Time 😇</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* our venues part */}
            <div className='py-5'>
                <h3 style={{ fontWeight: "bold" }} className="text-warning text-center">Our Venues</h3>

                <Container>
                    <Row>
                        {selectedVenues?.slice(0, 3).map((venue, index) => (
                            <Col key={index} sm={12} md={4} lg={4} className='py-3'>
                                <Link to={`/venueDetails/${venue.name}`}>
                                    <div
                                        style={{
                                            backgroundImage: `url(${venue.venueImgLink})`,
                                            height: '400px',
                                            borderRadius: '10px',
                                            position: 'relative',
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                bottom: '0',
                                                left: '0',
                                                padding: '10px',
                                                background: 'rgba(0, 0, 0, 0.7)',
                                                color: 'white',
                                                borderRadius: '0 0 10px 10px',
                                            }}
                                        >
                                            <h4>{venue.name}</h4>
                                            <p> {venue.location}</p>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                    {!showAllVenues && (
                        <Row className="mt-3">
                            <Col className="text-center">
                                <Button variant="dark" onClick={handleShowMore}>Show More</Button>
                            </Col>
                        </Row>
                    )}
                    {showAllVenues && (
                        <Row>
                            {selectedVenues?.slice(3).map((venue, index) => (
                                <Col key={index} sm={12} md={4} lg={4} className='py-3'>
                                    <Button>
                                        <div
                                            style={{
                                                backgroundImage: `url(${venue.venueImgLink})`,
                                                height: '400px',
                                                borderRadius: '10px',
                                                position: 'relative',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '0',
                                                    left: '0',
                                                    padding: '10px',
                                                    background: 'rgba(0, 0, 0, 0.7)',
                                                    color: 'white',
                                                    borderRadius: '0 0 10px 10px',
                                                }}
                                            >
                                                <h4>{venue.name}</h4>
                                                <p> {venue.location}</p>
                                            </div>
                                        </div>
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            </div>

            {/* why event horizon part */}
            <div className='py-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='w-50 d-flex justify-content-center align-items-center'>
                        <div className='px-5'>
                            <h3 className="text-warning" style={{ fontWeight: "bold" }}>Why Event Horizon?</h3>
                            <p>Event Horizon provides an extensive database of diverse event venues for any occasion. With a user-friendly
                                interface, you can effortlessly browse, check availability, and book venues in just a few clicks.
                                Say goodbye to tedious emails and paperwork - <b>Event Horizon simplifies the booking process.</b></p>
                        </div>
                    </div>
                    <div style={{ padding: "15% 0" }} className='bg-warning w-50 d-flex justify-content-center align-items-center'>
                        <img src="https://i.ibb.co/bKw44rm/logo2.png" width="50%" alt="logo" />
                    </div>
                </div>
            </div>

            {/* our partners */}
            <div className='py-5'>
                <h3 style={{ fontWeight: "bold" }} className="text-warning text-center">Our Partners</h3>
                <div className='d-flex justify-content-center align-items-center'>
                    <div>
                        <img src="https://i.ibb.co/93zFJF5/Bkash.png" alt="bkash" className='p-2' width="120px" srcSet="" />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/k00q02z/nagad.png" alt="nagad" className='p-2' width="120px" srcSet="" />
                    </div>
                    <div>
                        <img src="https://i.ibb.co/PTtf5QG/rocket.png" alt="rocket" className='p-2' width="120px" srcSet="" />
                    </div>
                </div>
            </div>


            {/* FAQ part*/}
            <div className="py-5">
                <h3 style={{ fontWeight: "bold" }} className="text-warning text-center">FAQs</h3>
                <Container>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Is there an option to reshedule an event if needed?</Accordion.Header>
                            <Accordion.Body>
                                No.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>How do I make payment for the venue booking?</Accordion.Header>
                            <Accordion.Body>
                                By using bKash/nagad/rocket.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Can I visit the venue before making a booking?</Accordion.Header>
                            <Accordion.Body>
                                Yeah, you can.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>What is the maximum capacity of each venue?</Accordion.Header>
                            <Accordion.Body>
                                300 persons.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
