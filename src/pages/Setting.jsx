import React, { useState, createRef } from 'react'
import Sidebar from '../components/Sidebar'
import { FiEdit3 } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { HiKey } from 'react-icons/hi'
import { BsFillSunFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Cropper from "react-cropper";
import { getAuth, updateProfile, signOut, updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadString, getDownloadURL, } from "firebase/storage";
import { Rings } from 'react-loader-spinner'
import { getDatabase, update, ref as dref } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux'
import { userLoginInfo } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'




const Setting = () => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const db = getDatabase();
    const auth = getAuth();
    const storage = getStorage();
    //loader state 
    const [loader, setLoader] = useState(false)
    // edit name state 
    const [editName, setEditName] = useState('')
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();
    let [profileModal, setProfileModal] = useState(false)
    let [profileInfo, setProfileInfo] = useState(false)
    let [passwordChangeModal, setPasswordChangeModal] = useState(false)
    //chnage password state 
    let [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    //   get cropdata 
    const getCropData = () => {
        setLoader(true)
        toast.info('Please Wait few Secands ', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const storageRef = ref(storage, auth.currentUser.uid);
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                getDownloadURL(storageRef).then((downloadURL) => {
                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL,
                    }).then(() => {
                        update(dref(db, 'users/' + auth.currentUser.uid), {
                            img: downloadURL,
                        }).then(() => {
                            setProfileModal(false)
                            setCropData('')
                            setImage('')
                            setLoader(false)
                            toast.success('Profile Photo Updated  Done :)', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                      

                        })
                    })
                });
            });
        }
    };


    // name edit 
    let handleNameEdit = (e) => {
        setEditName(e.target.value)
    }

    let handlenameEdit = () => {
        updateProfile(auth.currentUser, {
            displayName: editName,
        }).then(() => {
            update(dref(db, 'users/' + auth.currentUser.uid), {
                name: editName
            });
        }).then(() => {
            setProfileInfo(false)
        })
    }

    let handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(userLoginInfo(null))
            localStorage.setItem('userInfo', null)
            navigate('/')
        }).catch((error) => {
            console.log(error)
        });
    }

    let handleChnagepasswod = async () => {
        // const user = auth.currentUser;
        // const newPassword = getASecureRandomPassword();

        // updatePassword(user, newPassword).then(() => {
        //     // Update successful.
        // }).catch((error) => {
        //     // An error ocurred
        //     // ...
        // });
        alert('Password Change Futures is  Comming Soon')




    }

    return (
        <div className='w-full flex  justify-between'>
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
            <ToastContainer />
            <div className='w-[192px] '>
                <Sidebar active="setting" />
            </div>
            {
                passwordChangeModal ?
                    <div className='w-full h-screen bg-[rgba(0,0,0,.4)] flex justify-center items-center  '>
                        <div className='p-5 bg-white '>
                            <div className="p-10 rounded-lg bg-primary inline-block mt-5 transition-all duration-150 ease-linear">
                                <h2 className="font-primary text-lg text-white font-semibold">
                                    Change Your Passowd
                                </h2>
                                <input onChange={(e) => setNewPassword(e.target.value)} className='w-auto p-2 mt-2 block' placeholder='New  Password ' type="text" />

                                <input onChange={(e) => setConfirmPassword(e.target.value)} className='w-auto p-2 mt-2' placeholder='Confirm Passwod ' type="text" />


                                <br />
                                <div className="flex items-center">
                                    <div className='flex items-center'>
                                        {loader
                                            ?
                                            <Rings
                                                height="60"
                                                width="60"
                                                color="#4fa94d"
                                                radius="6"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}
                                                ariaLabel="rings-loading"
                                            />
                                            :

                                            <button
                                                onClick={handleChnagepasswod}
                                                className="px-3 py-2 bg-green-400 text-white font-primary rounded-sm  mt-5"
                                            >
                                                Edit
                                            </button>
                                        }

                                    </div>


                                    <button
                                        onClick={() => setPasswordChangeModal(false)}
                                        className="px-3 py-2 bg-red-400 text-white font-primary rounded-sm  mt-5 ml-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :

                    profileInfo ?
                        <div className='w-full h-screen bg-[rgba(0,0,0,.4)] flex justify-center items-center  '>
                            <div className='p-5 bg-white '>
                                <div className="p-10 rounded-lg bg-primary inline-block mt-5 transition-all duration-150 ease-linear">
                                    <h2 className="font-primary text-lg text-white font-semibold">
                                        Edit Your Profile Name
                                    </h2>
                                    <input onChange={handleNameEdit} className='w-auto p-2 mt-2' placeholder='Enter Your Name ' type="text" />


                                    <br />
                                    <div className="flex items-center">
                                        <div className='flex items-center'>
                                            {loader
                                                ?
                                                <Rings
                                                    height="60"
                                                    width="60"
                                                    color="#4fa94d"
                                                    radius="6"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                    visible={true}
                                                    ariaLabel="rings-loading"
                                                />
                                                :

                                                <button
                                                    onClick={handlenameEdit}
                                                    className="px-3 py-2 bg-green-400 text-white font-primary rounded-sm  mt-5"
                                                >
                                                    Edit
                                                </button>
                                            }

                                        </div>


                                        <button
                                            onClick={() => setProfileInfo(false)}
                                            className="px-3 py-2 bg-red-400 text-white font-primary rounded-sm  mt-5 ml-2"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :



                        profileModal ?
                            <div className='w-full h-screen bg-[rgba(0,0,0,.4)] flex justify-center items-center  '>
                                <div className='p-5 bg-white '>
                                    <div className="p-10 rounded-lg bg-primary inline-block mt-5 transition-all duration-150 ease-linear">
                                        <h2 className="font-primary text-lg text-white font-semibold">
                                            Edit  Your Porfile Photo
                                        </h2>
                                        <input
                                            onChange={onChange}
                                            className="mt-2 text-white font-primary "
                                            type="file"
                                        />
                                        {image
                                            &&
                                            <div className='mx-auto w-[96px] h-[96px] overflow-hidden rounded-full '>
                                                <div
                                                    className="img-preview"
                                                    style={{ width: "100%", float: "left", height: "300px" }}
                                                />
                                            </div>
                                        }

                                        {image &&
                                            <div className='w-[500px] h-full overflow-hidden mt-4  '>
                                                <Cropper
                                                    ref={cropperRef}
                                                    style={{ height: 300, width: "100%" }}
                                                    zoomTo={0.5}
                                                    initialAspectRatio={1}
                                                    preview=".img-preview"
                                                    src={image}
                                                    viewMode={1}
                                                    minCropBoxHeight={10}
                                                    minCropBoxWidth={10}
                                                    background={false}
                                                    responsive={true}
                                                    autoCropArea={1}
                                                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                                    guides={true}
                                                />

                                            </div>

                                        }

                                        <br />
                                        <div className="flex items-center">
                                            <div className='flex items-center'>
                                                {loader
                                                    ?
                                                    <Rings
                                                        height="60"
                                                        width="60"
                                                        color="#4fa94d"
                                                        radius="6"
                                                        wrapperStyle={{}}
                                                        wrapperClass=""
                                                        visible={true}
                                                        ariaLabel="rings-loading"
                                                    />
                                                    :

                                                    <button
                                                        onClick={getCropData}
                                                        className="px-3 py-2 bg-green-400 text-white font-primary rounded-sm  mt-5"
                                                    >
                                                        Upload
                                                    </button>
                                                }

                                            </div>


                                            <button
                                                onClick={() => setProfileModal(false)}
                                                className="px-3 py-2 bg-red-400 text-white font-primary rounded-sm  mt-5 ml-2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className=' w-[86%]  h-[1080px] p-10'>
                                <div className="flex  gap-x-4 ">
                                    <div className='w-[592px]  shadow-lg p-5  rounded-lg'>
                                        <h4 className='font-primary text-lg font-semibold text-primary  '>Profile Setting</h4>
                                        <div className='flex justify-between mt-8 items-center '>
                                            <div className='flex  gap-x-4'>
                                                <img className='w-12 h-12 rounded-full ' src={auth.currentUser && auth.currentUser.photoURL} alt="" />
                                                <div>
                                                    <h3 className='font-primary text-lg text-primary  font-semibold'>
                                                        {auth.currentUser && auth.currentUser.displayName}
                                                    </h3>
                                                    <p className='font-primary text-sm text-[#7A7A7A]  font-normal'>{auth.currentUser && auth.currentUser.email}</p>
                                                </div>

                                            </div>
                                            <button onClick={handleLogout} className='  px-8 py-4 border border-solid border-primary rounded-md text-lg font-primary text-primary hover:bg-primary hover:text-white  ease-in-out duration-200'>Log out</button>

                                        </div>
                                        <div className='border border-solid mt-8'></div>
                                        <div className='mt-8'>
                                            <div className="flex gap-x-4  items-center">
                                                <FiEdit3 className='text-2xl' />
                                                <Link onClick={() => setProfileInfo(true)} className='font-primary text-primary text-lg '>Edit Profile Info</Link>
                                            </div>
                                            <div className="flex gap-x-4  items-center mt-7">
                                                <CgProfile className='text-2xl' />
                                                <Link onClick={() => setProfileModal(true)} className='font-primary text-primary text-lg '>Edit Profile Photo</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-[592px]  shadow-lg p-5  rounded-lg'>
                                        <h4 className='font-primary text-lg font-semibold text-primary  '>Account Setting</h4>
                                        <div className='flex justify-between mt-8 items-center '>


                                        </div>
                                        <div className='mt-8'>
                                            <div className="flex gap-x-4  items-center">
                                                <HiKey className='text-2xl' />
                                                <Link onClick={() => setPasswordChangeModal(true)} className='font-primary text-primary text-lg '>Change Password</Link>
                                            </div>
                                            <div className="flex gap-x-4  items-center mt-7">
                                                <BsFillSunFill className='text-2xl' />
                                                <h4 className='font-primary text-primary text-lg '>Theme</h4>
                                            </div>
                                            <div className="flex gap-x-4  items-center mt-7">
                                                <AiFillDelete className='text-2xl' />
                                                <h4 className='font-primary text-primary text-lg '>Delete Account</h4>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

            }

        </div>
    )
}

export default Setting