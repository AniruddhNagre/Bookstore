import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// react icons
import { FaBlog, FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from '../context/AuthProvider';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isSticky, setIsSticky] = React.useState(false);

    const { user } = useContext(AuthContext);
    console.log(user)

    // toggle the menu open and close
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // navItem here
    const navItems = [
        { link: 'Home', path: '/' },
        { link: 'About', path: '/about' },
        { link: 'Shop', path: '/shop' },
        { link: 'Sell Your Book', path: '/admin/dashboard' },
        { link: 'Blog', path: '/blog' },
    ]

    return (
        <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300 " : ""}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    {/* Logo  */}
                    <Link to="/" className='text-2x1 font-bold text-blue-700 flex items-center gap-2 ' >
                        <FaBlog className='inline-block' />Books</Link>

                    {/* nav item for large device */}
                    <ul className='md:flex space-x-12 hidden'>
                        {
                            navItems.map(({ link, path }) =>
                                <Link
                                    key={path}
                                    to={path}
                                    className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'
                                >
                                    {link}
                                </Link>
                            )
                        }
                    </ul>
                    {/* btn for lg devices */}
                    <div className='space-x-12 hidden lg:flex items-center'>
                        <button><FaBarsStaggered className='w-5 hover:text-blue-700' /></button>

                        {/* Show user's email if logged in, otherwise show the Login link */}
                        {
                            user ? (
                                <span className='text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                                    {user.email}
                                </span>
                            ) : (
                                <Link to='/sign-up' className='text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                                    Sign up
                                </Link>
                            )
                        }


                    </div>

                    {/* Menu btn for the mobile devices */}
                    <div className='md:hidden '>
                        <button onClick={toggleMenu} className='text-black focus:outline-none' >
                            {
                                isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />
                            }
                        </button>
                    </div>
                </div>

                {/* navitem for sm devices */}
                <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {
                        navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base 
                        text-black uppercase cursor-pointer'>{link}</Link>)
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar