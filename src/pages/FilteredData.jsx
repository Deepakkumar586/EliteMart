import React from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import { addToWhishlist, removeWhishlist } from '../redux/whishlistSlice';

const FilteredData = () => {
    const filteredData = useSelector((state) => state.product.filterData);
    const cart = useSelector((state) => state.cart.carts);
    const whishlists = useSelector((state) => state.whishlist.whishlists);

    const dispatch = useDispatch();

    const handleAddToCart = (e, product) => {

        e.preventDefault();
        dispatch(addToCart(product));
        toast.success("Product added to cart!");


    }

    const handlewhishlist = (e, product) => {
        e.preventDefault();
        dispatch(addToWhishlist(product));
        toast.success("Product added to whishlist!");
    }
    const handleremoveWhishlist = (id) => {

        dispatch(removeWhishlist(id));
        toast.success("Product removed from whishlist!");
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
                        const isInwhishlist =
                            whishlists?.some((item) => item.id === product?.id);
                        return (
                            <div
                                key={product.id}
                                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                            >
                                <div className="flex flex-col gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                                    
                                    <div className="relative mb-4 flex-shrink-0">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="w-full h-40 object-contain p-3"
                                        />


                                        {
                                            isInwhishlist ? (
                                                <button
                                                    className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full"
                                                    onClick={() => handleremoveWhishlist(product.id)}
                                                >
                                                    <FaHeart className="text-red-600" size={16} />
                                                </button>
                                            ) : (
                                                <button className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors" onClick={(e) => handlewhishlist(e, product)}>
                                                    <FaHeart className="text-gray-800 dark:text-white" size={16} />
                                                </button>
                                            )
                                        }
                                        <span className="absolute bottom-2 left-2 px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                                            {product.category}
                                        </span>
                                    </div>

                                    
                                    <div className="flex flex-col flex-grow space-y-2">
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2">
                                            {product.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center gap-1">
                                             
                                            <span className= "flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                                                {product.rating} <FaStar className="text-yellow-500 " size={12} />
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
