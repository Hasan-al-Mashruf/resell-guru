import { data } from 'autoprefixer';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../Auth/Authprovider';

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [sellerStatus, setSellerStatus] = useState(null)

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    // const checkSeller = (seller) => {
    //     console.log(seller)

    // }

    useEffect(() => {
        fetch(`https://resell-bike-guru.vercel.app/checkSeller/${user?.email}`)
            .then(res => res.json())
            .then(data => setSellerStatus(data.message))
    }, [user?.email])

    console.log(sellerStatus)

    const handleForm = (data) => {
        data.sellersEmail = user?.email;
        data.sellersName = user?.displayName;
        data.postingDate = formattedToday;
        data.status = 'unsold';
        data.sellerStatus = sellerStatus;
        fetch('https://resell-bike-guru.vercel.app/product', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.acknowledged) {
                    toast.success('products uploaded successfully')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleForm)}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered" />
                    {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Resell Price</span>
                    </label>
                    <input type="text" {...register("resalePrice", { required: "resalePrice is required" })} className="input input-bordered" />
                    {errors.resalePrice && <p className='text-red-600'>{errors.price?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">quality</span>
                    </label>
                    <select {...register("quality", { required: true })} className="select select-bordered w-full max-w-xs">
                        <option defaultValue={'buyer'}>Good</option>
                        <option>Excellent</option>
                        <option>Fair</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" {...register("location", { required: "Location is required" })} className="input input-bordered" />
                    {errors.location && <p className='text-red-600'>{errors.location?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Mobile number</span>
                    </label>
                    <input type="tel" {...register("number", { required: "number is required" })} className="input input-bordered" />
                    {errors.number && <p className='text-red-600'>{errors.number?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product image</span>
                    </label>
                    <input type="text" {...register("image", { required: "image is required" })} className="input input-bordered" />
                    {errors.image && <p className='text-red-600'>{errors.image?.message}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select {...register("category", { required: true })} className="select select-bordered w-full max-w-xs">
                        <option defaultValue={'Gear Cycle'}>Gear Cycle</option>
                        <option>Stunt cycle</option>
                        <option>Offroad cycle</option>
                    </select>
                </div>
                <div className="form-control mt-3">
                    <input type="submit" value="Submit" className='btn btn-accent' />
                </div>
            </form>
            <Toaster />
        </div>
    );
};

export default AddProduct;