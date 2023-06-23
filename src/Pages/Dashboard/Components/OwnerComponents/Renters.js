import React from 'react';
import { Container, Table } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';
import useAuth from '../../../../hooks/useAuth';

const Renters = () => {
    const [users] = useUsers();
    const { user } = useAuth();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];

    return (
        <Container style={{ height: "100vh" }}>
            <h5 className='text-center pb-3'>Renters of Venue</h5>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ color: "white", background: "transparent" }}>Name</th>
                        <th style={{ color: "white", background: "transparent" }}>Email</th>
                        <th style={{ color: "white", background: "transparent" }}>Phone</th>
                        <th style={{ color: "white", background: "transparent" }}>Venue</th>
                        <th style={{ color: "white", background: "transparent" }}>Day</th>
                        <th style={{ color: "white", background: "transparent" }}>Booked</th>
                    </tr>
                </thead>
                <>
                    {selectedUser?.venues.map(venue => <tbody style={{ color: "white", background: "transparent" }} className='py-5'
                        key={venue.name}
                    >
                        {venue.booked === true ? <>
                            {
                                venue?.bookedInfo.map(info => <tr key={info.customerEmail}>
                                    <td style={{ color: "white", background: "transparent" }}>{info.customerName}</td>
                                    <td style={{ color: "white", background: "transparent" }}>{info.customerEmail}</td>
                                    <td style={{ color: "white", background: "transparent" }}>{info.customerPhone}</td>
                                    <td style={{ color: "white", background: "transparent" }}>{venue.name}</td>
                                    <td style={{ color: "white", background: "transparent" }}>{info.Day}</td>
                                    <td style={{ color: "white", background: "transparent" }}>
                                        {
                                            info?.Slot !== undefined ? <>
                                                {
                                                    info?.Slot.map(time => <div style={{ color: "white", background: "transparent" }}
                                                        key={time.startTime}>
                                                        <span>Start Time: {time.startTime}-End Time: {time.endTime}</span> <br />
                                                    </div>)
                                                }
                                            </> : <></>
                                        }
                                    </td>
                                </tr>)
                            }
                        </> : <></>
                        }
                    </tbody>)}
                </>
            </Table>
        </Container>
    );
};

export default Renters;