import React from 'react';
import bannerImg from '../../assets/banner.png';

const Banner = () => {
    return (
        <div>
            <div className="hero bg-gradient-to-r from-primary to-accent">
                <div className="hero-content flex-col lg:flex-row-reverse h-[50vh]">
                    <img src={bannerImg} className="rounded-lg h-[88vh] relative -top-12" alt='' />
                    <div className='w-1/2 text-white'>
                        <h1 className="text-5xl font-bold">Resell your <span className='text-accent'>Cycle</span> here</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-accent text-white">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;