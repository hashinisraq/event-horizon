import React, { useState } from 'react';
import { Button, Container, Table, Pagination } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';
import useAuth from '../../../../hooks/useAuth';
import useOrders from '../../../../hooks/useOrders';

const ITEMS_PER_PAGE = 5;

const Approval = () => {
    const { user } = useAuth();
    const [users] = useUsers();
    const [orders] = useOrders();
    const [currentPage, setCurrentPage] = useState(1);

    const selectedUserVenues = users?.filter(usr => usr.email === user.email)[0]?.venues;

    const matchedElements = selectedUserVenues?.flatMap(obj1 => orders.filter(obj2 => obj2.venueName === obj1.name));

    // Calculate pagination
    const totalPages = Math.ceil((matchedElements?.length || 0) / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = matchedElements?.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container style={{ height: "100vh" }}>
            <h5 className='text-center pb-3'>Approval</h5>
            <Table responsive>
                {/* Table header */}
                <thead>
                    <tr>
                        <th style={{ color: "white", background: "transparent" }}>Name</th>
                        <th style={{ color: "white", background: "transparent" }}>Email</th>
                        <th style={{ color: "white", background: "transparent" }}>Phone</th>
                        <th style={{ color: "white", background: "transparent" }}>Venue</th>
                        <th style={{ color: "white", background: "transparent" }}>Size</th>
                        <th style={{ color: "white", background: "transparent" }}>Day</th>
                        <th style={{ color: "white", background: "transparent" }}>Slot</th>
                        <th style={{ color: "white", background: "transparent" }}>Status</th>
                        <th style={{ color: "white", background: "transparent" }}>Action</th>
                    </tr>
                </thead>
                {/* Table body */}
                <tbody>
                    {currentItems?.map(order => (
                        <tr className='py-5' key={order._id}>
                            <td style={{ color: "white", background: "transparent" }}>{order.customerName}</td>
                            <td style={{ color: "white", background: "transparent" }}>{order.customerEmail}</td>
                            <td style={{ color: "white", background: "transparent" }}>{order.customerPhone}</td>
                            <td style={{ color: "white", background: "transparent" }}>{order.venueName}</td>
                            <td style={{ color: "white", background: "transparent" }}>{order.venueCapacity}</td>
                            <td style={{ color: "white", background: "transparent" }}>{order.Day}</td>
                            <td style={{ color: "white", background: "transparent" }}>
                                Start time: {order?.Slot.startTime} - End time: {order?.Slot.endTime}
                            </td>
                            <td style={{ color: "white", background: "transparent" }}>{order.status}</td>
                            <td style={{ color: "white", background: "transparent" }}>
                                <span className='d-flex align-items-center justify-content-between'>
                                    <Button variant="dark" className='my-1'>Reject</Button>
                                    <span className='mx-1' />
                                    <Button variant="dark" className='my-1'>Accept</Button>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Pagination */}
            {matchedElements && matchedElements.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        />
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        />
                    </Pagination>
                </div>
            )}
        </Container>
    );
};

export default Approval;
