import React from 'react';
import { Container, Table } from 'react-bootstrap';
import useUsers from '../../../hooks/useUsers';
import useAuth from '../../../hooks/useAuth';

const BookedVenues = () => {
    const [users] = useUsers();
    const { user } = useAuth();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];

    return (
        <Container>
            <h5 className='text-center pb-3'>Booked Venues</h5>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ color: "white", background: "transparent" }}>Name</th>
                        <th style={{ color: "white", background: "transparent" }}>Location</th>
                        <th style={{ color: "white", background: "transparent" }}>Capacity</th>
                        <th style={{ color: "white", background: "transparent" }}>Amenities</th>
                        <th style={{ color: "white", background: "transparent" }}>Booked</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedUser?.venues.map(venue => <tr className='py-5'
                        key={venue.name}
                    >
                        <td style={{ color: "white", background: "transparent" }}>{venue.name}</td>
                        <td style={{ color: "white", background: "transparent" }}>{venue.location}</td>
                        <td style={{ color: "white", background: "transparent" }}>{venue.capacity}</td>
                        <td style={{ color: "white", background: "transparent" }}>{venue.amenities}</td>
                        {venue.booked === true ?
                            <td style={{ color: "white", background: "transparent" }}>

                                {
                                    venue?.bookedTime.Slot.map(sl =>
                                        < div style={{ color: "white", background: "transparent" }} key={sl.startTime}>
                                            <span>Start Time: {sl.startTime}-End Time: {sl.endTime}</span> <br />
                                        </div>
                                    )
                                }
                            </td>
                            : <td style={{ color: "white", background: "transparent" }}></td>
                        }
                    </tr>)}
                </tbody>
            </Table>
        </Container >
    );
};

export default BookedVenues;