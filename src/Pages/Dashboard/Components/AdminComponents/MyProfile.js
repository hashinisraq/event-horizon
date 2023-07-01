import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';
import { Col, Container, Row } from 'react-bootstrap';
import useOrders from '../../../../hooks/useOrders';

const MyProfile = () => {
    const { user } = useAuth();
    const [users] = useUsers();
    const [orders] = useOrders();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];

    const selectedVenues = users
        ?.filter(item => item.role === 'owner')
        .map(item => item.venues.filter(venue => venue.status === 'accepted'))[0];

    const bookedVenues = selectedVenues?.filter(vn => vn.booked === true);

    const totalRenters = orders?.filter(order => order.status === "accepted");


    return (
        <div style={{ height: "100vh" }}>
            <Container className='py-5 px-5'>
                <Row>
                    <Col sm={12} md={6} className='px-5 text-start'>
                        <h5 className='text-dark'>{selectedUser?.name}</h5>
                        <p className='text-dark'>Email: {selectedUser?.email} <br />
                            Phone: {selectedUser?.phoneNo} <br />
                            Address: {selectedUser?.address}
                        </p>
                    </Col>
                    <Col sm={12} md={6} className='px-5 text-center'>
                        <img style={{ borderRadius: "50%", width: "100px" }} src={`${selectedUser?.profileImageLink}`} alt="profile pic" srcSet="" />
                    </Col>
                </Row>

                <div className="text-start py-5">
                    <h6 className='text-dark'>Current Activity:</h6>
                    <p className='text-dark'>Total Renter: {totalRenters?.length} <br />
                        Total Booked Venue: {bookedVenues?.length}<br />
                        Total Venue: {selectedVenues?.length}
                    </p>
                </div>

            </Container>
        </div>
    );
};

export default MyProfile;