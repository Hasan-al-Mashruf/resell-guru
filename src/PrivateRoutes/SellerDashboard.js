import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/Authprovider';
import useSeller from '../hooks/useSeller';

const SellerDashboard = ({ children }) => {

    const { user, loader } = useContext(AuthContext);
    const location = useLocation();
    const [seller, adminLoader] = useSeller(user?.email);

    if (adminLoader || loader) {
        return <h2>Loading.............</h2>
    }
    
    console.log(seller)
    if (user?.email && seller) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default SellerDashboard;