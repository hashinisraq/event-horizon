import React from 'react';
import Header from '../../../Shared/Header/Header';
import Footer from '../../../Shared/Footer/Footer';
import { useParams } from 'react-router';
import useUsers from '../../../../hooks/useUsers';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const VenueOwnerDetails = () => {
    const venueTitle = useParams();
    const [users] = useUsers();

    const selectedVenues = users
        ?.filter(item => item.role === 'owner')
        .map(item => item.venues.filter(venue => venue.status === 'accepted'))[0];


    const selectedVenue = selectedVenues?.filter(vn => vn.name === venueTitle.venueTitle)[0];

    console.log(selectedVenue?.bookedInfo)

    return (
        <div>
            <Header />
            <Container className='py-5'>
                <h5 className='pb-3' style={{ fontWeight: "bold" }}>{selectedVenue?.name}</h5>
                <div>
                    <Row>
                        <hr />
                        <Col sm={6} className='pb-3'>
                            Location:
                        </Col>
                        <Col sm={6} className='pb-3'>
                            {selectedVenue?.location}
                        </Col>
                        <hr />

                        <Col sm={6} className='pb-3'>
                            Amenity:
                        </Col>
                        <Col sm={6} className='pb-3'>
                            {selectedVenue?.amenities}
                        </Col>
                        <hr />

                        <Col sm={6} className='pb-3'>
                            Active hour:
                        </Col>
                        <Col sm={6} className='pb-3'>
                            {selectedVenue?.availability?.map(tm => <ul key={tm.startTime}>
                                <li>Start Time {tm.startTime} - End Time {tm.endTime}</li>
                            </ul>)}
                        </Col>
                        <hr />

                        <Col sm={12} className='pb-5 text-center'>
                            <Link to="/dashboard"><Button variant='danger'>Delete Venue</Button></Link>
                            <span className='p-2'></span>
                            <Link to="/dashboard"><Button variant='warning'>Update Venue</Button></Link>
                        </Col>
                    </Row>
                </div>

                <div className='py-5'>
                    <h5 className='pb-2' style={{ fontWeight: "bold" }}>Renters</h5>
                    <Table responsive >
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid grey" }}>Name</th>
                                <th style={{ border: "1px solid grey" }}>Email</th>
                                <th style={{ border: "1px solid grey" }}>Phone</th>
                                <th style={{ border: "1px solid grey" }}>Day</th>
                                <th style={{ border: "1px solid grey" }}>Slot</th>
                                <th style={{ border: "1px solid grey" }}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedVenue?.booked === true ?
                                    <>
                                        {
                                            selectedVenue?.bookedInfo?.map(info => <tr key={info.customerName}>
                                                <td style={{ border: "1px solid grey" }}>{info.customerName}</td>
                                                <td style={{ border: "1px solid grey" }}>{info.customerEmail}</td>
                                                <td style={{ border: "1px solid grey" }}>{info.customerPhone}</td>
                                                <td style={{ border: "1px solid grey" }}>{info.Day}</td>
                                                <td style={{ border: "1px solid grey" }}>
                                                    {
                                                        info.Slot?.map(tm => <span key={tm.endTime}>
                                                            Start Time {tm.startTime} - End Time {tm.endTime} <br />
                                                        </span>)
                                                    }
                                                </td>
                                                <td style={{ border: "1px solid grey" }}>{selectedVenue.venuePrice}</td>
                                            </tr>)
                                        }
                                    </>
                                    :
                                    <></>
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>

            <Footer />
        </div>
    );
};

export default VenueOwnerDetails;