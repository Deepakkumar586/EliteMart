import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { app } from "../firebase/firebase"
import { toast } from 'react-toastify';
import { getDatabase, set, ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';



// create instance
const auth = getAuth(app);
const db = getDatabase(app);
const googleProvider = new GoogleAuthProvider();


const UserLogin = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (isLogin) {
            setIsSubmitting(true);
            try {
                const usersignin = await signInWithEmailAndPassword(auth, formData.email, formData.password)
                const user = usersignin.user;

                const snapshot = await get(ref(db, `users/${user.uid}`));
                if (snapshot.exists()) {
                    toast.success("Login successful");
                    navigate
                        ('/')
                    setFormData({
                        email: '',
                        password: '',
                    });
                    console.log("User data:", snapshot.val());

                }
                setIsSubmitting(false);
            }
            catch (error) {
                toast.error(error.message);
                console.log(error)
                setIsSubmitting(false);
            }



        }

        else {
            setIsSubmitting(true)
            try {

                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                const user = userCredential.user;
                await set(ref(db, `users/${user.uid}`), {
                    name: formData.username,
                    email: formData.email,
                    createdAt: Date.now(),
                });




                setFormData({
                    username: '',
                    email: '',
                    password: '',

                });
                toast.success("Account created successfully");
                setIsSubmitting(false)

            }
            catch (error) {
                toast.error(error.message);
                console.log(error)
            }
            setIsSubmitting(false)



        }



    };

    const handleToggle = (mode) => {
        setIsLogin(mode);
        setFormData({
            username: '',
            email: '',
            password: '',

        });
    };


    const signUpWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            toast.success("Login successful");

        } catch (error) {
            toast.error("Login failed");
        }
    };

    return (
        <div className=' flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4'>
            <div className='bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300'>


                <div className='flex border-b border-gray-200 dark:border-gray-700'>
                    <button
                        className={`flex-1 py-4 text-center font-semibold text-sm transition-all duration-300 ${isLogin
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-b-2 border-red-500'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        onClick={() => handleToggle(true)}
                    >
                        <div className='flex items-center justify-center gap-2'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            User Login
                        </div>
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-semibold text-sm transition-all duration-300 ${!isLogin
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-b-2 border-red-500'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                        onClick={() => handleToggle(false)}
                    >
                        <div className='flex items-center justify-center gap-2'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Registration
                        </div>
                    </button>
                </div>


                <div className='p-8'>
                    <div className='mb-8'>
                        <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className='text-gray-500 dark:text-gray-400 text-sm'>
                            {isLogin
                                ? 'Sign in to access your account'
                                : 'Join us and start your journey'
                            }
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className='mb-4'>
                                <label className='block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2'>
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm'
                                    placeholder='Enter your username'
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div className='mb-4'>
                            <label className='block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2'>
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className='w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm'
                                placeholder='Enter your email'
                                required
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2'>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className='w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-sm'
                                placeholder='Enter your password'
                                required
                            />
                        </div>







                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-3">
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </div>
                            )}
                        </button>



                    </form>


                    <div className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-700'>
                        <p className='text-center text-gray-500 dark:text-gray-400 text-sm mb-4'>
                            Or continue with
                        </p>
                        <div className='flex gap-3'>
                            <button className='flex-1 py-2.5 px-4 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm'
                                onClick={signUpWithGoogle}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                                </svg>
                                Google
                            </button>
                            {/* <button className='flex-1 py-2.5 px-4 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm'>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin