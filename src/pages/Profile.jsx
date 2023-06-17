import React from 'react'
import Sidebar from '../components/Sidebar'
import { getAuth, updateProfile,onAuthStateChanged  } from "firebase/auth";
import { userLoginInfo } from '../slices/userSlice';
import Logout from '../components/Logout'
import { useSelector,useDispatch } from 'react-redux'
import ProfilePic from '../components/ProfilePic'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const auth = getAuth();
  let navigate=useNavigate()
    const dispatch=useDispatch()
    onAuthStateChanged(auth, (user) => {
      if (user) {
          dispatch(userLoginInfo(user))
          localStorage.setItem('userInfo',JSON.stringify(user))
      } else{
        navigate('/')
      }
    });
  return (
    <div className='w-full flex  justify-between'>
    <div className='w-[192px] '>
        <Sidebar active="profile"/>
    </div>
    <div className=' w-[86%]  h-[1080px] p-10'>
        <ProfilePic/>
        <div className='mt-10'>
            <Logout/>
        </div>
    </div>
       
</div>
  )
}

export default Profile