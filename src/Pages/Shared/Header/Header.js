import React from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../../../hooks/useFirebase';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import useUsers from '../../../hooks/useUsers';

const Header = () => {
    const { user, logOut } = useFirebase();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#">
                        <Link to="/home"><img src="https://i.ibb.co/q9k9RKm/logo.png" alt="logo" srcSet="" width="200px" /></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* nothing */}
                        </Nav>
                        <Nav className='d-flex justify-content-center align-items-center'>
                            {selectedUser?.role === "customer" ? <Nav.Link href="#"><Link to="/venues" style={{ textDecoration: "none", color: "black" }}>All Venues</Link></Nav.Link> : <></>}
                            <Nav.Link href="#"><Link to="/aboutus" style={{ textDecoration: "none", color: "black" }}>About us</Link></Nav.Link>
                            <Nav.Link href="#"><Link to="/contactus" style={{ textDecoration: "none", color: "black" }}>Contact us</Link></Nav.Link>

                            {!user.email ? <><Nav.Link href="#"><Link to="/login" style={{ textDecoration: "none", color: "black" }}>Login</Link></Nav.Link>
                                <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
                                    <Nav.Link>
                                        <Button variant='warning' className='p-2'>Sign up</Button>
                                    </Nav.Link>
                                </Link></> : <></>}

                            {selectedUser?.name !== undefined ? <NavDropdown title={<DropdownOptionImage />} id="collasible-nav-dropdown">
                                <NavDropdown.Item>
                                    <Link to="/dashboard" style={{ textDecoration: "none", color: "black" }}>My profile</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Button variant='light' onClick={logOut}>Log out</Button>
                                </NavDropdown.Item>
                            </NavDropdown> : <></>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

// Custom component for the dropdown option image
const DropdownOptionImage = () => {
    const { user } = useFirebase();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email)[0];
    return (
        <span className="dropdown-option-image">
            <img src={`${selectedUser?.profileImageLink}`} alt="Dropdown Icon" width="30%" style={{ borderRadius: "50%" }} />
        </span>
    );
};

export default Header;