import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../Auth/Authprovider';

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const { isLoading, refetch, data: myOrders = [] } = useQuery({
        queryKey: ['myProducts', user?.email],
        queryFn: () =>
            fetch(`https://resell-bike-guru.vercel.app/myProducts?email=${user?.email}`)
                .then(res => res.json())
    })

    if (isLoading) return 'Loading...'

    const deleteItem = order => {
        console.log(order._id)
        fetch(`https://resell-bike-guru.vercel.app/deleteProducts/${order._id}`, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success(`${order.name} is deleted`)
                    fetch(`https://resell-bike-guru.vercel.app/advertisedItem/${order._id}`, {
                        method: 'DELETE'
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            refetch()
                        })
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const advertiseItem = order => {
        console.log(order)
        fetch('https://resell-bike-guru.vercel.app/advertisedItem', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.acknowledged) {
                    toast.success(`${order.name} is showing on advertise`)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Resell price</th>
                            <th>Status</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map((order, index) => <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order.name}</td>
                                <td>{order.resalePrice}</td>
                                <td className='text-red-600'>{order.status}</td>
                                <td>
                                    <button className='btn btn-outline btn-sm mr-3' onClick={() => deleteItem(order)}>Delete</button>
                                    <button className='btn btn-primary btn-sm' onClick={() => advertiseItem(order)}>Advertise</button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <Toaster />
        </div>
    );
};

export default MyProducts;