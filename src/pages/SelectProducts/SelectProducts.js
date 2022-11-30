import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import { MdVerified } from "react-icons/md";

const SelectProducts = () => {
    const products = useLoaderData();
    const [seller, setSeller] = useState([])
    // const [displayToast, setDisplayToast] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openProduct, setOpenProduct] = useState(false)

    const addToCart = (product) => {
        setOpenProduct(product)
        setOpenModal(true)
    }

    const displayToast = () => {
        toast.success('Your order is taken')
    }

    return (
        <div>
            {
                products.map(product =>
                    <React.Fragment key={product._id}>
                        <div className="card card-side bg-base-100 shadow-xl my-5 w-5/6 mx-auto px-3">
                            <img src={product.image} alt="Movie" className='w-1/3 rounded-sm object-contain' />
                            <div className="card-body w-1/2">
                                <h2 className="card-title text-3xl">{product.name}</h2>
                                <span className='mt-1 text-xl'>resale price: {product.resalePrice}</span>
                                <span className='mt-1 text-xl'>original price: {product.originalPrice}</span>
                                <span className='mt-1 text-xl'>Location: {product.location}</span>
                                <span className='mt-1 text-xl'>resale price: years of use: {product.yearsOfUse}</span>
                                <span className='mt-1 text-xl flex items-center'> sellers name: {product.sellersName}{product.sellerStatus !== 'unverified' && <MdVerified className='mt-1 ml-1 -primary' />}</span>
                                <span className='mt-1 text-xl'> posting date: {product.postingDate}</span>
                                <div className="card-actions justify-end">
                                    <label htmlFor="my-modal" className="btn btn-primary" onClick={() => addToCart(product)}>Add to cart</label>
                                </div>

                            </div>
                        </div>
                    </React.Fragment>
                )
            }
            {
                openModal && <Modal setOpenModal={setOpenModal} openProduct={openProduct} displayToast={displayToast} />
            }
            <Toaster />
        </div >
    );
};

export default SelectProducts;