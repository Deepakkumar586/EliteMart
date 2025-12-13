import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaShoppingBag, FaFire, FaShoppingCart, FaHeart, FaEye, FaChevronRight, FaStar, FaStore } from 'react-icons/fa';
// import { Categories } from '../assets/mockData';
import HeroImage from '../assets/images/8852975.jpg';
import InfoSection from '../components/infoSection';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/productSlice';
import ProductCard from '../components/productCard';



const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [loading, setLoading] = useState(true);
  const [selectesCategory, setSelectedCategory] = useState('All');




  useEffect(() => {
    const fetchProducts = async () => {
      try {

        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        dispatch(setProducts(data));
        setLoading(false);

      }
      catch (error) {
        console.error("Failed to fetch products");
        setLoading(false);

      }
    }
    fetchProducts();

  }, [dispatch])


  const Categories = [
    "All",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];

  const filtercategoryData = selectesCategory === 'All' ? products : products.filter((item) => item.category === selectesCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white ">
      <main className="container mx-auto px-4 py-8 ">
        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 dark:bg-gray-700 rounded-lg">
                  <FaShoppingBag className="text-red-600 dark:text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  SHOP BY CATEGORIES
                </h2>
              </div>

              <ul className="space-y-3">
                {Categories.map((cat, index) => {
                  const isActive = selectesCategory === cat;

                  return (
                    <li
                      key={index}
                      className="cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <div
                        className={`
          flex items-center justify-between p-2 rounded-xl
          border transition-all duration-300
          bg-white dark:bg-gray-800
          dark:hover:bg-gray-700 hover:border-red-200 dark:hover:border-gray-600
          ${isActive ? "border-red-500 shadow-md" : "border-gray-100 dark:border-gray-700"}
        `}
                      >
                        <div className="flex items-center gap-4">

                          <div
                            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${isActive ? "bg-red-600 scale-125" : "bg-red-400 dark:bg-gray-500"}
            `}
                          ></div>


                          <span
                            className={`
              text-md font-medium transition-colors duration-300
              ${isActive ? "text-red-600 dark:text-red-400" : "text-gray-800 dark:text-gray-200"}
            `}
                          >
                            {cat}
                          </span>
                        </div>


                        <FaArrowRight
                          className={`
            transition-all duration-300 text-red-500 dark:text-gray-300
            ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
          `}
                        />
                      </div>
                    </li>
                  );
                })}

              </ul>


              <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl border border-red-100 dark:border-gray-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 dark:bg-red-900/20 rounded-full -translate-y-8 translate-x-4"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <FaFire className="text-orange-500 dark:text-orange-400 animate-pulse" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Trending now in all categories
                  </span>
                </div>
              </div>
            </div>
          </div>


          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl">

              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent dark:bg-gradient-to-r dark:from-gray-900/90 dark:via-gray-900/70 dark:to-transparent z-10"></div>

              <img
                src={HeroImage}
                alt="Hero"
                className="w-full  object-cover opacity-30 dark:opacity-20"
              />

              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center">
                <div className="max-w-xl">

                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-red-100 dark:bg-gray-700 rounded-full">
                    <FaStar className="text-yellow-500" />
                    <p className="text-sm font-medium text-red-700 dark:text-gray-300">
                      Code With Deepak Kumar
                    </p>
                  </div>


                  <h2 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                    WELCOME TO <span className="text-red-600 dark:text-red-400">ELITEMART</span>
                  </h2>


                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-2xl font-bold text-red-600 dark:text-red-400">10K+</span>
                      <span className="text-gray-600 dark:text-gray-300">PRODUCTS</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>


                  <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 dark:hover:from-gray-600 dark:hover:via-gray-700 dark:hover:to-gray-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl dark:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <span>SHOP NOW</span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* all products */}
        <div className="mt-16 mb-16">



          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg">
              <FaStore size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                All <span className="text-red-600 dark:text-red-400">Products</span>
              </h3>
              <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-2"></div>
            </div>
          </div>

          {/* Flex container for responsive layout */}

          <ProductCard products={filtercategoryData} loading={loading} />

        </div>

        <InfoSection />
      </main>
    </div>
  )
}

export default Home