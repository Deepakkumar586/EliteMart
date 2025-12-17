import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    FaCheckCircle,
    FaHome,
    FaShoppingBag,
    FaTag,
    FaTruck,
    FaCreditCard,
    FaDownload,
    FaCheck,
    FaCalendarAlt
} from "react-icons/fa";

const PaymentSuccess = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return navigate("/");
    }

    const { carts, total, discount, totalAmount, paymentId, orderId } = state;


    const formatDate = () => {
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
            <div className="max-w-5xl w-full">

                <div className="flex flex-col items-center justify-center mb-8">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-full shadow-xl">
                            <FaCheckCircle className="text-white text-5xl" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-red-500">
                            <FaCheck className="text-red-500 text-xs" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                        Payment Successful!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
                        Your order has been confirmed and will be processed shortly
                    </p>
                    <div className="mt-3 px-4 py-1 bg-red-50 dark:bg-red-900/20 rounded-full">
                        <span className="text-red-600 dark:text-red-400 font-medium">
                            Order #{orderId}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 space-y-6">

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <FaShoppingBag className="text-red-500" />
                                    Order Items ({carts.length})
                                </h2>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatDate()}
                                </span>
                            </div>

                            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                                {carts.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                                    >
                                        <div className="relative">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                                                <span className="font-bold text-red-600 dark:text-red-400 text-lg">
                                                    ₹{item.price}
                                                </span>
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                                                {item.quantity}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                                {item.name}
                                            </h3>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    ₹{item.price} each
                                                </span>
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaCreditCard className="text-red-500" />
                                Payment Details
                            </h2>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600 dark:text-gray-300">Payment ID</span>
                                    <span className="font-mono text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                                        {paymentId}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600 dark:text-gray-300">Order ID</span>
                                    <span className="font-mono text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded">
                                        {orderId}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between py-2">
                                    <span className="text-gray-600 dark:text-gray-300">Date & Time</span>
                                    <span className="text-gray-900 dark:text-white flex items-center gap-2">
                                        <FaCalendarAlt className="text-red-500" />
                                        {new Date().toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-6">

                        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                                    <span className="font-medium text-gray-900 dark:text-white">₹{totalAmount}</span>
                                </div>

                                <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                                    <span className="flex items-center gap-2">
                                        <FaTruck />
                                        Shipping
                                    </span>
                                    <span className="font-medium">FREE</span>
                                </div>

                                <div className="flex justify-between items-center text-red-500 dark:text-red-400">
                                    <span className="flex items-center gap-2">
                                        <FaTag />
                                        Discount
                                    </span>
                                    <span className="font-medium">-₹{discount.toFixed(2)}</span>
                                </div>

                                <div className="border-t border-gray-300 dark:border-gray-600 pt-4 mt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">Total Amount</span>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                                                ₹{total}
                                            </div>
                                            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                                <FaCheck className="inline mr-1" />
                                                Payment Completed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => navigate("/")}
                                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-xl active:scale-[0.98] shadow-lg"
                            >
                                <FaHome />
                                Continue Shopping
                            </button>




                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;