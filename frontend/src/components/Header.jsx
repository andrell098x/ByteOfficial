import React from 'react'
import { useGetTopProductsQuery } from '../redux/api/productApiSlice.js';
import Loader from './Loader.jsx';
import SmallProduct from '../pages/Products/SmallProduct.jsx';
import ProductsSlide from '../pages/Products/ProductsSlide.jsx';
import { Link } from 'react-router-dom';
import MagnetoButton from './MagnetoButton.jsx';

const Header = () => {
  const {data, isLoading, error} = useGetTopProductsQuery();
  
  
  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <h1>Error</h1>
  }



  return (
    <> 
      <div className="flex justify-around mt-[7rem]">
        <div className="xl:block lg:block md:block sm:block w-[100vw] relative">
          <ProductsSlide />
          <Link to='/products'>
            <MagnetoButton />
          </Link>
          <h2 className='text-black text-center font-semibold text-[3rem] mt-[10rem]'>Top Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((product) => (
                <div className='flex justify-center items-center mt-[10rem]' key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))}
            </div>
        </div>
        
      </div>
    </>
  )
}

export default Header
