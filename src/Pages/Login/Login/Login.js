import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Shared/Header/Header';
import Footer from '../../Shared/Footer/Footer';
import useFirebase from '../../../hooks/useFirebase';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { loginUser, isLoading, authError } = useFirebase();
    const { signInUsingGooogle, user } = useAuth();

    const location = useLocation();
    const history = useNavigate();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }


    const handleGoogleSignIn = () => {
        history(location.state?.from || '/home');

        if (user.abcd === undefined) {
            history("/googleRegister")
        }
    }

    return (
        <div>
            <Header />
            <div>
                <Container className='d-flex align-items-center justify-content-center py-5'>
                    <Row className='p-2' style={{ width: "50%", border: "1px solid gray", borderRadius: "8px" }}>
                        <Col sm={12} md={12} lg={12} className='text-white'>
                            <h2 className='text-center text-warning'>Login</h2>
                            {!isLoading && <Form onSubmit={handleLoginSubmit}>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label className='text-dark'>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        onChange={handleOnChange}
                                        placeholder="Enter email"
                                        required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label className='text-dark'>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        onChange={handleOnChange}
                                        placeholder="Password"
                                        required />
                                </Form.Group>

                                <div className="pb-3">
                                    <Button className='w-100' type="submit" variant="warning">Login</Button>
                                    {authError && <Alert variant="danger">{authError}</Alert>}
                                </div>

                                <div className='text-center'>
                                    <h6 className='text-dark'>OR</h6>
                                </div>

                                <div className='text-center pt-3 pb-5'>
                                    <Button
                                        variant='transparent'
                                        style={{ border: "1px solid yellow" }}
                                        className='text-warning w-100 h-10'
                                        onClick={() => {
                                            signInUsingGooogle();
                                            handleGoogleSignIn();
                                        }}
                                    >
                                        <img className='pe-2' width="30px" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google-logo" srcSet="" />
                                        Sign in with Google
                                    </Button>
                                </div>


                                {/* <div className="pt-2 pb-5">
                                    <Link to="/register">
                                        <Button className='w-100' variant="light">New User? Please Register</Button>
                                    </Link>
                                </div> */}
                            </Form>}
                            {isLoading && <div className="py-2 d-flex justify-content-center align-items-center"><Spinner animation="border" variant="dark" /></div>}
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default Login;