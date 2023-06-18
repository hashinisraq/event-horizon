import React from 'react';
import { Container, Table } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';
import useAuth from '../../../../hooks/useAuth';

const RenterVenue = () => {
    const [users] = useUsers();
    const { user } = useAuth();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];

    return (
        <Container>
            <h5 className='text-center pb-3'>Renters of Venue</h5>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ color: "white", background: "transparent" }}>Name</th>
                        <th style={{ color: "white", background: "transparent" }}>Email</th>
                        <th style={{ color: "white", background: "transparent" }}>Phone</th>
                        <th style={{ color: "white", background: "transparent" }}>Venue</th>
                        <th style={{ color: "white", background: "transparent" }}>Booked</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedUser?.venues.map(venue => <tr className='py-5'
                        key={venue.name}
                    >
                        {venue.booked === true ? <>
                            <td style={{ color: "white", background: "transparent" }}>{venue.bookedTime.customerName}</td>
                            <td style={{ color: "white", background: "transparent" }}>{venue.bookedTime.customerEmail}</td>
                            <td style={{ color: "white", background: "transparent" }}>{venue.bookedTime.customerPhone}</td>
                            <td style={{ color: "white", background: "transparent" }}>{venue.name}</td>
                            <td style={{ color: "white", background: "transparent" }}>
                                {
                                    venue?.bookedTime.Slot.map(sl =>
                                        < div style={{ color: "white", background: "transparent" }} key={sl.startTime}>
                                            <span>Start Time: {sl.startTime}-End Time: {sl.endTime}</span> <br />
                                        </div>
                                    )
                                }
                            </td>
                        </> : <></>
                        }
                    </tr>)}
                </tbody>
            </Table>
        </Container>
    );
};

export default RenterVenue;