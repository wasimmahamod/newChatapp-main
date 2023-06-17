import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  let navigate=useNavigate()
  let dispatch=useDispatch()
  const auth = getAuth();
  let handleLogout=()=>{
    signOut(auth).then(() => {
      dispatch(userLoginInfo(null))
      localStorage.setItem('userInfo',null)
      navigate('/')
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div>
        <button onClick={handleLogout} className='bg-primary text-white font-primary text-lg px-3 py-2 rounded-md'>Logout</button>
    </div>
  )
}

export default Logout