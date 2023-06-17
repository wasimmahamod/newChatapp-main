import React, { useState } from 'react'
import { Link, json } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification ,updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';

import { getDatabase, ref, set } from "firebase/database";
import { Rings } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate()
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [nameerr, setNameerr] = useState('')
  let [emailerr, setEmailerr] = useState('')
  let [passworderr, setPassworderr] = useState('')
  let [loader, setLoader] = useState(false)

  let handleName = (e) => {
    setName(e.target.value)
    setNameerr('')
  }
  let handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailerr('')
  }
  let handlePassword = (e) => {
    setPassword(e.target.value)
    setPassworderr('')
  }

  let handleSubmit = () => {
    if (!name) {
      setNameerr('Name is Required ')
    }
    if (!email) {
      setEmailerr("Email is Required ")
    }
    if (!password) {
      setPassworderr("Password is Required ")
    }
    if (!email.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      setEmailerr('Invalid Email')
    }
    if (name && email && password && email.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              updateProfile(auth.currentUser, {
                displayName: name, photoURL: "images/profile.png"
              })
              set(ref(db, 'users/' + user.user.uid), {
                name: name,
                email: email,
                img:'images/profile.png'
              }).then(() => {
                setLoader(true)

              }).then(() => {
                setTimeout(() => {
                  navigate('/')
                }, 2000);
              })
            });


        })
        .catch((error) => {
          if (error.code.includes('auth/email-already-in-use')) {
            setEmailerr('Email is Already in use ')
          }
          console.log(error.code)
        });

    }
  }

  return (
    <div className='flex '>
      <div className=' md:w-2/4 lg:flex ml-6 '>
        <div className='mt-[256px] '>
          <h1 className=' font-primary text-primary text-3xl font-bold'>Welcome To Chatt.</h1>
          <h3 className=' font-primary text-primary text-xl font-bold mt-6'>Sign Up</h3>

          <div className='relative w-full lg:w-[492px] mt-10'>
            <input onChange={handleName} type='email' className='w-full p-4 border  placeholder:text-base placeholder:font-primary  border-solid border-primary rounded-md' placeholder='Enter Your Name  ' />
            {nameerr &&
              <p className='font-primary text-white bg-red-500 text-sm px-5 py-1'>{nameerr}</p>
            }

            <h3 className='font-primary text-xl font-medium text-primary bg-white absolute top-[-15px] left-5'> Your Name</h3>
          </div>

          <div className='relative w-full lg:w-[492px] mt-10'>
            <input onChange={handleEmail} type='email' className='w-full p-4 border  placeholder:text-base placeholder:font-primary  border-solid border-primary rounded-md' placeholder='Enter Your Email ' />
            {emailerr &&
              <p className='font-primary text-white bg-red-500 text-sm px-5 py-1'>{emailerr}</p>
            }
            <h3 className='font-primary text-xl font-medium text-primary bg-white absolute top-[-15px] left-5'> Your Email</h3>
          </div>

          <div className='relative w-full lg:w-[492px] mt-10'>
            <input onChange={handlePassword} className='w-full p-4 placeholder:text-base placeholder:font-primary  border border-solid border-primary rounded-md' placeholder='Enter Your Password ' type="password" />
            {passworderr &&
              <p className='font-primary text-white bg-red-500 text-sm px-5 py-1'>{passworderr}</p>
            }
            <h3 className='font-primary text-xl font-medium text-primary bg-white absolute top-[-15px] left-5'>Your Password</h3>
          </div>
          <div className='w-full lg:w-[492px] '>
            {loader ?
              <div className='w-full flex justify-center'>
                <Rings
                  height="80"
                  width="80"
                  radius="9"
                  color='green'
                  ariaLabel='three-dots-loading'
                  wrapperStyle
                  wrapperClass
                />

              </div>
              :

              <button onClick={handleSubmit} className='font-primary font-semibold text-white text-lg bg-primary  w-full py-3 mt-5 rounded-md'>Signup</button>

            }


          </div>
          <div className='flex  justify-between mt-6 '>
            <div>
              <label className='flex gap-x-[6px] '>
                <input className='w-6 h-6 ' type="checkbox" />
                <h4 className='font-primary text-base font-normal text-primary'>Remember Me</h4>

              </label>

            </div>
          </div>
          <h4 className='font-primary text-base  text-[#7A7A7A] mt-5 '> Have an Account ?<Link className='ml-5 text-primary' to='/'>Login</Link> </h4>
        </div>
      </div>
      <div className=' relative md:w-2/4 h-screen'>
        <img className='hidden sm:block w-full h-full object-cover' src="images/login.png" />
        <div className='w-full h-full  absolute top-0 left-0 bg-[rgba(0,0,0,.4)]  '></div>
      </div>

    </div>
  )
}

export default Signup