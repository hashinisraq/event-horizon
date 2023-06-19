import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import useUsers from '../../../../hooks/useUsers';
import useAuth from '../../../../hooks/useAuth';

const Orders = [
    {
        _id: 0,
        customerName: "Hashin Israq",
        customerEmail: "hashinisraq@gmail.com",
        customerPhone: "01797656938",
        venueName: "HY",
        venueLocation: "Thakurgaon",
        venueCapacity: "6",
        Slot: {
            startTime: "10:20",
            endTime: "12:15"
        },
        Day: "18 July 2023",
        status: "pending"
    },
    {
        _id: 1,
        customerName: "Hashin Israq",
        customerEmail: "hashinisraq@gmail.com",
        customerPhone: "01797656938",
        venueName: "HY",
        venueLocation: "Thakurgaon",
        venueCapacity: "6",
        Slot: {
            startTime: "10:20",
            endTime: "12:15"
        },
        Day: "18 July 2023",
        status: "pending"
    }
]

const Approval = () => {
    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUserVenues = users?.filter(usr => usr.email === user.email)[0]?.venues;

    // const matchedElements = selectedUserVenues?.filter(obj1 => Orders.find(obj2 => obj2.venueName === obj1.name));
    const matchedElements = selectedUserVenues?.flatMap(obj1 => Orders.filter(obj2 => obj2.venueName === obj1.name));
    // console.log(matchedElements)

    return (
        <Container>
            <h5 className='text-center pb-3'>Approval</h5>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ color: "white", background: "transparent" }}>Name</th>
                        <th style={{ color: "white", background: "transparent" }}>Email</th>
                        <th style={{ color: "white", background: "transparent" }}>Phone</th>
                        <th style={{ color: "white", background: "transparent" }}>Venue Name</th>
                        <th style={{ color: "white", background: "transparent" }}>Capacity</th>
                        <th style={{ color: "white", background: "transparent" }}>Day</th>
                        <th style={{ color: "white", background: "transparent" }}>Slot</th>
                        <th style={{ color: "white", background: "transparent" }}>Status</th>
                        <th style={{ color: "white", background: "transparent" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {matchedElements?.map(order => <tr className='py-5'
                        key={order._id}
                    >
                        <td style={{ color: "white", background: "transparent" }}>{order.customerName}</td>
                        <td style={{ color: "white", background: "transparent" }}>{order.customerEmail}</td>
                        <td style={{ color: "white", background: "transparent" }}>{order.customerPhone}</td>
                        <td style={{ color: "white", background: "transparent" }}>{order.venueName}</td>
                        <td style={{ color: "white", background: "transparent" }}>{order.venueCapacity}</td>
                        <td style={{ color: "white", background: "transparent" }}>{order.Day}</td>
                        <td style={{ color: "white", background: "transparent" }}>Start time:{order?.Slot.startTime} - End time:{order?.Slot.endTime}</td>
                        <td style={{ color: "white", background: "transparent" }}>{order.status}</td>
                        <td style={{ color: "white", background: "transparent" }}>
                            <Button variant="dark" className='my-1 w-100'>Reject</Button>
                            <Button variant="dark" className='my-1 w-100'>Accept</Button>
                        </td>

                    </tr>
                    )
                    }
                </tbody>
            </Table>
        </Container>
    );
};

export default Approval;