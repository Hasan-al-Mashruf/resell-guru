import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/Authprovider';
import useToken from '../../hooks/useToken';
const provider = new GoogleAuthProvider();

const Signin = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { loginUser, loginWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [token, adminLoader] = useToken(email)
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    // if (adminLoader) {
    //     return '<Loader />..'
    // }
    useEffect(() => {
        if (token) {
            console.log(token)
            navigate(from, { replace: true });
        }
    }, [token, navigate, from])


    const handleForm = (data) => {

        loginUser(data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setEmail(data?.email)
            })
            .catch((error) => console.error(error));
    }

    const googleLogin = () => {
        loginWithGoogle(provider)
            .then((result) => {
                const user = result.user;
                const myUserData = {
                    name: user?.displayName,
                    email: user?.email,
                    role: 'Buyer'
                }
                saveMyUsers(myUserData)
                // ...
            }).catch((error) => console.error(error));
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
                } else {
                    toast.success(data.message)
                    setEmail(myUser.email)
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div className='h-[80vh] flex items-center justify-center'>
            <div className='w-2/6 p-6 shadow-md rounded'>
                <h2 className='text-center my-5 text-xl font-semibold'>Sign in</h2>

                <form onSubmit={handleSubmit(handleForm)}>
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
                        <input type="text" {...register("password", {
                            required: "passoword is required",
                        })} className="input input-bordered" />
                        <label className="label">
                            <Link to='/' className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <div className="form-control mt-3">
                        <input type="submit" value="Submit" className='btn btn-accent' />
                    </div>
                </form>

                <div className='mt-2'>
                    <label>New to Doctor's portal <Link to='/signup' className='text-primary'>Create an account</Link></label>
                    <div className="divider my-5">OR</div>
                    <button className='btn btn-outline w-full' onClick={googleLogin}>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Signin;