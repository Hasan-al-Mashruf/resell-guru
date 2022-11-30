import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Auth/Authprovider';

const Header = () => {
    const { user, logOutuser } = useContext(AuthContext)
    const logOut = () => {
        localStorage.clear()
        logOutuser()
    }
    const navItems =
        <>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/blog'>blog</Link></li>
            {
                user?.displayName ? <>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/signin' onClick={logOut}>Signout</Link></li>
                    <li><Link>{user?.displayName}</Link></li>
                </> : <li><Link to='/signin'>Signin</Link></li>
            }
        </>
    return (
        <div>
            <div className="navbar bg-accent text-white">
                <div className="navbar-start">
                    <div className="dropdown ">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-500 rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost normal-case text-xl">daisyUI</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    <label tabIndex={0} htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Header;