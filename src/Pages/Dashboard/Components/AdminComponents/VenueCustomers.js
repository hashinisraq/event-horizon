import React, { useState } from 'react';
import { Button, Container, Pagination, Table } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';

const VenueCustomers = () => {
    const [users] = useUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 5;

    const customers = users.filter(user => user.role === "customer");

    const handleDelete = email => {
        if (window.confirm("Are you sure to delete this customer?")) {
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
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <Container style={{ height: "100vh" }}>
            <h5 className='text-center pb-3'>Venue Customers</h5>
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
                    {currentCustomers?.map(customer => <tr className='py-5'
                        key={customer.name}
                    >
                        <td style={{ color: "white", background: "transparent" }}>{customer.name}</td>
                        <td style={{ color: "white", background: "transparent" }}>{customer.email}</td>
                        <td style={{ color: "white", background: "transparent" }}>{customer.phoneNo}</td>
                        <td style={{ color: "white", background: "transparent" }}>
                            <Button variant="dark" onClick={e => {
                                handleDelete(customer.email);
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
                {Array.from({ length: Math.ceil(customers.length / customersPerPage) }).map((_, index) => (
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

export default VenueCustomers;