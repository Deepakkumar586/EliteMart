import React from 'react'
import {
    FaTruck,
    FaCreditCard,
    FaShieldAlt,
    FaTag,
    FaShippingFast,
    FaLock,
    FaPercent,
    FaWallet
} from 'react-icons/fa'
import {
    MdDiscount,
    MdPayment,
    MdLocalShipping,
    MdSecurity
} from 'react-icons/md'
import { Ri24HoursFill } from 'react-icons/ri'

const InfoSection = () => {
    return (
        <section className="py-16 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8" >

                <div className="bg-white dark:bg-[#111827] rounded-3xl  ">
                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg">
                                    <FaTruck size={32} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        Ecommerce <span className="text-red-600 dark:text-red-400">Perks</span>
                                    </h3>
                                    <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2"></div>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                                Enjoy premium shopping benefits designed for your convenience.
                                Get free shipping, exclusive discounts, and secure payments with every purchase.
                            </p>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* 24/7 Free Shipping */}
                                <div className="bg-red-50 dark:bg-gray-700/50 p-5 rounded-xl border border-red-100 dark:border-gray-600 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <Ri24HoursFill className="text-red-600 dark:text-red-400" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                                24/7 Free Shipping
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Free delivery worldwide, available round the clock
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="bg-red-50 dark:bg-gray-700/50 p-5 rounded-xl border border-red-100 dark:border-gray-600 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <FaPercent className="text-red-600 dark:text-red-400" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                                Exclusive Discounts
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Special offers and payment method discounts
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="bg-red-50 dark:bg-gray-700/50 p-5 rounded-xl border border-red-100 dark:border-gray-600 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <FaLock className="text-red-600 dark:text-red-400" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                                Secure Payments
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                256-bit SSL encryption for safe transactions
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="bg-red-50 dark:bg-gray-700/50 p-5 rounded-xl border border-red-100 dark:border-gray-600 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <FaShippingFast className="text-red-600 dark:text-red-400" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                                Easy Returns
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                30-day hassle-free return policy
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="lg:w-1/2">
                            <div className="grid grid-cols-2 gap-6">
                                {/* Shipping Stats */}
                                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-red-100 dark:border-gray-700 shadow-lg">
                                    <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                                        <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                                            24/7
                                        </div>
                                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <MdLocalShipping className="text-red-600 dark:text-red-400" size={24} />
                                        </div>
                                    </div>
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Shipping Hours
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        Always available
                                    </div>
                                </div>


                                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-red-100 dark:border-gray-700 shadow-lg">
                                    <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                                        <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                                            30%
                                        </div>
                                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <MdDiscount className="text-red-600 dark:text-red-400" size={24} />
                                        </div>
                                    </div>
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Average Savings
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        With payment discounts
                                    </div>
                                </div>


                                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-red-100 dark:border-gray-700 shadow-lg">
                                    <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                                        <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                                            100%
                                        </div>
                                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <MdSecurity className="text-red-600 dark:text-red-400" size={24} />
                                        </div>
                                    </div>
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Secure Payments
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        Fraud protection
                                    </div>
                                </div>


                                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl border border-red-100 dark:border-gray-700 shadow-lg">
                                    <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                                        <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                                            98%
                                        </div>
                                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <FaCreditCard className="text-red-600 dark:text-red-400" size={24} />
                                        </div>
                                    </div>
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                        Happy Customers
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        Payment satisfaction
                                    </div>
                                </div>
                            </div>


                            <div className="mt-8 p-6 bg-gradient-to-r from-red-600 to-rose-600 dark:from-red-700 dark:to-rose-800 rounded-2xl text-white">
                                <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
                                    <h4 className="text-xl font-bold">Secure Payment Options</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                        <span className="text-sm opacity-90">Protected</span>
                                    </div>
                                </div>
                                <p className="text-red-100 dark:text-red-200 mb-4">
                                    Multiple secure payment methods with additional discounts for digital wallets.
                                </p>
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-white/20 rounded">
                                            <FaCreditCard size={18} />
                                        </div>
                                        <span className="text-sm">Credit Cards</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-white/20 rounded">
                                            <FaWallet size={18} />
                                        </div>
                                        <span className="text-sm">Digital Wallets</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-white/20 rounded">
                                            <MdPayment size={18} />
                                        </div>
                                        <span className="text-sm">UPI/Banking</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InfoSection