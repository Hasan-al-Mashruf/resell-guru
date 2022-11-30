import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/Authprovider';
import Loader from '../components/Loader/Loader';
import useBuyer from '../hooks/useBuyer';

const BuyerDashboard = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const location = useLocation();
    const [buyer, adminLoader] = useBuyer(user?.email);

    if (adminLoader || loader) {
        return <h2><Loader />..........</h2>
    }

    if (user?.email && buyer) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default BuyerDashboard;