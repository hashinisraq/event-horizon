import React, { useState } from 'react';
import { Button, Container, Pagination, Table } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';

const VenueOwners = () => {
    const [users] = useUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 5;

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

    // Logic for pagination
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentOwners = owners.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Container style={{ height: "100vh" }}>
            <h5 className='text-center pb-3'>Owners</h5>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Name</th>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Email</th>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Phone</th>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Venue Name-Reg. ID</th>
                        <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOwners?.map(owner => <tr className='py-5'
                        key={owner.name}
                    >
                        <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{owner.name}</td>
                        <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{owner.email}</td>
                        <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{owner.phoneNo}</td>
                        <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>
                            {
                                owner.venues?.map(vn => <div className='p-0 m-0' key={vn.venueRegNo}>
                                    {
                                        vn.status === "accepted" ? <>
                                            {vn.name}-{vn.venueRegNo} <br />
                                        </>
                                            :
                                            <></>
                                    }
                                </div>)
                            }
                        </td>
                        <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>
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

            {/* Pagination */}
            <Pagination className='d-flex align-items-center justify-content-center'>
                {Array.from({ length: Math.ceil(owners.length / customersPerPage) }).map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

        </Container>
    );
};

export default VenueOwners;