import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';

const AllSellers = () => {
    const { isLoading, data: allSellers = [], refetch } = useQuery({
        queryKey: ['allSellers'],
        queryFn: () =>
            fetch(`https://resell-bike-guru-mashrufhasan.vercel.app/allSellers`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
    })

    if (isLoading) return <Loader />;

    const deleteSellers = seller => {
        fetch(`https://resell-bike-guru-mashrufhasan.vercel.app/deleteSellers/${seller._id}`, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success(`${seller?.name} is deleted`)
                    refetch()
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const verifySellers = seller => {
        console.log(seller)
        fetch(`https://resell-bike-guru-mashrufhasan.vercel.app/verifySeller/${seller?._id}`, {
            method: 'PUT', // or 'PUT'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success(`${seller?.name} is verified`)
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
                            <th>status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSellers?.map((seller, index) => <tr key={seller._id}>
                                <th>{index + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{seller.status}</td>
                                <td>
                                    <button className='btn btn-outline btn-sm mr-3' onClick={() => verifySellers(seller)} disabled={seller.status === 'verified'}>Verify</button>
                                    <button className='btn btn-outline btn-sm' onClick={() => deleteSellers(seller)}>Delete</button>
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

export default AllSellers;