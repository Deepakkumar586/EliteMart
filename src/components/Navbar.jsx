import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { FaMoon, FaSearch, FaShoppingCart, FaSun, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setSearchValue } from '../redux/productSlice';

const Navbar = () => {

  const [theme, setTheme] = useState('light');
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchform = (e) => {
    e.preventDefault();
    dispatch(setSearchValue(search));
    navigate('/filteredproducts');

  }

  const carts = useSelector((state) => state.cart.carts)



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

  return (
    <nav className='bg-white shadow-md dark:bg-gray-800  '>
      <div className='container mx-auto px-2 md:px-4 lg:px-24 py-4 flex items-center justify-between'>

        <div className='text-lg font-bold text-gray-950 dark:text-white'>
          <Link to='/'>EliteMart</Link>
        </div>

        <div className='relative flex-1 mx-4'>
          <form onSubmit={handleSearchform}>
            <input type='text' placeholder='Search products...'
              onChange={(e) => setSearch(e.target.value)}
              className='w-full rounded-lg border py-2 px-4 ' />
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
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {carts.length}
                </span>
              )}
            </div>
          </Link>
          <button onClick={toggleTheme} className='text-gray-950 dark:text-white bg-gray-200 dark:bg-gray-600 p-2 rounded-full'>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <button className='hidden md:block text-gray-950 dark:text-white tracking-[1px]'>Login | Register</button>
          <button className='block md:hidden text-gray-950 dark:text-white'><FaUser /></button>

        </div>
      </div>


    </nav>
  )
}

export default Navbar