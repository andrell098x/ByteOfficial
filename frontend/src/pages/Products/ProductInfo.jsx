import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetProductInfoQuery, useCreateReviewMutation } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings.jsx";
import ProductTabs from "./ProductTabs.jsx";
import { addToCart } from "../../redux/features/cart/cartSlice.js";


const ProductInfo = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: product, isLoading, refetch, error } = useGetProductInfoQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();





  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Successfully Reviewed");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };



  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}))
    navigate('/cart');
  }

 

  return (
    <>
      <div className="mt-[10rem] text-2xl ">
        <Link to="/" className="text-black font-semibold hover:underline ml-[3rem] md:ml-[5rem] lg:ml-[6rem] xl:ml-[8rem]" >Back </Link>
      </div>
    <div className="w-[100vw] flex justify-center items-center mt-[7em] h-[200%]">
      

      {isLoading ? ( <Loader /> ) : error ? ( <Message variant="danger">{error?.data || error.message}</Message>
      ) : (
        <>
          <div className="relative grid gap-x-[10rem] gap-y-[10rem] place-items-center grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-[2rem] w-[80vw]">
            <div>
              <img src={product.image} alt={product.name} className="w-[20rem] h-[30rem] object-cover xl:w-[30rem] lg:w-[30rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] mt-[10px] shadow-lg ring-opacity-25 ring-offset-32 "
              />
              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>

              <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-black" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[20rem]">
                    <FaClock className="mr-2 text-black" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-black" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-black" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-black" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2 text-black" /> In Stock:{" "}
                    {product.inStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>

                {product.inStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black">
                      {[...Array(product.inStock).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button disabled={product.countInStock === 0} onClick={addToCartHandler} className="bg-black text-white py-2 px-4 rounded-lg mt-[3rem]">
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-center ml-[7rem]">
                <ProductTabs loadingProductReview={loadingProductReview} userInfo={userInfo} submitHandler={submitHandler} rating={rating} setRating={setRating} comment={comment} setComment={setComment} product={product}/>
            </div>
          </div>
        </>
      )}
    </div>
    </>
    
  );
};

export default ProductInfo;
