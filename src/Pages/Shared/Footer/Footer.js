import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Footer.css";

const Footer = () => {
    return (
        <div className='bg-dark py-3'>
            <Container className='py-2'>
                <Row>
                    <Col sm={3} className='pt-2'>
                        <h6 className='text-warning pb-1'>SERVICE</h6>
                        <Link to="/venues" style={{ textDecoration: "none", color: "white" }}>Book venues</Link>
                    </Col>
                    <Col sm={3} className='pt-2'>
                        <h6 className='text-warning pb-1'>COMPANY</h6>
                        <Link to="/aboutus" style={{ textDecoration: "none", color: "white" }}>About us</Link> <br />
                        <Link to="/contactus" style={{ textDecoration: "none", color: "white" }}>Contact us</Link>
                    </Col>
                    <Col sm={3} className='pt-2'>
                        <h6 className='text-warning pb-1'>LEGAL</h6>
                        <Link to="#" style={{ textDecoration: "none", color: "white" }}>Terms of use</Link> <br />
                        <Link to="#" style={{ textDecoration: "none", color: "white" }}>Privacy policy</Link> <br />
                        <Link to="#" style={{ textDecoration: "none", color: "white" }}>Cookies policy</Link>
                    </Col>
                    <Col sm={3} className='pt-2'>
                        <h6 className='text-warning pb-1'>NEWSLETTER</h6>
                        <Form>
                            <Row className="align-items-end">
                                <Col sm={8} className='m-0 p-0'>
                                    <Form.Group controlId="formEmail">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            style={{ background: "transparent" }}
                                            className="placeholder-white"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={4} className="d-flex align-items-end m-0 p-0">
                                    <Button variant="warning" type="submit">
                                        SUBSCRIBE
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <h6 className='text-white text-center pt-4'>© Event Horizon 2023</h6>
        </div>
    );
};

export default Footer;