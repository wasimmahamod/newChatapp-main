import React from 'react';
import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";

const ChatHome = () => {
    return (
        <div>
        <div className="flex justify-between items-center ">
          <h1 className="font-primary text-black text-2xl font-semibold">
          Chat
          </h1>
          <BsThreeDotsVertical className="text-2xl" />
        </div>
        <div className=" relative mt-6">
          <input
            className="w-full py-3 pl-14 border border-solid border-[#D3D3D3] rounded-md  placeholder:text-sm placeholder:font-primary "
            type="text"
            placeholder="Search"
          />
          <BsSearch className="absolute top-4 left-4" />
        </div>
        <div>
        <div className="flex  items-center mt-5">
            <img
              className="w-12 h-12 rounded-full"
              src="images/people.png"
              alt=""
            />
            <div className='ml-4'>
            <h4 className=" text-lg font-primary font-semibold text-[#222222]">
            Johnson & Johnson
            </h4>
              <h6 className=' text-sm font-primary font-normal text-[#7A7A7A]'>Love You.....</h6>
            </div>

            <p className="ml-auto font-xs font-normal text-[#7A7A7A]">
            10:30 PM
            </p>
          </div>
        <div className="flex  items-center mt-5">
            <img
              className="w-12 h-12 rounded-full"
              src="images/people.png"
              alt=""
            />
            <div className='ml-4'>
            <h4 className=" text-lg font-primary font-semibold text-[#222222]">
            Johnson & Johnson
            </h4>
              <h6 className=' text-sm font-primary font-normal text-[#7A7A7A]'>Love You.....</h6>
            </div>

            <p className="ml-auto font-xs font-normal text-[#7A7A7A]">
            10:30 PM
            </p>
          </div>
        <div className="flex  items-center mt-5">
            <img
              className="w-12 h-12 rounded-full"
              src="images/people.png"
              alt=""
            />
            <div className='ml-4'>
            <h4 className=" text-lg font-primary font-semibold text-[#222222]">
            Johnson & Johnson
            </h4>
              <h6 className=' text-sm font-primary font-normal text-[#7A7A7A]'>Love You.....</h6>
            </div>

            <p className="ml-auto font-xs font-normal text-[#7A7A7A]">
            10:30 PM
            </p>
          </div>
        <div className="flex  items-center mt-5">
            <img
              className="w-12 h-12 rounded-full"
              src="images/people.png"
              alt=""
            />
            <div className='ml-4'>
            <h4 className=" text-lg font-primary font-semibold text-[#222222]">
            Johnson & Johnson
            </h4>
              <h6 className=' text-sm font-primary font-normal text-[#7A7A7A]'>Love You.....</h6>
            </div>

            <p className="ml-auto font-xs font-normal text-[#7A7A7A]">
            10:30 PM
            </p>
          </div>
        </div>
      </div>
    );
};

export default ChatHome;