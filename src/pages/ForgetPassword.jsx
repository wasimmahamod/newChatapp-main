import React from 'react'

const ForgetPassword = () => {
  return (
   <div className=" w-full h-screen flex justify-center items-center">
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 rounded-lg '>
        <h3 className='text-white font-primary text-2xl font-bold '>Reset Your Password</h3>
        <div className='relative w-full lg:w-[492px] mt-10'>
            <input type='email' className='w-full p-4 border  placeholder:text-base placeholder:font-primary  border-solid border-primary rounded-md' placeholder='Enter Your Email ' />

            <h3 className='font-primary text-xl font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 absolute top-[-15px] left-5 px-3'> Your Email</h3>
          </div>

          <button className='font-primary font-semibold text-white text-lg bg-primary  w-full py-3 mt-5 rounded-md'>Reset </button>
    </div>
   </div>
  )
}

export default ForgetPassword