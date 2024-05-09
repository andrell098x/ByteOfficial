import React, { useState, useEffect } from 'react'
import { useGetUsersQuery } from '../../redux/api/usersApiSlice.js';
import Chart from 'react-apexcharts';
import { useGetTotalOrdersQuery, useGetTotalSalesQuery, useGetTotalSalesByDateQuery } from '../../redux/api/orderApiSlice.js';
import OrderList from './OrderList.jsx';
import Loader from '../../components/Loader.jsx';
import { FaUser } from "react-icons/fa";

const Dashboard = () => {
    const {data: sales, isLoading} = useGetTotalSalesQuery();
    const {data: customers, isLoading: loading} = useGetUsersQuery();
    const {data: orders, isLoading: loading2} = useGetTotalOrdersQuery();
    const {data: salesInfo} = useGetTotalSalesByDateQuery();


    const [state, setState] = useState({
        options: {
            chart: {
                type: 'line'
            },
            tooltip: {
                theme: 'light',
            },
            colors: ['#000000'],
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Sales Trend',
                align: 'left',
                style: {
                    fontSize: '1.875rem' 
                }
            },
            grid: {
                borderColor: '#ccc'
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: [],
                title: {
                    text: "Date"
                }
            },
            yaxis: {
                title: {
                    text: 'Sales'
                },
                min: 0
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        },
        series: [
            {name: "Sales", data: []}
        ]
    });


    useEffect(() => {
        if (salesInfo) {
            const formattedSalesDate = salesDetail.map((item) => ({
                x: item._id,
                y: item.totalSales
            }))

            setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formattedSalesDate.map((item) => item.x)
                    }
                },

                series: [
                    {name: "Sales", data: formattedSalesDate.map((item) => item.y)}
                ]
            }))
        }
    }, [salesInfo])

    console.log(state.options)
    console.log(state.series)

  return (

    <>
   <style>{`
   .chart-container svg text {
    font-size: 1.875rem; 
}
`}</style>
       <section className='xl:ml-[4rem] md:ml-[0rem] mt-[10rem]'>
    <div className="w-[80%] flex justify-around flex-wrap">
        {/* Sales Component */}
        <div className="rounded-lg bg-white p-5 w-[20rem] mt-5 shadow-lg">
            <div className="flex items-center justify-center rounded-full w-[3rem] h-[3rem] bg-black text-white">
                <span className="text-2xl font-bold">$</span>
            </div>
            <p className="mt-5 text-gray-600">Total Sales</p>
            <h1 className="text-3xl font-bold text-blue-600 mt-2">
                {isLoading ? <Loader /> : `$ ${sales.totalSales.toFixed(2)}`}
            </h1>
        </div>

        {/* Customers Component */}
        <div className="rounded-lg bg-white p-5 w-[20rem] mt-5 shadow-lg">
            <div className="flex items-center justify-center rounded-full w-[3rem] h-[3rem] bg-black text-white">
                <span className="text-2xl font-bold"><FaUser /></span>
            </div>
            <p className="mt-5 text-gray-600">Total Customers</p>
            <h1 className="text-3xl font-bold text-green-600 mt-2">
                {isLoading ? <Loader /> : customers?.length}
            </h1>
        </div>

        {/* All Orders Component */}
        <div className="rounded-lg bg-white p-5 w-[20rem] mt-5 shadow-lg">
            <div className="flex items-center justify-center rounded-full w-[3rem] h-[3rem] bg-black text-white">
                <span className="text-2xl font-bold">O</span>
            </div>
            <p className="mt-5 text-gray-600">Total Orders</p>
            <h1 className="text-3xl font-bold text-purple-600 mt-2">
                {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
        </div>
    </div>




 


            <div className='mt-[4rem]'>
                <OrderList />
            </div>
        </section>
    </>
  )
}

export default Dashboard
