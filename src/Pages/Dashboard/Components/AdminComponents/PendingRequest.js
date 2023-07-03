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
        <Container>
            <h5 className='text-center pb-3'>Owner Pending Requests</h5>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Name</th>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Email</th>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Phone</th>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Venue Name</th>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Venue Reg No</th>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Status</th>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Action</th>
                    </tr>
                </thead>
                <>
                    {owners?.map(owner => <tbody className='py-5'
                        key={owner.name}
                    >
                        {owner.venues?.map(vn => <tr key={vn.name}>
                            <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{owner.name}</td>
                            <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{owner.email}</td>
                            <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{owner.phoneNo}</td>
                            <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{vn.name}</td>
                            <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{vn.venueRegNo}</td>
                            <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{vn.status}</td>
                            <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>
                                {vn.status === "pending" ? <> <Button variant="dark" className='mx-2' onClick={e => {
                                    handleAction(vn.name, "accepted");
                                    e.preventDefault();
                                }}>✅</Button>
                                    <span className='mx-1'>|</span>
                                    <Button variant="dark" onClick={e => {
                                        handleAction(vn.name, "rejected");
                                        e.preventDefault();
                                    }}>❌</Button> </> : <>
                                    <Button className='bg-transparent' style={{ border: "none" }} disabled>
                                        🏴󠁧󠁢󠁷󠁬󠁳󠁿
                                    </Button>
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