import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { FaHeart, FaMoon, FaSearch, FaShoppingCart, FaSun, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setSearchValue } from '../redux/productSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebase';

import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';


const auth = getAuth(app)



const Navbar = () => {

  const [theme, setTheme] = useState('light');
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearchform = (e) => {
    e.preventDefault();
    dispatch(setSearchValue(search));
    navigate('/filteredproducts');

  }

  const carts = useSelector((state) => state.cart.carts)
  const whishlists = useSelector((state) => state.whishlist.whishlists);



  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);


  }, [theme])



  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false)
      }
    })
    return () => unsubscribe();
  }, [])

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
      toast.error("Logout Succesfully")
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <nav className='bg-white shadow-md dark:bg-gray-800 py-6 md:py-2   '>
      <div className='container mx-auto px-2 md:px-4 lg:px-24 py-4 mb-3 flex items-center justify-between'>

        <div className='text-lg font-bold text-gray-950 dark:text-white'>
          <Link to='/'>EliteMart</Link>
        </div>

        <div className='hidden md:block relative flex-1 mx-4'>
          <form onSubmit={handleSearchform}>
            <input type='text' placeholder='Search products...'
              onChange={(e) => setSearch(e.target.value)}
              className='w-full rounded-lg border-2   py-2 px-4 dark:bg-gray-800 bg-gray-100 text-gray-800 dark:text-gray-300  border-red-600 dark:border-red-600' />
            <button type="submit" className='absolute top-3 right-3 text-red-600'>
              <FaSearch />
            </button>
          </form>
        </div>

        <div className='flex items-center space-x-4'>
          <Link to="/cart">
            <div className="relative">

              <FaShoppingCart className="text-xl text-gray-950 dark:text-white" />


              {carts.length > 0 && (
                <span className="absolute -top-3 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {carts.length}
                </span>
              )}
            </div>
          </Link>


          <Link to="/whishlist">
            <div className="relative">

              <FaHeart className="text-xl text-gray-950 dark:text-white" />


              {whishlists.length > 0 && (
                <span className="absolute -top-3 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {whishlists.length}
                </span>
              )}
            </div>
          </Link>
          <button onClick={toggleTheme} className='text-gray-950 dark:text-white bg-gray-200 dark:bg-gray-600 p-2 rounded-full'>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          {
            isLoggedIn ? (<button className=' text-gray-950 dark:text-white tracking-[1px]' onClick={handleLogout}>Logout </button>) : (


              <Link to="/login">  <button className=' text-gray-950 dark:text-white tracking-[1px]'>Login | Register</button></Link>
            )
          }


        </div>



      </div>
      <div className='block md:hidden relative flex-1 mx-4'>
        <form onSubmit={handleSearchform}>
          <input type='text' placeholder='Search products...'
            onChange={(e) => setSearch(e.target.value)}
            className='w-full rounded-lg border-2   py-2 px-4 dark:bg-gray-800 bg-gray-100 text-gray-800 dark:text-gray-300  border-red-600 dark:border-red-600' />
          <button type="submit" className='absolute top-3 right-3 text-red-600'>
            <FaSearch />
          </button>
        </form>
      </div>


    </nav>
  )
}

export default Navbar