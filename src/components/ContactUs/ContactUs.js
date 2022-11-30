import React from 'react';

const ContactUs = () => {
    return (
        <div className='my-16'>
            <div className='text-center mt-16 mb-10'>
                <h3 className="text-3xl capitalize text-bold">give us your <span className='bg-neutral px-3 py-2 rounded-lg text-white'>experiences</span></h3>
            </div>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left md:w-2/5">
                        <h1 className="text-5xl font-bold">Contact us</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="divider divider-horizontal md:flex hidden">OR</div>
                    <div className="divider md:hidden">OR</div>
                    <div className="card flex-shrink-0 shadow-2xl bg-base-100 md:w-2/5 w-full">
                        <div className="card-body">
                            <form action="">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="name" className="input input-bordered" name='name' />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="text" placeholder="email" className="input input-bordered" email='email' />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Your review</span>
                                    </label>
                                    <textarea className="textarea textarea-bordered" placeholder="Review"></textarea>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ContactUs;