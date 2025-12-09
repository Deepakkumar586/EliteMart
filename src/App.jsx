import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/cart'
import CheckOut from './pages/CheckOut'
import FilteredData from './pages/FilteredData'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'





const App = () => {
  return (
    <SkeletonTheme baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/filteredproducts" element={<FilteredData />} />


        </Routes>
        <Footer />

      </BrowserRouter>
    </SkeletonTheme>

  )
}

export default App