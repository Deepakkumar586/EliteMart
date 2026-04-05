import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaHeart, FaShoppingCart, FaTrash, FaEye, FaStar, FaTag, FaCheck, FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { addToCart } from '../redux/cartSlice'
import { toast } from 'react-toastify'
import { removeWhishlist } from '../redux/whishlistSlice'
import ShareWishlistButton from '../components/ShareWishlistButton'

const Wishlist = () => {
    const whishlists = useSelector((state) => state.whishlist.whishlists);
    const cart = useSelector((state) => state.cart.carts);
    const dispatch = useDispatch();

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(product));
        toast.success("Product added to cart!");
    };

    const handleremoveWhishlist = (id) => {
        dispatch(removeWhishlist(id));
        toast.success("Product removed from wishlist!");
    }


    const totalValue = whishlists.reduce((total, item) => total + (item.price || 0), 0).toFixed(2);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 sm:py-6 lg:py-8">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">

                <div className="mb-6 sm:mb-8 lg:mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 sm:p-3 bg-gradient-to-r from-red-600 to-red-700 rounded-lg sm:rounded-xl">
                                <FaHeart className="text-xl sm:text-2xl text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                                    My Wishlist
                                </h1>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                                    {whishlists.length} {whishlists.length === 1 ? 'item' : 'items'} saved
                                </p>
                            </div>
                        </div>

                        <ShareWishlistButton />

                    </div>
                </div>


                {whishlists.length === 0 ? (
                    <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
                        <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-red-50 to-red-50 dark:from-red-900/10 dark:to-red-900/10 rounded-full mb-4 sm:mb-6">
                            <FaHeart className="text-4xl sm:text-5xl text-red-400 dark:text-red-300" />
                        </div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
                            Save your favorite items here for easy access later!
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-700 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                        >
                            <FaShoppingCart className="text-sm sm:text-base" />
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                ) : (
                    <>

                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                            {whishlists.map((item) => {
                                const isInCart = cart.find((product) => product.id === item?.id);
                                return (
                                    <div
                                        key={item.id}
                                        className="group relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-900/50"
                                    >

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleremoveWhishlist(item.id);
                                            }}
                                            className="absolute top-2 right-2 z-10 p-1.5 sm:p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition-all duration-200"
                                            aria-label="Remove from wishlist"
                                        >
                                            <FaTrash className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 group-hover:text-red-500" />
                                        </button>


                                        <div className="h-36 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 flex items-center justify-center p-3 sm:p-4">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 max-w-[80%] sm:max-w-full"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full flex items-center justify-center">
                                                    <span className="text-2xl sm:text-3xl">🛒</span>
                                                </div>
                                            )}
                                        </div>


                                        <div className="p-3 sm:p-4 lg:p-5">
                                            <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1 sm:mb-1 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                                                {item.title}
                                            </h3>

                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 truncate">
                                                {item.description}
                                            </p>

                                            {item.rating && (
                                                <div className="flex items-center gap-1 mb-2">
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className={`text-xs sm:text-sm ${i < Math.floor(item.rating)
                                                                    ? 'text-yellow-400'
                                                                    : 'text-gray-300 dark:text-gray-600'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                                        ({item.ratingCount || 0})
                                                    </span>
                                                </div>
                                            )}


                                            <div className="flex items-baseline gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                                                    ${item.price?.toFixed(2) || '0.00'}
                                                </span>
                                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                                    each
                                                </span>
                                            </div>


                                            <div className="flex flex-col gap-2">
                                                {isInCart ? (
                                                    <Link to="/cart" className="w-full">
                                                        <button className="flex items-center justify-center gap-2 w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                                            <FaCheck className="text-xs sm:text-sm" />
                                                            <span>Go to Cart</span>
                                                        </button>
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={(e) => handleAddToCart(e, item)}
                                                        className="flex items-center justify-center gap-2 w-full px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                    >
                                                        <FaShoppingCart className="text-xs sm:text-sm" />
                                                        <span>Add to Cart</span>
                                                    </button>
                                                )}



                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>


                        {whishlists.length > 0 && (
                            <div className="mt-6 sm:mt-8 lg:mt-10 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                                    <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6">
                                        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-lg text-center sm:text-left">
                                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                                                {whishlists.length}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                Items
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-3 sm:p-4 rounded-lg text-center sm:text-left">
                                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 dark:text-green-400">
                                                ${totalValue}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                Total Value
                                            </div>
                                        </div>
                                    </div>


                                    <Link
                                        to="/"
                                        className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:border-red-500 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
                                    >
                                        <FaArrowLeft className="text-sm" />
                                        <span className="text-sm sm:text-base">Continue Shopping</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Wishlist