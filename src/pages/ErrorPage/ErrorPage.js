import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError()

    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <img src="https://i.ibb.co/MpbC8Tf/16304926-Na-June-69.jpg" className="w-4/5 rounded-lg " alt='' />
                <div className='w-1/5 text-center'>
                    <h1 className="text-5xl font-bold text-red-600">{error.status}</h1>
                    <p className="py-6 text-black">{error.statusText}</p>
                    <Link to='/'>
                        <button className="btn btn-primary">Back to Home page</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;