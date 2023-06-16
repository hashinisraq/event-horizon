import React from "react";
import { Spinner } from "react-bootstrap";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    let location = useLocation();
    if (isLoading) { return <div className="d-flex justify-content-center align-items-center"><Spinner animation="border" variant="dark" /></div> }
    if (user.email) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;