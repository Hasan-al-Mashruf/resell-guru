import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Auth/Authprovider';
import Loader from '../../components/Loader/Loader';

const MyOrders = () => {
    const { user } = useContext(AuthContext)
    const { isLoading, data: myOrders = [] } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: () =>
            fetch(`https://resell-bike-guru-mashrufhasan.vercel.app/orders?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
    })

    if (isLoading) return <Loader />

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Order Item</th>
                            <th>price</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map((order, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{order?.itemName}</td>
                                <td>{order?.price}</td>
                                <td>{order?.location}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;