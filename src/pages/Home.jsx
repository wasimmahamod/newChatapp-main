import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import ChatList from '../components/ChatList'
import PeopleList from '../components/PeopleList'
import GroupList from '../components/GroupList'
import ChatHome from '../components/ChatHome'
import FriendRequest from '../components/FriendRequest'
import FriendsList from './../components/FriendsList';
import BlockList from '../components/BlockList'
import { useSelector,useDispatch } from 'react-redux'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from '../slices/userSlice'

const Home = () => {
  let dispatch= useDispatch()
  let navigate = useNavigate()
  const auth = getAuth();

  let [verify,setVerify]=useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerify(true)
      dispatch(userLoginInfo(user))
      localStorage.setItem('userInfo',JSON.stringify(user))
    } else {
    }
  });


  let data = useSelector((data) => data.userLogininfo.userInfo)

  useEffect(()=>{
    if(!data){
      navigate('/')
    }
  })

  return (
    <div>
      {verify
      ?
      <div className='flex '>
      <div className='w-[192px] '>
        <Sidebar active="home" />
      </div>
      <div className='flex gap-x-6 ml-10 mt-[50px] '>
        <div className='w-[384px] '>
          <div className='w-full h-[505px] '>
            <ChatHome />

          </div>
          <div className='w-full h-[505px] mt-8 '>

            <PeopleList />
          </div>
        </div>
        <div className='w-[384px] '>
          <div className='w-full h-[505px] '>
            <GroupList />

          </div>
          <div className='w-full h-[505px] mt-8 '>

            <FriendRequest />
          </div>
        </div>
        <div className='w-[384px] '>
          <div className='w-full h-[505px] '>
            <FriendsList />

          </div>
          <div className='w-full h-[505px] mt-8 '>

            <BlockList />
          </div>
        </div>
      </div>
    </div>
    :
    <div className='w-ful h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center'>
      <h1 className='text-white font-primary font-bold text-2xl'>Please verify Your Email </h1>
    </div>
    }
   

    </div>
  )
}

export default Home