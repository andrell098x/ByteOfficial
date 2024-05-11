import Load2 from '../components/Load2.jsx'
import Loader from "../components/Loader.jsx";
import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice.js";
import Header from "../components/Header.jsx";
import Message from "../components/Message.jsx";
import Product from "./Products/Product.jsx";





const Home = () => {
  const {keyword} = useParams()
  const {data, isLoading, isError} = useGetProductsQuery({keyword})

  return (
    <>
        
        {!keyword ? <Header /> : null}
        {isLoading ? (<Loader />) : isError ? (<Message variant='danger'>
          {isError?.data.message || isError.error}
        </Message>)
        : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="ml-[13rem] mt-[10rem] text-[3rem]">
                Special Products
              </h1>

              <Link to='/products' className="bg-black text-white font-bold rounded-full py-4 px-10 ml-[2rem] mr-[18rem] mt-[10rem]">Shop now</Link>
            </div>

            <div>
              <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 flex-wrap mt-[2rem] md:gap-x-[3rem] lg:gap-x-[7rem] xl:px-[2rem] mb-[30rem]">
                {data.products.map((product) => (
                  <div className='my-[3rem] ' key={product._id}>
                    <Product className='items' product={product}/>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      }


    </>
 
  )
}

export default Home
    