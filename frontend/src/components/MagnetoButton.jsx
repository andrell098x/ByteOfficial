import { useGSAP } from '@gsap/react';
import React, { useState } from 'react';
import gsap from 'gsap';
import { FaShoppingBag } from "react-icons/fa";

const MagnetoButton = () => {
    

    return (
        <>
            <button 
            
                className='magneto-button absolute top-[21%] left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer text-black bg-green rounded-full px-7 py-5 h-[10rem] w-[10rem] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
                <span className='flex items-center flex-col hover:' >Show Now<FaShoppingBag size={35}/></span>
            </button>

            {/* <div dangerouslySetInnerHTML={{ __html: debugInfo }} className='absolute top-[10%] left-[10%] h-[10rem] w-[15rem] bg-black text-white'></div> */}
        </>
    );
};

export default MagnetoButton;
