import React,{useState,useEffect} from 'react';
import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { getDatabase, ref, onValue,set, push, remove} from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const db = getDatabase();
  let [friendRequestList, setFriendRequestList] = useState([])
  let data = useSelector((item)=>item.userLogininfo.userInfo)

  
  useEffect(() => {
    const friendRequestRef = ref(db, 'friendrequrest/');
    onValue(friendRequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if(data.uid==item.val().reciverid){
          arr.push({ ...item.val(), id: item.key })

        }

      })
      setFriendRequestList(arr)
    });
  },[])

  let handleFriend=(item)=>{
    set(push(ref(db, 'friend/' )), {
      ...item
    }).then(()=>{
      remove(ref(db, 'friendrequrest/'+item.id))
    })
  }

    return (
      <div>
      <div className="flex justify-between items-center ">
        <h1 className="font-primary text-black text-2xl font-semibold">
          Friend Request
        </h1>
        <BsThreeDotsVertical className="text-2xl" />
      </div>
      <div className=" relative mt-6">
        <input
          className="w-full py-3 pl-14 border border-solid border-[#D3D3D3] rounded-md  placeholder:text-sm placeholder:font-primary "
          type="text"
          placeholder="Search"
        />
        <BsSearch className="absolute top-4 left-4" />
      </div>
      <div>
        {
          friendRequestList.length ==0
          ?
          <h1 className='w-full bg-red-500 p-2 text-white font-primary '>No Friend request Send available </h1>
          :
        
        friendRequestList.map((item)=>(
        <div  className="flex  items-center mt-5">
          {data.uid==item.reciverid?
           <img
           className="w-12 h-12 rounded-full"
           src={item.senderimg}
           alt=""
         />
          :
          <img
          className="w-12 h-12 rounded-full"
          src={item.reciverimg}
          alt=""
        />
          }
         
          {data.uid==item.reciverid 
          ?
          <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
           {item.sendername}
          </h4>
       
        :
        <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
        {item.recivername}
       </h4>
    
        }

          <button onClick={()=>handleFriend(item)} className="ml-auto font-lg font-normal text-primary">
            Accept
          </button>

      
        </div>

        ))}
        
      </div>
    </div>
    );
};

export default FriendRequest;