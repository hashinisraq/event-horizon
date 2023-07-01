import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
    };
    return (
        <div>
            <Header />
            <Container>
                <div className='d-flex justify-content-center align-items-center'>
                    <div style={{ padding: "15% 0" }} className='w-50 d-flex justify-content-center align-items-center'>
                        <img src="https://i.ibb.co/F61XtQT/logo3.png" width="50%" alt="logo" />
                    </div>
                    <div className='py-5 w-50 d-flex justify-content-center align-items-center'>
                        <div className='px-2 py-5'>
                            <h3 className='text-center pb-3'>Contact us</h3>
                            {!submitted ? (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formName" className="mb-3">
                                        <Form.Label><b>Name</b></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label><b>Email</b></Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formMessage" className="mb-3">
                                        <Form.Label><b>Message</b></Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Enter your message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button variant="warning" type="submit" className='w-100'>
                                        Submit
                                    </Button>
                                </Form>
                            ) : (
                                <p>Thank you for contacting us. We will contact you very soon.</p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default ContactUs;