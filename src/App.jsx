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
import { ref, get } from "firebase/database";



// create instance
const auth = getAuth(app);
const db = getDatabase(app);

const AppLoader = () => (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center gap-4">


    <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-600 
                    border-t-red-600 dark:border-t-red-400 
                    rounded-full animate-spin" />


    <p className="text-lg font-medium text-gray-800 dark:text-gray-300 
                  animate-pulse">
      Loading EliteMart...
    </p>

  </div>
);





const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authLoading, setAuthLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {

          const snapshot = await get(ref(db, `users/${currentUser.uid}`));
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setIsLoggedIn(true);
            toast.success(`Welcome back, ${userData.name}! `);
          } else {

            toast.success("You are logged in!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Logged in, but failed to fetch user info.");
        }

        setAuthLoading(false);
      } else {
        setIsLoggedIn(false);
        toast.error("You are not logged in!");
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);


  if (authLoading) {
    return <AppLoader />;
  }

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