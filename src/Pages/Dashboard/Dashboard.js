import React from 'react';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import useAuth from '../../hooks/useAuth';
import useUsers from '../../hooks/useUsers';
import Profile from './Components/Profile';
import VenueInformation from './Components/VenueInformation';
import BookedVenues from './Components/BookedVenues';
import AvailableVenues from './Components/AvailableVenues';
import RenterVenue from './Components/RenterVenue';
import './Dashboard.css';
import DeleteVenue from './Components/DeleteVenue';

const Dashboard = () => {
    const { user } = useAuth();
    const [users] = useUsers();

    const selectedUser = users?.filter(usr => usr.email === user.email);
    const role = selectedUser[0]?.role;

    return (
        <div className="holder">
            <Header />
            <div>
                <div className='text-center'>
                    <div className='pb-3'>
                        <h5 className='text-white'>DASHBOARD</h5>
                        <Container className='py-5 text-white'>
                            {role === "owner" ? <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                <Row>
                                    <Col sm={12} lg={2}>
                                        <Nav variant="pills" className="flex-column" >
                                            <Nav.Item>
                                                <Nav.Link className="nav_link" eventKey="first">
                                                    Profile
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link className="nav_link" eventKey="second">
                                                    Setup Venue
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link className="nav_link" eventKey="third">
                                                    Update Venue
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link className="nav_link" eventKey="fourth">
                                                    Renter Venue
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link className="nav_link" eventKey="fifth">
                                                    Available Venues
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link className="nav_link" eventKey="sixth">
                                                    Booked Venues
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link className="nav_link" eventKey="seventh">
                                                    Venue Informtaion
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link className="nav_link" eventKey="eightth">
                                                    Delete Veneue
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link className="nav_link" eventKey="nineth">
                                                    Approval
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={12} lg={10}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <Profile />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                {/* <SetupVenue /> */}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                {/* <Members /> */} Members
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="fourth">
                                                <RenterVenue />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="fifth">
                                                <AvailableVenues />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="sixth">
                                                <BookedVenues />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="seventh">
                                                <VenueInformation />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="eightth">
                                                <DeleteVenue />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="nineth">
                                                {/* <ChangeRole /> */} Approval
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container> :
                                <></>}
                        </Container>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;