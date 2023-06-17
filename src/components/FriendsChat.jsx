import React, { useEffect, useRef, useState, createRef } from "react";
import { IoMdCall } from "react-icons/io";
import { MdOutlineVideoCall } from "react-icons/md";
import { BsThreeDotsVertical, BsMic } from "react-icons/bs";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { GrGallery } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";
import { Link } from "react-router-dom";
import Cropper from "react-cropper";
import ModalImage from "react-modal-image";
import { getAuth, } from "firebase/auth";
import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
} from "firebase/storage";

import { useSelector } from "react-redux";
import { getDatabase, ref as dref, set, push, onValue } from "firebase/database";
import moment from "moment/moment";
import ScrollToBottom from 'react-scroll-to-bottom';
import { Rings } from 'react-loader-spinner'
import aleaRNGFactory from "number-generator/lib/aleaRNGFactory";

const FriendsChat = () => {
    const storage = getStorage();
    const db = getDatabase();
    const auth = getAuth();
    let data = useSelector((state) => state.userLogininfo.userInfo)
    let chatData = useSelector((state) => state.activeChatInfo.chat)
    let [msg, setMsg] = useState('')
    let [settingShow, setSettingShow] = useState(false)
    let [imgsendShow, setImgSendShow] = useState(false)
    let [singleMsgList, setSingleMsgList] = useState([])
    let [loader,setLoader]=useState(false)
    //send img 
    const [image, setImage] = useState(); 
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();

    const generator2 = aleaRNGFactory(Date.now());
    let randomnumber= generator2.uInt32()
    // msg img send 
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

    const getCropData = () => {
        setLoader(true)
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
            const storageRef = ref(storage, auth.currentUser.uid+randomnumber);
            const message4 = cropperRef.current?.cropper
                .getCroppedCanvas()
                .toDataURL();
            uploadString(storageRef, message4, "data_url").then((snapshot) => {
                getDownloadURL(storageRef).then((downloadURL) => {
                    set(push(dref(db, 'singlemsg/')), {
                        whosendid: data.uid,
                        whosendname: data.displayName,
                        whosendimg: data.photoURL,
                        whoreciveid: chatData.id,
                        whorecivename: chatData.name,
                        whoreciveimg: chatData.img,
                        img: downloadURL,
                        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()} ${new Date().getMinutes()}`
                    }).then(()=>{
                        setImgSendShow(false)
                        setImage('')
                        setCropData('')
                    })

                });
            });
        }
    };

    // msg send 
    let handleMsg = (e) => {
        setMsg(e.target.value)
    }
    let handlemsgSend = (e) => {
        if (!msg) {
            alert('Please write something')
        } else {
            set(push(dref(db, 'singlemsg/')), {
                whosendid: data.uid,
                whosendname: data.displayName,
                whosendimg: data.photoURL,
                whoreciveid: chatData.id,
                whorecivename: chatData.name,
                whoreciveimg: chatData.img,
                msg: msg,
                date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()} ${new Date().getMinutes()}`
            }).then(() => {
                setMsg('')
            })
        }
    }

    useEffect(() => {
        const singMsgRef = dref(db, 'singlemsg/');
        onValue(singMsgRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (data.uid == item.val().whosendid && chatData.id == item.val().whoreciveid || data.uid == item.val().whoreciveid && chatData.id == item.val().whosendid) {
                    arr.push(item.val())

                }
            })
            setSingleMsgList(arr)
        });
    }, [chatData && chatData.id])


    let handleKeypress=(e)=>{
        if(e.key=="Enter"){
            set(push(dref(db, 'singlemsg/')), {
                whosendid: data.uid,
                whosendname: data.displayName,
                whosendimg: data.photoURL,
                whoreciveid: chatData.id,
                whorecivename: chatData.name,
                whoreciveimg: chatData.img,
                msg: msg,
                date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()} ${new Date().getMinutes()}`
            }).then(() => {
                setMsg('')
            })
        }
    }
    return (
        <div className=" ">
            <div className="relative">
                <div className="flex  items-center ">
                    {chatData &&
                        chatData.img ?
                        <img
                            className="w-12 h-12 rounded-full"
                            src={chatData.img}
                            alt=""
                        />
                        :
                        <img
                            className="w-12 h-12 rounded-full"
                            src="images/profile.png"
                            alt=""
                        />
                    }
                    {chatData && chatData.name
                        ?
                        <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
                            {chatData.name}
                        </h4>
                        :
                        <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
                            Select Friend
                        </h4>
                    }
                    <div className="ml-auto flex gap-x-3 ">
                        <IoMdCall className="text-2xl" />
                        <MdOutlineVideoCall className="text-2xl" />
                        <div >
                            <BsThreeDotsVertical onClick={() => setSettingShow(!setSettingShow)} className="text-2xl" />
                            {settingShow &&
                                <div className="w-[220px] absolute top-14 right-0">
                                    <Link className="font-primary bg-white text-lg font-normal p-3 hover:bg-[#EBEBEF] ease-in-out duration-200 rounded-md block ">Mute Notification</Link>
                                    <Link className="font-primary bg-white text-lg font-normal p-3 hover:bg-[#EBEBEF] ease-in-out duration-200 rounded-md block ">Media & File</Link>
                                    <Link className="font-primary bg-white text-lg font-normal p-3 hover:bg-[#EBEBEF] ease-in-out duration-200 rounded-md block ">Ignore Group</Link>
                                    <Link className="font-primary bg-white text-lg font-normal p-3 hover:bg-[#EBEBEF] ease-in-out duration-200 rounded-md block ">Leave Group</Link>
                                    <Link className="font-primary bg-white text-lg font-normal p-3 hover:bg-[#EBEBEF] ease-in-out duration-200 rounded-md block ">Delete Conversation</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>


            </div>
            <ScrollToBottom className="w-full h-[900px]   mt-5 ">
                {chatData && chatData.status == 'single' ?
                    singleMsgList.map((item) => (
                        item.whosendid == data.uid ?
                            item.msg ?
                                <div className="text-right mr-5">
                                    <h4 className="py-2 px-7 bg-[#E9E9E9] inline-block rounded-md mt-4">{item.msg}</h4>
                                    <p className="font-primary text-xs mt-1 font-normal ">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                                </div>
                                :
                                <div className="flex justify-end mr-5 mt-4 text-right">
                                    <div>
                                    <div className="w-[200px] h-[200px] p-2 bg-[#E9E9E9] rounded-lg ">
                                        <ModalImage
                                            small={item.img}
                                            large={item.img}
                                            alt="Hello World!"
                                        />
                                    </div>
                                           <p className="font-primary text-xs mt-1 font-normal ">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>

                                    </div>

                                </div>
                            : item.msg
                                ?

                                <div>
                                    <h4 className="py-2 px-7 bg-[#E9E9E9] inline-block rounded-md mt-5">{item.msg}</h4>
                                    <p className="font-primary text-xs mt-1 font-normal ">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                                </div>
                                :
                                <div className="flex  mr-5 mt-4 ">
                                    <div>
                                    <div className="w-[200px] h-[200px] p-2 bg-[#E9E9E9] rounded-lg ">
                                    <ModalImage
                                            small={item.img}
                                            large={item.img}
                                            alt="Hello World!"
                                        />
                                    </div>
                                        <p className="font-primary text-xs mt-1 font-normal ">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>

                                    </div>

                                </div>

                    ))
                    :

                    <h1>ami group msg </h1>
                }



            </ScrollToBottom>
            {/* msg box input */}
            <div className="mt-4 relative">
                <input onChange={handleMsg} onKeyUp={handleKeypress} className="w-full py-[14px] pl-3 pr-36 rounded-md" type="text" placeholder="Text Here " value={msg} />
                <div className="absolute top-3 right-0 z-50">
                    <div className="flex gap-x-3   text-2xl">
                        <HiOutlineEmojiHappy />
                        <GrGallery onClick={() => setImgSendShow(!imgsendShow)} />
                        <BsMic />
                        <AiOutlineSend onClick={handlemsgSend} />
                    </div>

                </div>
                {imgsendShow &&
                    <div className="w-full   bg-[rgba(0,0,0,.4)] absolute bottom-14 left-[-15px] p-5 ease-in-out duration-300 ">
                        <div className=" w-full p-10 rounded-lg bg-primary inline-block mt-5 transition-all duration-700 ease-linear">
                            <h2 className="font-primary text-lg text-white font-semibold">
                                Send Profile Photo
                            </h2>
                            <input
                                onChange={onChange}
                                className="mt-2 text-white font-primary "
                                type="file"
                            />
                            {image && (
                                <div className="w-[96px] h-[96px] rounded-full overflow-hidden mx-auto">
                                    <div
                                        className="img-preview"
                                        style={{ width: "100%", float: "left", height: "300px" }}
                                    />
                                </div>
                            )}
                            {image && (
                                <div className="w-[300px] mt-3">
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
                            )}

                            <br />
                            <div className="flex items-center">

                            <div>
                                    {loader
                                    ?
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
                                <button
                                    onClick={getCropData}
                                    className="px-3 py-2 bg-green-400 text-white font-primary rounded-sm  mt-5"
                                >
                                    Send
                                </button>
                                  }
                                </div>

                                <button
                                    onClick={() => setImgSendShow(false)}
                                    className="px-3 py-2 bg-red-400 text-white font-primary rounded-sm  mt-5 ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {/* msg box input end */}

        </div>
    );
};

export default FriendsChat;
