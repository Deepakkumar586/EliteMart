import React from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const FilteredData = () => {
    const filteredData = useSelector((state) => state.product.filterData);
    const cart = useSelector((state) => state.cart.carts);

    const dispatch = useDispatch();

    const handleAddToCart = (e, product) => {

        e.preventDefault();
        dispatch(addToCart(product));
        toast.success("Product added to cart!");


    }

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-8'>
            {filteredData.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 text-lg mt-20">
                    No products found
                </div>
            ) : (
                <div className="flex flex-wrap -m-2">
                    {filteredData.map((product) => {
                        const isAdded = cart.find((item) => item.id === product.id);
                        return (
                            <div
                                key={product.id}
                                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            >
                                <div className="flex flex-col gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                                    {/* Image with Heart Icon */}
                                    <div className="relative mb-4 flex-shrink-0">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-40 object-contain p-3"
                                        />
                                        <button className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                                            <FaHeart className="text-red-600 dark:text-red-400" size={16} />
                                        </button>
                                        <span className="absolute bottom-2 left-2 px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                                            {product.category}
                                        </span>
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex flex-col flex-grow space-y-2">
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2">
                                            {product.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center gap-1">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        size={12}
                                                        className={`mr-0.5 ${i < Math.floor(product.rating.rate)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300 dark:text-gray-600'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                                {product.rating.rate} ({product.rating.count})
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xl font-bold text-red-600 dark:text-red-400">
                                                ${product.price}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Cart Button */}
                                    {isAdded ? (
                                        <Link to='/cart'>
                                            <button className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg transition-all duration-300 text-sm">
                                                Go to Cart
                                                <FaShoppingCart size={16} />
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg transition-all duration-300 text-sm"
                                            onClick={(e) => handleAddToCart(e, product)}
                                        >
                                            Add to Cart
                                            <FaShoppingCart size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FilteredData;
