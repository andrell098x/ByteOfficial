import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message.jsx';
import ProgressSteps from '../../components/progressSteps.jsx';
import { useCreateOrderMutation } from '../../redux/api/orderApiSlice.js';
import { clearCartItems } from '../../redux/features/cart/cartSlice.js';
import Loader from '../../components/Load.jsx';




const PlaceOrder = () => {
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)

    const [createOrder, {isLoading, error}] = useCreateOrderMutation()

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate])


    const dispatch = useDispatch()



    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap()
            dispatch(clearCartItems())
            navigate(`/order/${res._id}`)
        } catch (error) {
            toast.error(error)
        }
    }


console.log

  return (
    <div className='mt-[12rem] mb-[30rem]'>
        <ProgressSteps step1 step2 step3/>

        <div className="container mx-auto mt-8 w-[100vw] flex flex-col gap-8">
            {cart.cartItems.length === 0 ? (
                <Message>Cart is empty</Message>
            ): (
             <div className=''>
                <table className='w-full border-collapse'>
                    <thead>
                        <tr>
                            <td className="px-1 py-2 text-left align-top">Image</td>
                            <td className="px-1 py-2 text-left">Product</td>
                            <td className="px-1 py-2 text-left">Quantity</td>
                            <td className="px-1 py-2 text-left">Price</td>
                            <td className="px-1 py-2 text-left">Total</td>
                        </tr>
                    </thead>


                    <tbody>
                        {cart.cartItems.map((item, index) => (
                            <tr key={index}>
                                <td className='p-2'>
                                     <img src={item.image} alt={item.name} className='w-[20rem] h-[20rem] object-cover'/>
                                </td>
                                <td>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </td>
                                <td className='pl-[2rem]'>{item.qty}</td>
                                <td className='p-2'>{item.price.toFixed(2)}</td>
                                <td className='p-2'>{(item.qty * item.price).toFixed(2)}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>   
            )}

                    <div className="mt-8 w-[100vw] grid place-items-center">
                            <h2 className="text-xl font-semibold mb-5">Order Summary</h2>
                            <div className="grid place-items-center grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 p-8 ">
                                <ul className="text lg">
                                    <li>
                                        <span className='mb-4 font-semibold'>Items</span> $
                                        {cart.itemsPrice}
                                    </li>
                                    <li>
                                        <span className='mb-4 font-semibold'>Shipping</span> $
                                        {cart.shippingPrice}
                                    </li>
                                    <li>
                                        <span className='mb-4 font-semibold'>Tax</span> $
                                        {cart.taxPrice}
                                    </li>
                                    <li>
                                        <span className='mb-4 font-semibold'>Total</span> $
                                        {cart.totalPrice}
                                    </li>
                                </ul>

                                {error && <Message variant='danger'>{error.data.message}</Message>}

                                <div>
                                    <h2 className='text-xl font-semibold mt-[6rem] md:mt-0 lg:mt-0 xl:mt-0'>Shippings</h2>
                                    <p>
                                        <strong>Address</strong>
                                        <ul>
                                            <li>{cart.shippingAddress.address}, </li>
                                            <li>{cart.shippingAddress.city}, {" "}</li>
                                            <li>{cart.shippingAddress.postalCode}, {" "}</li>
                                            <li>{cart.shippingAddress.postalCode}</li>
                                        </ul>
                                        
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mt-[6rem] md:mt-0 lg:mt-0 xl:mt-0">
                                        Payment Method
                                    </h2>
                                    <strong>method</strong> {" "}
                                    {cart.paymentMethod}
                                </div>
                            </div>

                            <button type='button' className='bg-black text-white py-2 px-4 rounded-full text-lg w-[50%] mt-4' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</button>

                            {isLoading && <Loader />}
                        </div>
        </div>
    </div>
  )
}

export default PlaceOrder
