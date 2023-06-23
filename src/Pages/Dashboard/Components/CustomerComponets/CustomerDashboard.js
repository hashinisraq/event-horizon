import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import useUsers from '../../../../hooks/useUsers';
import useOrders from '../../../../hooks/useOrders';

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
        <Container style={{ height: "100vh" }}>
            <h5 className='text-center pb-3'>Dashboard</h5>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ color: "white", background: "transparent" }}>Venue Name</th>
                        <th style={{ color: "white", background: "transparent" }}>Day</th>
                        <th style={{ color: "white", background: "transparent" }}>Slot</th>
                        <th style={{ color: "white", background: "transparent" }}>Status</th>
                        <th style={{ color: "white", background: "transparent" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedOrders?.map(order => <tr key={order._id}>
                            <td style={{ color: "white", background: "transparent" }}>{order.venueName}</td>
                            <td style={{ color: "white", background: "transparent" }}>{order.Day}</td>
                            <td style={{ color: "white", background: "transparent" }}>
                                {
                                    order.Slot?.map(tm => <span key={tm.startTime} style={{ color: "white", background: "transparent" }}>
                                        Start Time: {tm.startTime} - End Time: {tm.endTime} <br />
                                    </span>)
                                }
                            </td>
                            <td style={{ color: "white", background: "transparent" }}>{order.status}</td>
                            <td style={{ color: "white", background: "transparent" }}>
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
        </Container>
    );
};

export default CustomerDashboard;