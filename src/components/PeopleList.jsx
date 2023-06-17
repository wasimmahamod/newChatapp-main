import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { useSelector } from "react-redux";
const PeopleList = () => {
  const db = getDatabase();
  let [userList, setUserList] = useState([])
  let [friendRequresList, setFriendRequestList] = useState([])
  let [blockList, setBlockList] = useState([])
  let [friendList, setFriendList] = useState([])
  let [userFilterList, setUserFilterList] = useState([])
  let data = useSelector((item)=>item.userLogininfo.userInfo)

  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if(data.uid!=item.key){
          arr.push({ ...item.val(), id: item.key })

        }
      })
      setUserList(arr)
    });
  },[])
  useEffect(() => {
    const friendRequrestRef = ref(db, 'friendrequrest/');
    onValue(friendRequrestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
          arr.push(item.val().reciverid+item.val().senderid)
      })
      setFriendRequestList(arr)
    });
  },[])
  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
          arr.push(item.val().reciverid+item.val().senderid)
      })
      setFriendList(arr)
    });
  },[])
  useEffect(() => {
    const blockRef = ref(db, 'block/');
    onValue(blockRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
          arr.push(item.val().blockbyid+item.val().blockid)
      })
      setBlockList(arr)
    });
  },[])

  let handleFriendRequest=(item)=>{
    set(push(ref(db, 'friendrequrest/')), {
      sendername:data.displayName,
      senderid:data.uid,
      senderemail:data.email,
      senderimg:data.photoURL,
      recivername:item.name,
      reciverid:item.id,
      reciveremail:item.email,
      reciverimg:item.img,
    });
  }

  let handleSearch=(e)=>{
    console.log(e.target.value)

    let arr=[]
    if(e.target.value.length==0){
      setUserFilterList([])
    }else{
      userList.filter((item)=>{
        if(item.name.toLowerCase().includes(e.target.value.toLowerCase())){
          arr.push(item)
        }
        setUserFilterList(arr)
      })
    }
  }
  return (
    <div>
      <div className="flex justify-between items-center ">
        <h1 className="font-primary text-black text-2xl font-semibold">
          People
        </h1>
        <BsThreeDotsVertical className="text-2xl" />
      </div>
      <div className=" relative mt-6">
        <input onChange={handleSearch}
          className="w-full py-3 pl-14 border border-solid border-[#D3D3D3] rounded-md  placeholder:text-sm placeholder:font-primary "
          type="text"
          placeholder="Search"
        />
        <BsSearch className="absolute top-4 left-4" />
      </div>
      <div>
        {userFilterList.length >0 ?
        userFilterList.map((item,index)=>(
          <div key={index} className="flex  items-center mt-5">
          <img
            className="w-12 h-12 rounded-full"
            src={item.img}
            alt=""
          />
          <div>
          <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
            {item.name}
          </h4>
          <h5 className="ml-4 text-sm font-primary font-normal text-[#222222]">
            {item.email}
          </h5>

          </div>

          {
          blockList.includes(data.uid+item.id)||blockList.includes(item.id+data.uid)
          ?
          <button  className="ml-auto font-lg font-normal text-primary">
          B
        </button>
          :

          friendList.includes(data.uid+item.id)||friendList.includes(item.id+data.uid)
          ?
          <button  className="ml-auto font-lg font-normal text-primary">
          F
        </button>
          :
          friendRequresList.includes(data.uid+item.id)||friendRequresList.includes(item.id+data.uid)
          ?
          <button  className="ml-auto font-lg font-normal text-primary">
            R
          </button>
          :
          <button onClick={()=>handleFriendRequest(item)} className="ml-auto font-lg font-normal text-primary">
            Add
          </button>
          }


        </div>
        ))
        : 
        userList.length==0?
        <h1 className='w-full bg-red-500 p-2 text-white font-primary '>No User List available </h1>
        :
        userList.map((item,index)=>(
        <div key={index} className="flex  items-center mt-5">
          <img
            className="w-12 h-12 rounded-full"
            src={item.img}
            alt=""
          />
          <div>
          <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
            {item.name}
          </h4>
          <h5 className="ml-4 text-sm font-primary font-normal text-[#222222]">
            {item.email}
          </h5>

          </div>

          {
          blockList.includes(data.uid+item.id)||blockList.includes(item.id+data.uid)
          ?
          <button  className="ml-auto font-lg font-normal text-primary">
          B
        </button>
          :

          friendList.includes(data.uid+item.id)||friendList.includes(item.id+data.uid)
          ?
          <button  className="ml-auto font-lg font-normal text-primary">
          F
        </button>
          :
          friendRequresList.includes(data.uid+item.id)||friendRequresList.includes(item.id+data.uid)
          ?
          <button  className="ml-auto font-lg font-normal text-primary">
            R
          </button>
          :
          <button onClick={()=>handleFriendRequest(item)} className="ml-auto font-lg font-normal text-primary">
            Add
          </button>
          }


        </div>

        ))}

      </div>
    </div>
  );
};

export default PeopleList;
