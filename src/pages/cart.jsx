import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaArrowLeft, FaCreditCard, FaTag, FaTruck } from 'react-icons/fa'
import { MdClose, MdShoppingBasket } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { removeToCart, updateToCart, removeQuantity,clearCart  } from '../redux/cartSlice'


const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const carts = useSelector((state) => state.cart.carts)
    const totalAmount = useSelector((state) => state.cart.totalAmount)
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)

    const handleRemove = (id) => {
        dispatch(removeToCart(id));
    }
    const handleQuantityChange = (id, quantity) => {
        dispatch(updateToCart({ id, quantity }));

    }

    const handleRemoveQuantity = (id) => {
        dispatch(removeQuantity(id));
    }


    if (carts.length === 0) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-800 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl  p-8 md:p-12">
                        <div className="text-center py-12">
                            <div className="inline-block p-6 bg-red-50 dark:bg-red-900/20 rounded-full mb-6">
                                <FaShoppingCart className="text-red-600 dark:text-red-400" size={64} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Your Cart is Empty
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
                            </p>
                            <Link to="/"><button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                                <MdShoppingBasket size={20} />
                                Start Shopping

                            </button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
            <div className="container mx-auto px-4">

                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <FaArrowLeft className="text-gray-700 dark:text-gray-300" size={24} onClick={() => navigate(-1)} />
                        </button>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                Shopping Cart
                            </h1>
                            <div className="flex items-center gap-2 mt-2">
                                <FaShoppingCart className="text-red-600 dark:text-red-400" />
                                <span className="text-gray-600 dark:text-gray-300">
                                    {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="lg:w-2/3">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                            {carts.map((item) => (
                                <div key={item.id} className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-0 group  transition-colors">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                // alt={item.title}
                                                className="w-full sm:w-40 h-40 object-contain p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
                                            />
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="absolute -top-2 -right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-lg"
                                            >
                                                <MdClose size={16} />
                                            </button>
                                        </div>


                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                        {item.title}
                                                    </h3>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                                                            ${item.price}
                                                        </span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                                            ${(item.price * 1.2).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="flex items-center justify-between mt-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                                                        <button

                                                            className="px-4 py-2 text-gray-900 dark:text-white transition-colors"
                                                            onClick={() => handleRemoveQuantity(item.id)}
                                                        >
                                                            <FaMinus size={14} />
                                                        </button>
                                                        <span className="px-4 py-2 min-w-[60px] text-center font-semibold text-gray-900 dark:text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="px-4 py-2 text-gray-900 dark:text-white transition-colors"
                                                        >
                                                            <FaPlus size={14} />
                                                        </button>
                                                    </div>
                                                    <button

                                                        className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                        onClick={() => handleRemove(item.id)}
                                                    >
                                                        <FaTrash size={14} />
                                                        <span className="text-sm">Remove</span>
                                                    </button>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                        ${item.totalPrice}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="lg:w-1/3">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <FaCreditCard className="text-red-600 dark:text-red-400" />
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        ${totalAmount}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                        <FaTruck className="text-green-500" />
                                        Shipping
                                    </span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                                        <FaTag className="text-red-500" />
                                        Discount
                                    </span>
                                    <span className="font-semibold text-red-600">-${(totalAmount * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"></div>
                                <div className="flex justify-between text-lg">
                                    <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                            ${(totalAmount * 0.9).toFixed(2)}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Including taxes
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col space-y-4">
                                <Link to="/checkout"> <button className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                                    <FaCreditCard size={20} />
                                    Proceed to Checkout
                                </button></Link>
                                <Link to="/" className='mt-4'> <button className="w-full py-3 border-2 border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold rounded-xl transition-colors duration-300">
                                    Continue Shopping
                                </button></Link>
                            </div>


                            <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <FaTag className="text-red-600 dark:text-red-400" />
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        Have a Promo Code?
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="flex-grow px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
                                    />
                                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart