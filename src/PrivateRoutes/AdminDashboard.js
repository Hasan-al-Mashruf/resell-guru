import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/Authprovider';
import useAdmin from '../hooks/useAdmin';

const AdminDashboard = ({ children }) => {
    const { user, loader } = useContext(AuthContext);
    const location = useLocation();
    const [admin, adminLoader] = useAdmin(user?.email);

    if (adminLoader || loader) {
        return <h2>Loading.............</h2>
    }

    if (user?.email && admin) {
        console.log(admin)
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminDashboard;