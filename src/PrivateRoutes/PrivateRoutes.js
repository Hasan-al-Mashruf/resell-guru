import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/Authprovider';
import Loader from '../components/Loader/Loader';

const PrivateRoutes = ({ children }) => {

    const { user, loader } = useContext(AuthContext)
    const location = useLocation();

    if (loader) {
        return <h2><Loader />..........</h2>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/signin" state={{ from: location }} replace />;

};

export default PrivateRoutes;