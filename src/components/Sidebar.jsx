import React from 'react'
import {AiFillHome,AiFillSetting} from 'react-icons/ai'
import {BsChatLeft} from 'react-icons/bs'
import {TiGroup} from 'react-icons/ti'
import {FaUserFriends} from 'react-icons/fa'
import {SlPeople} from 'react-icons/sl'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { userLoginInfo } from '../slices/userSlice'


const Sidebar = ({active}) => {
   const auth = getAuth();
   let navigate=useNavigate()
  let dispatch=useDispatch()
   //  let data=useSelector((state)=>state.userLogininfo.userInfo)


    let handleLogOut=()=>{
      signOut(auth).then(() => {
         dispatch(userLoginInfo(null))
         localStorage.setItem('userInfo',null)
         navigate('/')
       }).catch((error) => {
         console.log(error)
       });
    }
  return (
    <div className='w-full h-[1080px] bg-[#FFFFFF] drop-shadow-xl border-r border-solid'>
       <div className='pt-[50px] text-center'>
        <h2 className='text-center font-primary text-3xl font-bold'>Chat</h2>
        <div>
        <Link to='/home'>
        <div className='flex justify-center  items-center mt-[33px] '>
                <div className={active=='home'? 'text-lg gap-x-2 p-3 bg-primary font-primary flex items-center text-white rounded-lg' : 'text-lg gap-x-2 p-3 bg-white font-primary flex items-center text-primary rounded-lg' } ><AiFillHome/> <h3>Home</h3></div>
             </div>
        </Link>
        <Link to='/chat'>
            <div className='flex justify-center  items-center mt-[33px] '>
                <div className={active=='chat'? 'text-lg gap-x-2 p-3 bg-primary font-primary flex items-center text-white rounded-lg' : 'text-lg gap-x-2 p-3 bg-white font-primary flex items-center text-primary rounded-lg' }><BsChatLeft/> <h3>Chat</h3></div>
             </div>
        </Link>
             <Link to='/group'>
            <div className='flex justify-center  items-center mt-[33px] '>
                <div className={active=='group'? 'text-lg gap-x-2 p-3 bg-primary font-primary flex items-center text-white rounded-lg' : 'text-lg gap-x-2 p-3 bg-white font-primary flex items-center text-primary rounded-lg' }><TiGroup/> <h3>Groups</h3></div>
             </div>
             </Link>
          <Link to='/friend'>
          <div className='flex justify-center  items-center mt-[33px] '>
                <div className={active=='friend'? 'text-lg gap-x-2 p-3 bg-primary font-primary flex items-center text-white rounded-lg' : 'text-lg gap-x-2 p-3 bg-white font-primary flex items-center text-primary rounded-lg' }><FaUserFriends/> <h3>Friends</h3></div>
             </div>
          </Link>
            <Link to='/people'>
            <div className='flex justify-center  items-center mt-[33px] '>
                <div className={active=='people'? 'text-lg gap-x-2 p-3 bg-primary font-primary flex items-center text-white rounded-lg' : 'text-lg gap-x-2 p-3 bg-white font-primary flex items-center text-primary rounded-lg' }><SlPeople/> <h3>People</h3></div>
             </div>
            </Link>
            <Link to='/setting'>
            <div className='flex justify-center  items-center mt-[33px] '>
                <div className={active=='setting'? 'text-lg gap-x-2 p-3 bg-primary font-primary flex items-center text-white rounded-lg' : 'text-lg gap-x-2 p-3 bg-white font-primary flex items-center text-primary rounded-lg' }><AiFillSetting/> <h3>Setting</h3></div>
             </div>
            </Link>
            <div className='flex justify-center  items-center mt-[430px] '>
             <Link >
                    <button onClick={handleLogOut} className='font-primary font-bold hover:bg-primary hover:text-white   text-primary border border-solid border-primary text-base  w-full py-3 px-7   rounded-md ease-in-out duration-300'>LogOut</button>
             </Link>
             </div>
        </div>
       </div>
    </div>
  )
}

export default Sidebar