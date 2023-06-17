import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userLoginInfo } from '../slices/userSlice';
import { getAuth, signInWithEmailAndPassword, } from "firebase/auth";
import { Rings } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';



const Login = () => {
  const auth = getAuth();
  let dispatch= useDispatch()
  let navigate =useNavigate()
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [emailerr, setEmailerr] = useState('')
  let [passworderr, setPassworderr] = useState('')
  let [loader, setLoader] = useState(false)

  let handleEmail = (e) => {
    setEmail(e.target.value)
    setEmailerr('')
  }
  let handlePassword = (e) => {
    setPassword(e.target.value)
    setPassworderr('')
  }

  let handleSubmit = () => {
    if (!email) {
      setEmailerr("Email is Required ")
    }
    if (!password) {
      setPassworderr("Password is Required ")
    }
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          toast.success('Login Successfull ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            dispatch(userLoginInfo(user.user))
            localStorage.setItem('userInfo', JSON.stringify(user.user))
        }).then(()=>{
          setLoader(true)
          setTimeout(() => {
            navigate('/home')
            
          }, 2000);
        })
        .catch((error) => {
          toast.error('Someting is wrong (:', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          if(error.code.includes('auth/wrong-password')){
            setPassworderr("wrong Password ")
          }
          if(error.code.includes('auth/user-not-found')){
            setEmailerr("Email not Found  ")
          }
          console.log(error)
        });
    }
  }



  return (
    <div className='flex '>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
      <div className=' md:w-2/4 lg:flex ml-6 '>
        <div className='mt-[315px] '>
          <h1 className=' font-primary text-primary text-3xl font-bold'>Welcome To Chatt.</h1>
          <h3 className=' font-primary text-primary text-xl font-bold mt-6'>Log In</h3>

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

              <button onClick={handleSubmit} className='font-primary font-semibold text-white text-lg bg-primary  w-full py-3 mt-5 rounded-md'>Login</button>

            }

          </div>
          <div className='flex  justify-between mt-6 '>
            <div>
              <label className='flex gap-x-[6px] '>
                <input className='w-6 h-6 ' type="checkbox" />
                <h4 className='font-primary text-base font-normal text-primary'>Remember Me</h4>

              </label>

            </div>
            <div>
              <Link to='/forget' className='font-primary text-primary text-base '>Forgot Password?</Link>
            </div>
          </div>
          <h4 className='font-primary text-base  text-[#7A7A7A] mt-5 '>Don't Have a Account ?<Link className='ml-5 text-primary' to='/singup'>Singup</Link> </h4>
        </div>
      </div>
      <div className=' relative md:w-2/4 h-screen'>
        <img className='hidden sm:block w-full h-full object-cover' src="images/login.png" />
        <div className='w-full h-full  absolute top-0 left-0 bg-[rgba(0,0,0,.4)]  '></div>
      </div>

    </div>
  )
}

export default Login