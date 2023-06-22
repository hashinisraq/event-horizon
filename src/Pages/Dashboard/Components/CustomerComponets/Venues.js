import React, { useState } from 'react';
import { Button, Col, Container, Form, Pagination, Row, Table } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';
import { Link } from 'react-router-dom';


const Venues = () => {
    const [users] = useUsers();

    let selectedVenues = users?.filter(item => item.role === 'owner').map(item => item.venues)[0];

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const venuesPerPage = 5;


    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const filterVenues = () => {
        if (selectedSize) {
            selectedVenues = selectedVenues.filter(venue => venue.size === selectedSize);
        }

        if (selectedLocation) {
            selectedVenues = selectedVenues.filter(venue => venue.location === selectedLocation);
        }

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
        <Container>
            <h5 className='text-center pb-3'>Venues</h5>
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
                        <Button variant="dark w-50" type="submit" className='mt-4'>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Container>
                {/* search data will be showed  */}
                <Table responsive>
                    <thead>
                        <tr>
                            <th style={{ color: "white", background: "transparent" }}>Name</th>
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
                                        {/* {
                                            venue?.availability.map(vn =>
                                                <div key={vn.startTime}>
                                                    {
                                                        venue?.bookedInfo.length !== 0 ? <>{
                                                            venue?.bookedInfo.map(data => <div key={data.Day}>
                                                                {
                                                                    data?.Slot.map(tm => <div key={tm.startTime}>
                                                                        {
                                                                            tm.startTime !== vn.startTime ? <>
                                                                                <span>Start Time: {vn.startTime} - End Time: {vn.endTime} <br /></span>
                                                                            </> : <>
                                                                            </>
                                                                        }
                                                                    </div>)
                                                                }
                                                            </div>
                                                            )
                                                        }</> : <>
                                                            <span>Start Time: {vn.startTime}-End Time: {vn.endTime} <br />
                                                            </span>
                                                        </>
                                                    }
                                                </div>
                                            )
                                        } */}
                                    </td>
                                    <td className='d-flex justify-content-center align-items-center' style={{ color: "white", background: "transparent" }}>
                                        <Link to={`/venueDetails/${venue.name}`}><Button variant="dark" className='my-2 mx-2'>See Details</Button></Link>
                                        <Link to={`/venueDetails/${venue.name}`}><Button variant="dark" className='my-2 mx-2'>Book Now</Button></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </>
                </Table>

                {/* Pagination */}
                <Row>
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
    );
};

export default Venues;