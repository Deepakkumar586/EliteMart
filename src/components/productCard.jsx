import React from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { addToWhishlist, removeWhishlist } from "../redux/whishlistSlice";

const ProductCard = ({ products, loading }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.carts);
    const whishlists = useSelector((state) => state.whishlist.whishlists);



    const skeletonCount = 10;

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        dispatch(addToCart(product));
        toast.success("Product added to cart!");
    };

    const handlewhishlist = (e, product) => {
        e.preventDefault();
        dispatch(addToWhishlist(product));
        toast.success("Product added to whishlist!");
    }
    const handleremoveWhishlist = (id) => {

        dispatch(removeWhishlist(id));
        toast.success("Product removed from whishlist!");
    }





    const CardLayout = ({ product, isSkeleton }) => {
        const isAdded =
            cart.find((item) => item.id === product?.id);
        const isInwhishlist =
            whishlists?.some((item) => item.id === product?.id);

        return (
            <div
                className="
        flex flex-col gap-3 
        w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)]
        lg:w-[calc(25%-18px)] xl:w-[calc(20%-20px)]
        rounded-xl p-4 border shadow-md 
        bg-white dark:bg-gray-800 
        border-gray-200 dark:border-gray-700 
        transition-all duration-300 hover:shadow-xl
        "
            >


                <div className="relative mb-2">
                    {isSkeleton ? (
                        <Skeleton height={150} className="rounded-lg" />
                    ) : (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-[150px] object-contain p-3"
                        />
                    )}


                    {!isSkeleton &&
                        (isInwhishlist ? (
                            <button
                                className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full"
                                onClick={() => handleremoveWhishlist(product.id)}
                            >
                                <FaHeart className="text-red-600" size={16} />
                            </button>
                        ) : (
                            <button
                                className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full"
                                onClick={(e) => handlewhishlist(e, product)}   // this one still uses event — OK
                            >
                                <FaHeart className="text-white" size={16} />
                            </button>
                        ))
                    }





                    {!isSkeleton && (
                        <span className="absolute bottom-2 left-2 px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                            {product.category}
                        </span>
                    )}
                </div>


                {isSkeleton ? (
                    <Skeleton height={20} width="90%" />
                ) : (
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {product.title}
                    </h3>
                )}


                {isSkeleton ? (
                    <>
                        <Skeleton height={14} width="100%" />
                        <Skeleton height={14} width="80%" />
                    </>
                ) : (
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {isSkeleton ? (
                    <Skeleton height={16} width="50%" />
                ) : (
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                size={12}
                                className={`mr-0.5 ${i < Math.floor(product.rating.rate)
                                    ? "text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                    }`}
                            />
                        ))}
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                            {product.rating.rate} ({product.rating.count})
                        </span>
                    </div>
                )}

                {isSkeleton ? (
                    <Skeleton height={20} width="40%" />
                ) : (
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">
                        ${product.price}
                    </span>
                )}

                {isSkeleton ? (
                    <Skeleton height={38} className="rounded-lg mt-2" />
                ) : isAdded ? (
                    <Link to="/cart">
                        <button className="mt-3 w-full px-3 py-2.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg">
                            Go to Cart
                        </button>
                    </Link>
                ) : (
                    <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="mt-3 w-full px-3 py-2.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-wrap justify-center gap-6">

            {loading &&
                Array(skeletonCount)
                    .fill(null)
                    .map((_, index) => <CardLayout key={index} isSkeleton={true} />)}


            {!loading &&
                products.map((product) => (
                    <CardLayout key={product.id} product={product} isSkeleton={false} />
                ))}
        </div>
    );
};

export default ProductCard;
