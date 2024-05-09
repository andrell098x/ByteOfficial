import { useGSAP } from '@gsap/react';
import React, { useState } from 'react';
import gsap from 'gsap';

const MagnetoButton = () => {
    const [debugInfo, setDebugInfo] = useState('');

    const activateMagneto = (event) => {
        const magneto = event.target;
        const boundBox = magneto.getBoundingClientRect();

        const newX = (event.clientX - boundBox.left) - (boundBox.width / 2);
        const newY = (event.clientY - boundBox.top) - (boundBox.height / 2);
        
        const debugText = `cursorX: ${event.clientX} <br> 
                           boxLeft: ${Math.ceil(boundBox.left)} <br>
                           cursorInsideButton: ${Math.ceil(event.clientX - boundBox.left)} <br>
                           newX: ${newX} <br>
                           newY: ${newY}`;

        setDebugInfo(debugText);
    };

    const resetMagneto = () => {
        setDebugInfo('');
    };

    useGSAP(() => {
        gsap.to(".magneto-button", {
            duration: 1,
            x: newX,
            y: newY,
            ease: "power4.out" // Custom GSAP ease
        });
    }, [newX, newY]);

    return (
        <>
            <button 
                onMouseMove={activateMagneto} 
                onMouseLeave={resetMagneto} 
                className='magneto-button absolute top-[21%] left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer text-black bg-white rounded-full px-7 py-5 h-[10rem] w-[10rem]'>
                <span>Show Now</span>
            </button>

            {/* <div dangerouslySetInnerHTML={{ __html: debugInfo }} className='absolute top-[10%] left-[10%] h-[10rem] w-[15rem] bg-black text-white'></div> */}
        </>
    );
};

export default MagnetoButton;
