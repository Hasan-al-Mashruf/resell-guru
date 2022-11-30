import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AllBuyers = () => {
    const { isLoading, data: allBuyers = [], refetch } = useQuery({
        queryKey: ['allBuyers'],
        queryFn: () =>
            fetch(`https://resell-bike-guru.vercel.app/allBuyers`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
    })

    if (isLoading) return 'Loading...';

    const deleteBuyers = buyer => {
        fetch(`https://resell-bike-guru.vercel.app/deleteSellers/${buyer._id}`, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success(`${buyer?.name} is deleted`)
                    refetch()
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
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBuyers.map((buyer, index) => <tr key={buyer._id}>
                                <th>{index + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td><button className='btn btn-outline' onClick={() => deleteBuyers(buyer)}>Delete</button></td>
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

export default AllBuyers;