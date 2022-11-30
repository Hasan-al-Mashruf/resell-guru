import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
const Categories = () => {

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch(`https://resell-bike-guru-mashrufhasan.vercel.app/categories`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    })

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className=''>
            <div className='text-center mt-16 mb-10'>
                <h3 className="text-3xl capitalize text-bold">product <span className='bg-neutral px-3 py-2 rounded-lg text-white'>categories</span></h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 my-10 md:p-0 px-5'>
                {categories?.map(cat =>
                    <React.Fragment key={cat?._id}>
                        <div className="card bg-base-100 shadow-xl">
                            <figure><img src={cat?.image} alt="Shoes" className='object-cover h-[250px] w-full' /></figure>
                            <div className="card-body flex-row justify-between">
                                <h2 className="card-title">{cat?.name}</h2>
                                <Link to={`/selectProducts/${cat?.name}`}><button className="btn btn-primary">View More</button></Link>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    )
};

export default Categories;