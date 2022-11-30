import React, { useContext } from 'react';
import { AuthContext } from '../../Auth/Authprovider';

const DashboardContent = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <h2 className='text-3xl my-6 text-primary font-bold'>{user?.displayName} , Welcome to the dashboard</h2>
        </div>
    );
};

export default DashboardContent;