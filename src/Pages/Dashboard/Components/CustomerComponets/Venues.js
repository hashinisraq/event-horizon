import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Pagination, Row, Table } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';
import { Link } from 'react-router-dom';
import Header from '../../../Shared/Header/Header';
import Footer from '../../../Shared/Footer/Footer';


const Venues = () => {
    const [users] = useUsers();

    let selectedVenues = users
        ?.filter((item) => item.role === 'owner')
        .map((item) => item.venues.filter((venue) => venue.status === 'accepted'))[0];


    const [selectedSize, setSelectedSize] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [selectedAvailability, setSelectedAvailability] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const venuesPerPage = 5;


    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleAvailabilityChange = (event) => {
        setSelectedAvailability(event.target.value);
    };

    const filterVenues = () => {
        if (selectedSize) {
            selectedVenues = selectedVenues.filter(venue => venue.size === selectedSize);
        }

        if (selectedLocation) {
            selectedVenues = selectedVenues.filter(venue => venue.location === selectedLocation);
        }

        if (selectedAvailability) {
            selectedVenues = selectedVenues.filter((venue) => {
                const availability = venue.availability.find(
                    (av) => av.startTime === selectedAvailability
                );
                return availability !== undefined;
            });
        }

        selectedVenues = selectedVenues.filter(venue => venue.status === 'accepted');
        return selectedVenues;
    };

    const handleSearch = (event) => {
        event.preventDefault();

        const filteredVenues = filterVenues();

        // Display the filtered venues or perform any other actions
        setFilteredVenues(filteredVenues);

        setCurrentPage(1);
    };


    // Logic for pagination
    const indexOfLastVenue = currentPage * venuesPerPage;
    const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
    const currentVenues = filteredVenues.slice(indexOfFirstVenue, indexOfLastVenue);

    const paginate = pageNumber => setCurrentPage(pageNumber);





    return (
        <div>
            <Header />

            <Container className='py-5'>
                <h3 className='text-center text-warning pb-3'>Venues</h3>
                <Form onSubmit={handleSearch} className='pb-3'>
                    <Row className='d-flex justify-content-center align-items-center'>
                        <Col md={4}>
                            <Form.Group controlId="sizeFilter">
                                <Form.Label>Size:</Form.Label>
                                <Form.Control as="select" value={selectedSize} onChange={handleSizeChange}>
                                    <option value="">All Sizes</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Big">Big</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="locationFilter">
                                <Form.Label>Location:</Form.Label>
                                <Form.Control as="select" value={selectedLocation} onChange={handleLocationChange}>
                                    <option value="Location A">All Location</option>
                                    {
                                        selectedVenues?.map(venue => <option key={venue.location} value={`${venue.location}`}>{venue.location}</option>)
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="availabilityFilter">
                                <Form.Label>Availability:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedAvailability}
                                    onChange={handleAvailabilityChange}
                                >
                                    <option value="">All Availability</option>
                                    {selectedVenues?.flatMap((venue) =>
                                        venue.availability.map((av) => av.startTime)
                                    ).map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col md={12} className='text-center pb-5'>
                            <Button variant="warning" type="submit" className='mt-4'>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <Container>
                    {/* search data will be showed  */}

                    <Row sm={1} md={2} className="g-4">
                        {currentVenues?.map(vn =>
                            <Col sm={12} md={4} key={vn.name} className='d-flex'>
                                <Card className='h-100'>
                                    <Card.Img src={`${vn.venueImgLink}`} style={{ width: "100%" }} />
                                    <Card.Body>
                                        <Card.Title className='text-center'>{vn.name}</Card.Title>
                                        <Card.Text>
                                            <h6>Location: {vn.location}</h6>
                                            <h6>Amenitiy: {vn.amenities}</h6>
                                            <h6 className='text-success'>Price Per Slot: {vn.venuePrice} BDT</h6>

                                        </Card.Text>
                                        <div className='text-center'>
                                            <Link to={`/venueDetails/${vn.name}`}><Button variant="warning" className='my-2 mx-2'>See Details</Button></Link>
                                            {/* <Button variant='warning'>See Details</Button> */}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>

                    {/* <Table responsive>
                        <thead>
                            <tr>
                                <th style={{ color: "white", background: "transparent" }}>Name</th>
                                <th style={{ color: "white", background: "transparent" }}>Price</th>
                                <th style={{ color: "white", background: "transparent" }}>Location</th>
                                <th style={{ color: "white", background: "transparent" }}>Size</th>
                                <th style={{ color: "white", background: "transparent" }}>Availability</th>
                                <th style={{ color: "white", background: "transparent" }}>Action</th>
                            </tr>
                        </thead>
                        <>
                            <tbody>
                                {currentVenues?.map(venue => (
                                    <tr key={venue.name}>
                                        <td style={{ color: "white", background: "transparent" }}>{venue.name}</td>
                                        <td style={{ color: "white", background: "transparent" }}>{venue.venuePrice} BDT</td>
                                        <td style={{ color: "white", background: "transparent" }}>{venue.location}</td>
                                        <td style={{ color: "white", background: "transparent" }}>{venue.size}</td>
                                        <td style={{ color: "white", background: "transparent" }}>
                                            {
                                                venue?.availability.map(vn =>
                                                    <div key={vn.startTime}>
                                                        <span>Start Time: {vn.startTime} - End Time: {vn.endTime} <br /></span>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td className='d-flex justify-content-center align-items-center' style={{ color: "white", background: "transparent" }}>
                                            <Link to={`/venueDetails/${venue.name}`}><Button variant="dark" className='my-2 mx-2'>See Details</Button></Link>
                                            <Link to={`/venueDetails/${venue.name}`}><Button variant="dark" className='my-2 mx-2'>Book Now</Button></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </>
                    </Table> */}

                    {/* Pagination */}
                    <Row className='pt-5'>
                        <Pagination className='d-flex align-items-center justify-content-center'>
                            {Array.from({ length: Math.ceil(filteredVenues.length / venuesPerPage) }).map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </Row>
                </Container>
            </Container>

            <Footer />
        </div>
    );
};

export default Venues;