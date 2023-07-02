import React from 'react';
import { Container, Table } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';
import useAuth from '../../../../hooks/useAuth';

const BookedVenues = () => {
    const [users] = useUsers();
    const { user } = useAuth();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];

    return (
        <Container style={{ height: "100vh" }}>
            <h5 className='text-center text-dark pb-3'>Currently  Booked Venues</h5>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid grey" }}>Name</th>
                        <th style={{ border: "1px solid grey" }}>Location</th>
                        <th style={{ border: "1px solid grey" }}>Capacity</th>
                        <th style={{ border: "1px solid grey" }}>Size</th>
                        <th style={{ border: "1px solid grey" }}>Amenities</th>
                        <th style={{ border: "1px solid grey" }}>Day</th>
                        <th style={{ border: "1px solid grey" }}>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedUser?.venues.map(venue => <tr className='py-5'
                        key={venue.name}
                    >
                        {venue.status === "accepted" ?
                            <>
                                {venue.booked === true && <>
                                    <td style={{ border: "1px solid grey" }}>{venue.name}</td>
                                    <td style={{ border: "1px solid grey" }}>{venue.location}</td>
                                    <td style={{ border: "1px solid grey" }}>{venue.capacity}</td>
                                    <td style={{ border: "1px solid grey" }}>{venue.size}</td>
                                    <td style={{ border: "1px solid grey" }}>{venue.amenities}</td>
                                    <td style={{ border: "1px solid grey" }}>
                                        {
                                            venue?.bookedInfo.map(data => <div key={data.Day}>
                                                {data.Day}
                                            </div>
                                            )
                                        }
                                    </td>
                                    <td style={{ border: "1px solid grey" }}>
                                        {
                                            venue?.bookedInfo.map(data => <div key={data.Day}>
                                                {
                                                    data?.Slot.map(sl =>
                                                        < div key={sl.startTime}>
                                                            <span>Start Time: {sl.startTime}-End Time: {sl.endTime}</span> <br />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            )
                                        }
                                    </td>
                                </>
                                }
                            </> : <></>}

                    </tr>
                    )}
                </tbody>
            </Table>
        </Container >
    );
};

export default BookedVenues;