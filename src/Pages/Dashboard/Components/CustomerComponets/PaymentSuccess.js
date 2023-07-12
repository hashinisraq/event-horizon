import React, { useState } from 'react';
import Header from '../../../Shared/Header/Header';
import Footer from '../../../Shared/Footer/Footer';
import gify from "./Assets/giphy.gif";
import { useParams } from 'react-router';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const PaymentSuccess = () => {
    const { id } = useParams();
    const [provideData, setProvideData] = useState({});

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...provideData };
        newLoginData[field] = value;
        setProvideData(newLoginData);
    }

    const handleSubmit = e => {
        const customerTran_id = provideData.customerTran_id;
        const info = {
            val_id: id,
            customerTran_id: customerTran_id,
        }

        if (provideData.customerTran_id !== undefined) {
            fetch('http://localhost:5000/validate', {
                method: 'PUT',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(info)
            })
                .then(res => res.json())
                .then(data => {
                    window.location.replace('/home')
                })

            setProvideData({});
            alert("Thank you for booking from Event Horizon. After all check, we will confirm your order.")
        }
        else {
            alert("Enter the transaction id please to confirm your order!");
        }

        e.preventDefault();
    }

    return (
        <>
            <Header />
            <Container className='text-center py-5'>
                <h3>Payment Successful. Order will be confirmed soon.</h3>
                <Container>
                    <Row>
                        <Col sm={12} md={6}>
                            <img style={{ borderRadius: "50%" }} src={gify} alt="gify" srcSet="" width="100%" />
                        </Col>
                        <Col sm={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Form className="py-3">
                                <Form.Group className="mb-3" controlId="formGroupCustomerTranID">
                                    <Form.Label><b>Your Transaction ID</b></Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="customerTran_id"
                                        onBlur={handleOnBlur}
                                        style={{ width: "100%" }}
                                        placeholder="ABCS147569823"
                                        required />
                                </Form.Group>

                                <Button variant='dark' onClick={handleSubmit}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Footer />
        </>
    );
};

export default PaymentSuccess;