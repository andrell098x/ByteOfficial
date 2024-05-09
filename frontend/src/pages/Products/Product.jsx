import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";

const Product = ({product}) => {
  return (
    <>
      <style>
        {`
          .items {
            transition: transform 1s ease, filter 1s ease;
          }

          .container:hover .items {
            transform: scale(2.5);
            filter: grayscale(80%);
          }
        
        `}
      </style>
      <div className="container mt-[10rem] w-[27rem] h-[32rem] ml-[2rem] p-3 relative cursor-pointer">
      <div className="p-4">
          <div className="relative overflow-hidden">
            <img src={product.image} alt={product.name} className="items w-[30rem] rounded h-[34rem] object-cover"/>
            <HeartIcon product={product} />
          </div>
            <h2 className="flex justify-between items-center">
                <div className="text-lg">
                    {product.name}
                    <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
                </div>
                <span className="bg-black text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-[gray] dark:text-black">$ {product.price}</span>
            </h2>
            <div className="w-[100%] mt-[1rem]">
              <Link to={`/product/${product._id}`}>
                <button className="bg-emerald-600 text-white rounded-full w-full h-[3rem]">
                    Details
                </button>
              </Link>
            </div>
    
      </div>
    </div>
    </>
  )
}

export default Product
