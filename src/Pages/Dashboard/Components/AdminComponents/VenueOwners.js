import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';

const VenueOwners = () => {
    const [users] = useUsers();

    const owners = users.filter(user => user.role === "owner");

    const handleDelete = email => {
        if (window.confirm("Are you sure to delete this owner?")) {
            fetch("https://event-horizon-8f3s.onrender.com/delete_owner_customer", {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
                .then(res => res.json())
                .then(result => {
                })
        }
    }
    return (
        <Container>
            <h5 className='text-center pb-3'>Venue Owners</h5>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ color: "white", background: "transparent" }}>Name</th>
                        <th style={{ color: "white", background: "transparent" }}>Email</th>
                        <th style={{ color: "white", background: "transparent" }}>Phone</th>
                        <th style={{ color: "white", background: "transparent" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {owners?.map(owner => <tr className='py-5'
                        key={owner.name}
                    >
                        <td style={{ color: "white", background: "transparent" }}>{owner.name}</td>
                        <td style={{ color: "white", background: "transparent" }}>{owner.email}</td>
                        <td style={{ color: "white", background: "transparent" }}>{owner.phoneNo}</td>
                        <td style={{ color: "white", background: "transparent" }}>
                            <Button variant="dark" onClick={e => {
                                handleDelete(owner.email);
                                e.preventDefault();
                            }}>Delete</Button>
                        </td>
                    </tr>
                    )
                    }
                </tbody>
            </Table>
        </Container>
    );
};

export default VenueOwners;