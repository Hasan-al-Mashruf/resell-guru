import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loader from '../Loader/Loader';

const AdvertisedItem = () => {

    const { isLoading, refetch, data: advertisedOrders = [] } = useQuery({
        queryKey: ['products'],
        queryFn: () =>
            fetch(`https://resell-bike-guru-mashrufhasan.vercel.app/products`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
    })

    if (isLoading) return <Loader />

    return (
        <div>
            {
                advertisedOrders?.length > 0 &&
                <>
                    <div className='text-center mt-16 mb-10'>
                        <h3 className="text-3xl capitalize text-bold">Advertised <span className='bg-neutral px-3 py-2 rounded-lg text-white'>products</span></h3>
                    </div>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-5 my-10 md:p-0 p-5'>

                        {advertisedOrders.map(order =>
                            <React.Fragment key={order._id}>
                                <div className="card bg-base-100 shadow-xl">
                                    <figure><img src={order.image} alt="Shoes" className='object-cover h-[250px] w-full' /></figure>
                                    <div className="card-body flex-row justify-between">
                                        <h2 className="card-title">{order.name}</h2>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </>
            }

        </div>
    );
};

export default AdvertisedItem;