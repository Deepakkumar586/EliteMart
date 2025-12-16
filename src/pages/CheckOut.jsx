import React, { useState } from "react";
import { FaCreditCard, FaTag, FaTruck, FaLock, FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaypal, FaMoneyBillAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";


const CheckOut = () => {
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;


    const carts = useSelector((state) => state.cart.carts)
    const totalAmount = useSelector((state) => state.cart.totalAmount)
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)
    const navigate = useNavigate();



    // payment 
    const handlePayment = async () => {

        if (!validateForm()) {
            return;
        }
        try {

            const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
                amount: Number(total),
            });


            const options = {
                key: razorpayKey,
                amount: data.amount,
                currency: "INR",
                name: "EliteMart",
                description: "Order Payment",
                order_id: data.id,
                handler: async function (response) {

                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                    await axios.post("http://localhost:5000/api/payment/verify-payment", {
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature,
                    });

                    navigate("/");
                },
                prefill: {
                    name: "Deepak Kumar",
                    email: "deepak@gmail.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#0d6efd",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            alert("Payment failed. Try again!");
        }
    };


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        paymentMethod: "card"
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (formData.firstName.length < 2) newErrors.firstName = "First name must be at least 2 characters";
        if (formData.lastName.length < 2) newErrors.lastName = "Last name must be at least 2 characters";



        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "Required";
        } else if (!formData.email.includes('@')) {
            newErrors.email = "Invalid email";
        }
        else if (!emailPattern.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        const phonePattern = /^\+?\d{10,15}$/;
        if (!formData.phone) {
            newErrors.phone = "Required";
        } else if (!phonePattern.test(formData.phone)) {
            newErrors.phone = "Invalid phone number";
        }
        if (formData.address.length < 5) newErrors.address = "Address must be at least 5 characters";

        const postalPattern = /^[0-9]{5,6}$/;
        if (!formData.postalCode) {
            newErrors.postalCode = "Required";
        } else if (!postalPattern.test(formData.postalCode)) {
            newErrors.postalCode = "Invalid postal code";
        }
        if (!["card", "paypal", "cod"].includes(formData.paymentMethod)) {
            newErrors.paymentMethod = "Select a valid payment method";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            console.log("Order submitted:", formData);
            toast.success("Order placed successfully!");
            setIsSubmitting(false);

            setFormData({
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                postalCode: "",
                email: "",
                phone: "",
                country: "",
                state: "",
                paymentMethod: "card"
            });
        }, 1000);
    };

    const shipping = 0;
    const discount = (totalAmount * 0.1);
    const total = (totalAmount - discount).toFixed(2);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Secure Checkout</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Complete your purchase in just a few steps</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-2 space-y-6">

                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                        <FaUser className="text-red-600 dark:text-red-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Information</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                                            placeholder="John"
                                        />
                                        {errors.firstName && (
                                            <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                                            placeholder="Doe"
                                        />
                                        {errors.lastName && (
                                            <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Details</h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                                            placeholder="+1 (555) 123-4567"
                                        />
                                        {errors.phone && (
                                            <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                        <FaMapMarkerAlt className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shipping Address</h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                                            placeholder="123 Main Street"
                                        />
                                        {errors.address && (
                                            <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                                placeholder="New York"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                                placeholder="NY"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Postal Code
                                            </label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition`}
                                            />
                                            {errors.postalCode && (
                                                <p className="mt-2 text-sm text-red-600">{errors.postalCode}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                        <FaLock className="text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { value: "card", label: "Credit Card", icon: <FaCreditCard className="text-2xl text-red-500" /> },
                                        { value: "paypal", label: "PayPal", icon: <FaPaypal className="text-2xl text-blue-500" /> },
                                        { value: "cod", label: "Cash on Delivery", icon: <FaMoneyBillAlt className="text-2xl text-yellow-500" /> }
                                    ].map((method) => (
                                        <button
                                            key={method.value}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.value }))}
                                            className={`p-4 rounded-xl border-2 transition-all ${formData.paymentMethod === method.value
                                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                                : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'}`}
                                        >
                                            <div className="mb-2 flex justify-center">{method.icon}</div>
                                            <div className="font-medium text-gray-900 dark:text-white text-center">{method.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg">
                                        <FaCreditCard className="text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Summary</h2>
                                </div>


                                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                                    {carts.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                            <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center">
                                                <span className="text-lg font-bold text-red-600 dark:text-red-400">${item.price}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 dark:text-white truncate">{item.name}</h4>
                                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                    <span>Qty: {item.quantity}</span>
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>


                                <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                        <span className="font-medium text-gray-900 dark:text-white">${totalAmount}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                            <FaTruck className="text-green-500" />
                                            Shipping
                                        </span>
                                        <span className="font-medium text-green-600">FREE</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                            <FaTag className="text-red-500" />
                                            Discount (10%)
                                        </span>
                                        <span className="font-medium text-red-600">-${discount.toFixed(2)}</span>
                                    </div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-4"></div>

                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-lg font-bold text-gray-900 dark:text-white">Total Amount</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Including all taxes</div>
                                        </div>
                                        <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                                            ${total}
                                        </div>
                                    </div>
                                </div>


                                <button
                                    type="submit"
                                    onClick={handlePayment}
                                    disabled={isSubmitting}
                                    className={`w-full mt-6 py-4 px-6 rounded-xl font-bold text-white transition-all ${isSubmitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-3"

                                        >
                                            <FaLock />
                                            Pay Securely ${total}
                                        </div>
                                    )}
                                </button>


                                <div className="mt-4 text-center">
                                    <div className="inline-flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">

                                        <span>Your payment is secured with 256-bit SSL encryption</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckOut;