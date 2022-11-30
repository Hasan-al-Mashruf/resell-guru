import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Auth/Authprovider';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import useRole from '../../hooks/useRole';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const [role, adminLoader] = useRole(user?.email)

    if (adminLoader) {
        return <Loader />
    }

    console.log(role)
    return (
        <div>
            <Header />
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content pl-5">
                    <Outlet />
                </div>
                <div className="drawer-side border drawer-overlay" htmlFor="my-drawer-2">
                    <label htmlFor="my-drawer-2" className="drawer-overlay">
                    </label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {
                            (role === 'Buyer') &&
                            <>
                                <li><Link to='/dashboard/myOrders'>My orders</Link></li>
                            </>
                        }
                        {
                            (role === 'Seller') &&
                            <>
                                <li><Link to='/dashboard/addProduct'>Add a product</Link></li>
                                <li><Link to='/dashboard/myProduct'>My products</Link></li>
                            </>
                        }
                        {
                            (role === 'Admin') &&
                            <>
                                <li><Link to='/dashboard/allSellers'>All sellers</Link></li>
                                <li><Link to='/dashboard/allBuyers'>All Buyers</Link></li>
                                <li><Link to='/dashboard/allBuyers'>Reported Items</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;