import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';

const PendingRequest = () => {
    const [users] = useUsers();

    const owners = users.filter(user => user.role === "owner");

    const handleAction = (venueName, action) => {
        if (window.confirm("Are you sure to do this action?")) {
            fetch('https://event-horizon-8f3s.onrender.com/venue_action', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ venueName, action })
            })
                .then(res => res.json())
                .then(result => {
                })
        }
    }

    return (
        <Container style={{ height: "100vh" }}>
            <h5 className='text-center pb-3'>Owner Pending Requests</h5>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ color: "white", background: "transparent" }}>Name</th>
                        <th style={{ color: "white", background: "transparent" }}>Email</th>
                        <th style={{ color: "white", background: "transparent" }}>Phone</th>
                        <th style={{ color: "white", background: "transparent" }}>Venue Name</th>
                        <th style={{ color: "white", background: "transparent" }}>Venue Reg No</th>
                        <th style={{ color: "white", background: "transparent" }}>Status</th>
                        <th style={{ color: "white", background: "transparent" }}>Action</th>
                    </tr>
                </thead>
                <>
                    {owners?.map(owner => <tbody className='py-5'
                        key={owner.name}
                    >
                        {owner.venues?.map(vn => <tr key={vn.name}>
                            <td style={{ color: "white", background: "transparent" }}>{owner.name}</td>
                            <td style={{ color: "white", background: "transparent" }}>{owner.email}</td>
                            <td style={{ color: "white", background: "transparent" }}>{owner.phoneNo}</td>
                            <td style={{ color: "white", background: "transparent" }}>{vn.name}</td>
                            <td style={{ color: "white", background: "transparent" }}>{vn.venueRegNo}</td>
                            <td style={{ color: "white", background: "transparent" }}>{vn.status}</td>
                            <td style={{ color: "white", background: "transparent" }}>
                                {vn.status === "pending" ? <> <Button variant="dark" className='mx-2' onClick={e => {
                                    handleAction(vn.name, "accepted");
                                    e.preventDefault();
                                }}>Accept</Button>
                                    <Button variant="dark" onClick={e => {
                                        handleAction(vn.name, "rejected");
                                        e.preventDefault();
                                    }}>Reject</Button> </> : <>
                                    <Button variant="danger" className='mx-2' disabled >Accept</Button>
                                    <Button variant="danger" disabled >Reject</Button>
                                </>}
                            </td>
                        </tr>)}
                    </tbody>
                    )
                    }
                </>
            </Table>
        </Container>
    );
};

export default PendingRequest;