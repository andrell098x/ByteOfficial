import React from 'react'

const ProgressSteps = ({step1, step2, step3}) => {
  return (
    <div className='flex justify-center items-center space-x-4 mt-[5rem]'>
      <div className={`${step1 ? 'text-green-500' : 'text-gray-300}'}`}>
        <span className='ml-2'>Login</span>
        <div className="mt-2 text-lg text-center">🟢</div>
      </div>
      

      {step2 && (
        <>
        {step1 && <div className='h-0.5 w-[8rem] md:w-[8rem] lg:w-[9rem] xl:w-[10rem] bg-green-500'></div>}
        <div className={`${step1 ? 'text-green-500' : 'text-gray-300'}`}>
            <span>Shipping</span>
            <div className="mt-2 text-lg text-center">🟢</div>
        </div>
        </>
      )}



      <>
        {step1 && step2 && step3 ? (
            <div className='h-0.5 w-[8rem] md:w-[8rem] lg:w-[9rem] xl:w-[10rem] bg-green-500'></div>
        ) : ''}


        <div className={`${step3 ? 'text-green-500' : 'text-gray-300'}`}>
            <span className={`${!step3 ? 'ml-[8rem]' : ''}`}>Summary</span>
            {step1 && step2 && step3 ? (
                <div className="mt-2 text-lg text-center">🟢</div>
            ) : ('')}
        </div>
      </>
    </div>
  )
}

export default ProgressSteps;
