import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';


const Venues = () => {
    const [users] = useUsers();

    let selectedVenues = users?.filter(item => item.role === 'owner').map(item => item.venues)[0];
    // let allLocation = { name: "All Location" };
    // selectedVenues = [allLocation, selectedVenues];
    // console.log(selectedVenues)

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const filterVenues = () => {
        let filteredVenues = [
            { id: 1, name: 'Venue 1', size: 'small', location: 'Location A', available: true },
            { id: 2, name: 'Venue 2', size: 'medium', location: 'Location B', available: false },
            { id: 3, name: 'Venue 3', size: 'large', location: 'Location A', available: true },
            // Add more venue data here
        ];

        if (selectedSize) {
            filteredVenues = filteredVenues.filter((venue) => venue.size === selectedSize);
        }

        if (selectedLocation) {
            filteredVenues = filteredVenues.filter((venue) => venue.location === selectedLocation);
        }

        return filteredVenues;
    };

    const handleSearch = (event) => {
        event.preventDefault();

        const filteredVenues = filterVenues();

        // Display the filtered venues or perform any other actions
        console.log(filteredVenues);
    };
    return (
        <Container>
            <h5 className='text-center pb-3'>Venues</h5>
            <Form onSubmit={handleSearch}>
                <Row className='d-flex justify-content-center align-items-center'>
                    <Col md={4}>
                        <Form.Group controlId="sizeFilter">
                            <Form.Label>Size:</Form.Label>
                            <Form.Control as="select" value={selectedSize} onChange={handleSizeChange}>
                                <option value="">All Sizes</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="locationFilter">
                            <Form.Label>Location:</Form.Label>
                            <Form.Control as="select" value={selectedLocation} onChange={handleLocationChange}>
                                <option value="Location A">All Location</option>
                                {
                                    selectedVenues?.map(venue => <option key={venue.name} value={`${venue.name}`}>{venue.name}</option>)
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
        </Container>
    );
};

export default Venues;