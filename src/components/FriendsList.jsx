import React,{useState,useEffect} from 'react'
import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { getDatabase, ref , onValue,set, push, remove} from "firebase/database";
import { useSelector ,useDispatch} from "react-redux";
import { activeChatInfo } from '../slices/chatSlice';

const FriendsList = () => {
  let dispatch= useDispatch()
  const db = getDatabase();
  let data = useSelector((state) => state.userLogininfo.userInfo)
  let [friendList,setFriendList]=useState([])
  let [friendSearchList,setFriendSearchList]=useState([])


  
   
  useEffect(() => {
    const friendRef = ref(db, 'friend/');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if(data.uid==item.val().senderid ||data.uid==item.val().reciverid){
          arr.push({ ...item.val(), id: item.key })

        }
      })
      setFriendList(arr)
    });
  },[])

  let handleBlock=(item)=>{
    if(data.uid==item.senderid){
      set(push(ref(db, 'block/')), {
       block:item.recivername,
       blockid:item.reciverid,
       blockimg:item.reciverimg,
       blockemail:item.reciveremail,
       blockby:item.sendername,
       blockbyid:item.senderid,
       blockbyimg:item.senderimg,
       blockbyemail:item.senderemail,
      }).then(()=>{
        remove(ref(db, 'friend/'+item.id))
      })

    }else if(data.uid==item.reciverid){
      set(push(ref(db, 'block/')), {
        blockby:item.recivername,
        blockbyid:item.reciverid,
        blockbyimg:item.reciverimg,
        blockbyemail:item.reciveremail,
        block:item.sendername,
        blockid:item.senderid,
        blockimg:item.senderimg,
        blockemail:item.sernderemail
       }).then(()=>{
         remove(ref(db, 'friend/'+item.id))
       })
    }
  }

  let handleFriendInfo=(item)=>{
      if(data.uid==item.senderid){
        dispatch(activeChatInfo({
          name:item.recivername,id:item.reciverid,img:item.reciverimg,status:"single",
        }))
        localStorage.setItem('activeChat',JSON.stringify({
          name:item.recivername,id:item.reciverid,img:item.reciverimg,status:"single",
        }))
      }else{
        dispatch(activeChatInfo({
          name:item.sendername,id:item.senderid,img:item.senderimg,status:"single"
        }))
        localStorage.setItem('activeChat',JSON.stringify({
          name:item.sendername,id:item.senderid,img:item.senderimg,status:"single"
        }))
      }
  }

  let handleSearch=(e)=>{
    let arr=[]
    if(e.target.value.length==0){
      setFriendSearchList([])
    }else{
      friendList.filter((item)=>{
        if(item.sendername){
          if(item.sendername.toLowerCase().includes(e.target.value.toLowerCase())){
            arr.push(item)
          }
        }else{
          if(item.recivername.toLowerCase().includes(e.target.value.toLowerCase())){
            arr.push(item)
          }
        }
        setFriendSearchList(arr)
      })
    }
  }

 
  return (
    <div>
      <div className="flex justify-between items-center ">
        <h1 className="font-primary text-black text-2xl font-semibold">
          Friend
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
        {
          friendSearchList.length >0
          ?
          friendSearchList.map((item)=>(
          <div onClick={()=>handleFriendInfo(item)}  className="flex  items-center mt-5">
          {data.uid==item.senderid
          ?
          <img
          className="w-12 h-12 rounded-full"
          src={item.reciverimg}
          alt=""
        />
          :
          <img
          className="w-12 h-12 rounded-full"
          src={item.senderimg}
          alt=""
        />
          }
      
          {data.uid==item.senderid
          ?
          <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
          {item.recivername}
         </h4>
          :
          <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
           {item.sendername}
          </h4>
          }
       

          <button onClick={()=>handleBlock(item)} className="ml-auto font-lg font-normal text-primary">
            block
          </button>

      
        </div>

          ))
          : friendList.length ==0?
          <h1 className='w-full bg-red-500 p-2 text-white font-primary '>No Friend  available </h1>
          :
        
        friendList.map((item)=>(
        <div onClick={()=>handleFriendInfo(item)}  className="flex  items-center mt-5">
          {data.uid==item.senderid
          ?
          <img
          className="w-12 h-12 rounded-full"
          src={item.reciverimg}
          alt=""
        />
          :
          <img
          className="w-12 h-12 rounded-full"
          src={item.senderimg}
          alt=""
        />
          }
      
          {data.uid==item.senderid
          ?
          <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
          {item.recivername}
         </h4>
          :
          <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
           {item.sendername}
          </h4>
          }
       

          <button onClick={()=>handleBlock(item)} className="ml-auto font-lg font-normal text-primary">
            block
          </button>

      
        </div>

        ))}
        
      </div>
    </div>
  )
}

export default FriendsList