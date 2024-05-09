import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice.js";
import { Link } from "react-router-dom";

const OrderList = () => {
    const {data: orders, isLoading, error} = useGetOrdersQuery();

  return (
    <>
      {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) :
      (
        <table className="container mx-auto mt-[10rem] shadow-lg ">
            <thead className="w-full border-[6px] h-[50px] text-xl font-bold">
                <tr className="mb-[9rem]">
                    <td className="text-left pl-1">Items</td>
                    <td className="text-left pl-1">Id</td>
                    <td className="text-left pl-1">User</td>
                    <td className="text-left pl-1">Data</td>
                    <td className="text-left pl-1">Total</td>
                    <td className="text-left pl-1">Paid</td>
                    <td className="text-left pl-1">Delivered</td>
                </tr>
            </thead>

            <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                 
                        <td>
                            <img src={order.orderItems[0].image} alt='' className="w-[5rem] pt-4 h-[5rem] object-cover" />
                            </td>
                        <td>{order._id}</td>
                        <td>{order.user ? order.user.username : "No User"}</td>
                        <td>{order.createdAt ? order.createdAt.substring(0, 10) : "No Info"}</td>
                        <td>$ {order.totalPrice}</td>
                        <td className='py-2'>
                            {order.isPaid ? (
                                <p className="p-1 text-center bg-green-300 w-[6rem] rounded-full">
                                    Completed
                                </p>
                            ) : (
                                <p className="p-1 text-center bg-red-300 w-[6rem] rounded-full">
                                    Pending
                                </p>
                            ) }
                        </td>

                        <td className='py-2'>
                            {order.isDelivered ? (
                                <p className="p-1 text-center bg-green-300 w-[6rem] rounded-full">
                                Completed
                                </p>
                            ) : (
                                <p className="p-1 text-center bg-red-300 w-[6rem] rounded-full">
                                    Pending
                                </p>
                            )}
                        </td>

                        <td>
                            <Link to={`/order/${order._id}`}>
                                <button className="bg-black text-white rounded px-2 py-2">MORE DATA</button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      )}
    </>
  )
}

export default OrderList
