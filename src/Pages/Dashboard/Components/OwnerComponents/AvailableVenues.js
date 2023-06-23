import React from 'react';
import { Container, Table } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';
import useAuth from '../../../../hooks/useAuth';

const AvailableVenues = () => {
    const [users] = useUsers();
    const { user } = useAuth();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];

    return (
        <Container style={{ height: "100vh" }}>
            <h5 className='text-center pb-3'>Available Venues</h5>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ color: "white", background: "transparent" }}>Name</th>
                        <th style={{ color: "white", background: "transparent" }}>Location</th>
                        <th style={{ color: "white", background: "transparent" }}>Capacity</th>
                        <th style={{ color: "white", background: "transparent" }}>Size</th>
                        <th style={{ color: "white", background: "transparent" }}>Amenities</th>
                        <th style={{ color: "white", background: "transparent" }}>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedUser?.venues.map(venue => <tr className='py-5'
                        key={venue.name}
                    >
                        {venue.status === "accepted" ?
                            <>
                                <td style={{ color: "white", background: "transparent" }}>{venue.name}</td>
                                <td style={{ color: "white", background: "transparent" }}>{venue.location}</td>
                                <td style={{ color: "white", background: "transparent" }}>{venue.capacity}</td>
                                <td style={{ color: "white", background: "transparent" }}>{venue.size}</td>
                                <td style={{ color: "white", background: "transparent" }}>{venue.amenities}</td>
                                <td style={{ color: "white", background: "transparent" }}>
                                    {
                                        venue?.availability.map(vn =>
                                            <div key={vn.startTime}>
                                                <span>Start Time: {vn.startTime}-End Time: {vn.endTime}</span>
                                                <br />
                                            </div>
                                        )
                                    }
                                </td>
                            </> : <></>}
                    </tr>
                    )
                    }
                </tbody>
            </Table>
        </Container >
    );
};

export default AvailableVenues;