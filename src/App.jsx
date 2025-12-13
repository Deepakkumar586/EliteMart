import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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
import Whishlist from './pages/whishlist'
import UserLogin from './pages/UserLogin'
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from './firebase/firebase'
import { getDatabase } from 'firebase/database'


// create instance
const auth = getAuth(app);
const db = getDatabase(app);


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        toast.success("You are Logged In!")
      }
      else {
        toast.error("You are not  Logged In!")
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SkeletonTheme baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)">
      <BrowserRouter>
        <ToastContainer />

        <Navbar />
        <Routes>

          <Route path="/login" element={!isLoggedIn ? (<UserLogin />) : <Navigate to="/" />} />
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={isLoggedIn ? <CheckOut /> : <Navigate to="/login" />} />
          <Route path="/filteredproducts" element={isLoggedIn ? <FilteredData /> : <Navigate to="/login" />} />
          <Route path="/whishlist" element={isLoggedIn ? <Whishlist /> : <Navigate to="/login" />} />



        </Routes>
        <Footer />

      </BrowserRouter>
    </SkeletonTheme>

  )
}

export default App