import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useSelector,useDispatch } from 'react-redux';
import { activeChatInfo } from '../slices/chatSlice';

const GroupList = () => {
  let dispatch=useDispatch()
  const db = getDatabase();
  let [groupList, setGroupList] = useState([])
  let [groupSearchList, setGroupSearchList] = useState([])
  let [groupname, setGroupName] = useState('')
  let [grouptag, setGrouptag] = useState('')
  let [createGroupModal, setCreateGroupModal] = useState(false)

  let data = useSelector((state) => state.userLogininfo.userInfo)


  let handleCreateGroup = () => {
    set(push(ref(db, 'group/')), {
      groupname: groupname,
      grouptag: grouptag,
      admin: data.displayName,
      adminid: data.uid
    }).then(() => {
      setCreateGroupModal(false)
    })
  }

  useEffect(() => {
    const groupListRef = ref(db, 'group/');
    onValue(groupListRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key })
      })
      setGroupList(arr)
    });
  }, [])

  let handleGroupInfo=(item)=>{
    console.log(item)
      dispatch(activeChatInfo({
      name:item.groupname,grouptag:item.grouptag,id:item.id,status:"group",adminid:item.adminid,
      }))
      localStorage.setItem('activeChat',JSON.stringify({
       name:item.groupname,grouptag:item.grouptag,id:item.id,status:"group",adminid:item.adminid,
      }))
  }

  let handleSearch=(e)=>{
    let arr= []
    if(e.target.value.length==0){
      setGroupSearchList([])
    }else{
      groupList.filter((item)=>{
        if(item.groupname.toLowerCase().includes(e.target.value.toLowerCase())){
          arr.push(item)
        }
        setGroupSearchList(arr)
      })
    }
  }
  return (
    <div className='relative '>
      <div className="flex justify-between items-center ">
        <h1 className="font-primary text-black text-2xl font-semibold">
          GroupList
        </h1>

        <BsThreeDotsVertical onClick={() => setCreateGroupModal(!createGroupModal)} className="text-2xl" />

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
        {groupSearchList.length >0?
        groupSearchList.map((item)=>(
          <div onClick={()=>handleGroupInfo(item)} className="flex  items-center mt-5">
            <img
              className="w-12 h-12 rounded-full"
              src="images/profile.png"
              alt=""
            />
            <div>

              <p className="ml-4 text-sm font-primary font-normal text-[#222222]">Admin:
                {item.admin}
              </p>
              <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
                {item.groupname}
              </h4>
              <p className="ml-4 text-sm font-primary font-normal text-[#222222]">
                {item.grouptag}
              </p>

            </div>


            <button className="ml-auto font-lg font-normal text-primary">
              Chat
            </button>


          </div>
        ))
        :
        groupList.length==0?
        <h1 className='w-full bg-red-500 p-2 text-white font-primary '>No Group available </h1>
        :
        groupList.map((item) => (
          <div onClick={()=>handleGroupInfo(item)} className="flex  items-center mt-5">
            <img
              className="w-12 h-12 rounded-full"
              src="images/profile.png"
              alt=""
            />
            <div>

              <p className="ml-4 text-sm font-primary font-normal text-[#222222]">Admin:
                {item.admin}
              </p>
              <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
                {item.groupname}
              </h4>
              <p className="ml-4 text-sm font-primary font-normal text-[#222222]">
                {item.grouptag}
              </p>

            </div>


            <button className="ml-auto font-lg font-normal text-primary">
              Chat
            </button>


          </div>
        ))}

      </div>

      {createGroupModal &&
        <div className='absolute top-12 w-full h-[400px] bg-[rgba(0,0,0,.4)] p-2 '>
          <div className='bg-white w-full h-full p-4 '>
            <h3 className='text-center font-primary text-primary text-lg font-bold pt-4'>Create Your Group </h3>
            <input onChange={(e) => setGroupName(e.target.value)} className=' placeholder:font-primary border border-solid  mt-4  p-2 w-full' type="text" placeholder='Enter Your Group Name ' />
            <input onChange={(e) => setGrouptag(e.target.value)} className=' placeholder:font-primary border border-solid  mt-4  p-2 w-full' type="text" placeholder='Enter Your Group Tag ' />

            <button onClick={handleCreateGroup} className='font-primary text-md font-normal bg-primary text-white py-2 px-3 mt-4'>Submit</button>
          </div>
        </div>
      }
    </div>
  );
};

export default GroupList;