import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';
import useOrders from '../../../../hooks/useOrders';
import Header from '../../../Shared/Header/Header';
import Footer from '../../../Shared/Footer/Footer';

const CustomerDashboard = () => {
    const { user } = useAuth();
    const [users] = useUsers();
    const [orders] = useOrders();
    const [currentDate, setCurrentDate] = useState(new Date()); // Store current date

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];
    const selectedOrders = orders?.filter(order => order.customerName === selectedUser?.name);

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 1000); // Update current date every second
        return () => clearInterval(timer);
    }, []);

    const isCancelEnabled = (orderDate) => {
        const differenceInDays = Math.floor((orderDate - currentDate) / (1000 * 60 * 60 * 24)); // Calculate the difference in days
        return differenceInDays > 2; // Return true if the difference is greater than 2 days, otherwise false
    };


    const handleCancel = (timeSlot, day) => {
        const status = "cancelled";
        const customer = selectedUser.name;
        const data = { customer, timeSlot, day, status };

        if (window.confirm("Are you sure to cancel booking?")) {
            fetch('https://event-horizon-8f3s.onrender.com/cancel_order', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(result => {
                })
        }
    }


    return (
        <div>
            <Header />
            <Container>
                <Container className='py-5 px-5'>
                    <Row>
                        <Col sm={12} md={6} className='px-5'>
                            <h5 className='text-dark'>{selectedUser?.name}</h5>
                            <p className='text-dark'>Email: {selectedUser?.email} <br />
                                Phone: {selectedUser?.phoneNo} <br />
                                Address: {selectedUser?.address}
                            </p>
                        </Col>
                        <Col sm={12} md={6} className='px-5 text-center'>
                            <img style={{ borderRadius: "50%", width: "100px" }} src={`${selectedUser?.profileImageLink}`} alt="profile pic" srcSet="" />
                        </Col>
                    </Row>
                </Container>
                <h5 className='text-center pb-3'>Booking Status</h5>
                <div className="pb-5">
                    <Table responsive >
                        <thead>
                            <tr>
                                <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Venue Name</th>
                                <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Day</th>
                                <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Slot</th>
                                <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Status</th>
                                <th style={{ color: "dark", background: "transparent", border: "1px solid black" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedOrders?.map(order => <tr key={order._id}>
                                    <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{order.venueName}</td>
                                    <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{order.Day}</td>
                                    <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>
                                        {
                                            order.Slot?.map(tm => <span key={tm.startTime} style={{ color: "dark", background: "transparent" }}>
                                                Start Time: {tm.startTime} - End Time: {tm.endTime} <br />
                                            </span>)
                                        }
                                    </td>
                                    <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>{order.status}</td>
                                    <td style={{ color: "dark", background: "transparent", border: "1px solid black" }}>
                                        {order.status === "cancelled" ? <>
                                            <Button
                                                variant="danger"
                                                className='my-2 mx-2'
                                                disabled
                                            >
                                                Cancel Now
                                            </Button>
                                        </> : <>
                                            <Button
                                                variant="dark"
                                                className='my-2 mx-2'
                                                disabled={!isCancelEnabled(new Date(order.Day))}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    handleCancel(order.Slot, order.Day);
                                                }}
                                            >
                                                Cancel Now
                                            </Button>
                                        </>}
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default CustomerDashboard;