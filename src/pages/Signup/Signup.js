import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/Authprovider';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateName } = useContext(AuthContext)
    const [email, setEmail] = useState(null)
    const [token] = useToken(email)
    const navigate = useNavigate()

    if (token) {
        console.log(token)
        navigate('/')
    }


    const handleForm = (data) => {
        console.log(data)
        createUser(data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateName(data.name)
                console.log(user)
                const myUserData = {
                    name: data.name,
                    email: data.email,
                    role: data.select,
                }
                if (myUserData.role === 'Seller') {
                    myUserData.status = 'unverified'
                }
                saveMyUsers(myUserData)
            })
            .catch((error) => console.error(error));
    }

    const saveMyUsers = (myUser) => {
        console.log(myUser)
        fetch('https://resell-bike-guru-mashrufhasan.vercel.app/myUsers', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myUser),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                if (data.acknowledged) {
                    toast.success('Account created successfully')
                    setEmail(myUser.email)
                    console.log(email)

                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='h-[80vh] flex items-center justify-center'>
            <div className='w-2/6 p-6 shadow-md rounded'>
                <h2 className='text-center my-5 text-xl font-semibold'>Sign up</h2>

                <form onSubmit={handleSubmit(handleForm)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Full name</span>
                        </label>
                        <input type="text" {...register("name", { required: "Name is required" })} className="input input-bordered" />
                        {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" {...register("email", { required: "Email Address is required" })} className="input input-bordered" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="text" {...register(
                            "password", {
                            required: "passoword is required",
                            minLength: { value: 6, message: "6 characters" },
                            pattern: { value: /(?=.*[!@#$&*])(?=.*[0-9].*[0-9])/, message: 'password is week' }
                        })}
                            className="input input-bordered" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Choose carefully</span>
                        </label>
                        <select {...register("select", { required: true })} className="select select-bordered w-full max-w-xs">
                            <option defaultValue={'buyer'}>Buyer</option>
                            <option>Seller</option>
                        </select>
                    </div>
                    <div className="form-control mt-3">
                        <input type="submit" value="Submit" className='btn btn-accent' />
                    </div>
                </form>

                <div className='mt-2'>
                    <label>Already have an account <Link to='/login' className='text-primary'>Login here</Link></label>
                    <div className="divider my-5">OR</div>
                    <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Signup;