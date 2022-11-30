import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../Auth/Authprovider';

const Modal = ({ setOpenModal, openProduct, displayToast }) => {
    const { user } = useContext(AuthContext)
    const { name, resalePrice } = openProduct

    const orderDetails = (e) => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const itemName = form.itemName.value
        const price = form.price.value
        const number = form.number.value
        const location = form.location.value


        const order = {
            name,
            email,
            itemName,
            price,
            number,
            location
        }
        console.log(order)
        fetch('https://resell-bike-guru-mashrufhasan.vercel.app/orders', {
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
                    displayToast()
                    setOpenModal(false)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form action="" className='flex' onSubmit={orderDetails}>
                        <div className='w-1/2 mr-3'>
                            <div className="form-control mt-1">
                                <input type="text" placeholder="name" className="input input-bordered" name='name' defaultValue={user?.displayName} disabled />
                            </div>
                            <div className="form-control mt-1">
                                <input type="email" placeholder="email address" className="input input-bordered" name='email' defaultValue={user?.email} disabled />
                            </div>
                            <div className="form-control mt-1">
                                <input type="text" placeholder="item name" className="input input-bordered" name='itemName' defaultValue={name} disabled />
                            </div>
                            <div className="form-control mt-1">
                                <input type="text" placeholder="price" className="input input-bordered" name='price' defaultValue={resalePrice} disabled />
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <div className="form-control mt-1">
                                <input type="text" placeholder="phone number" className="input input-bordered"
                                    name='number' required />
                            </div>
                            <div className="form-control mt-1">
                                <input type="text" placeholder="meeting location" className="input input-bordered" name='location' />
                            </div>
                            <div className="form-control mt-1">
                                <input type="submit" value="submit" className='btn btn-outline' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;