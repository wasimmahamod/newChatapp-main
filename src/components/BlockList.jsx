import React, { useEffect ,useState} from 'react';
import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { getDatabase, ref, onValue,set, push, remove} from "firebase/database";
import { useSelector } from "react-redux";

const BlockList = () => {

  const db = getDatabase();
  let data = useSelector((item)=>item.userLogininfo.userInfo)
  let [blockList,setBlockList]=useState([])

  useEffect(() => {
    const blockRef = ref(db, 'block/');
    onValue(blockRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
    if(data.uid==item.val().blockid ||data.uid==item.val().blockbyid){
      arr.push({ ...item.val(), id: item.key })

    }
      })
      setBlockList(arr)
    });
  },[])

  let handleUnblock=(item)=>{
    set(push(ref(db, 'friend/' )), {
      sendername:item.block,
      senderid:item.blockid,
      senderimg:item.blockimg,
      sernderemail:item.blockemail,
      recivername:data.displayName,
      reciverid:data.uid,
      reciveremail:data.email,
      reciverimg:data.photoURL ,
    }).then(()=>{
      remove(ref(db, 'block/'+item.id))
    })
  }
    return (
      <div>
      <div className="flex justify-between items-center ">
        <h1 className="font-primary text-black text-2xl font-semibold">
         BlockList
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
        {blockList.length==0?
         <h1 className='w-full bg-red-500 p-2 text-white font-primary '>No Block user available </h1>
         :
        
        blockList.map((item)=>(
        <div  className="flex  items-center mt-5">
          {data.uid==item.blockid
          ?
          <img
          className="w-12 h-12 rounded-full"
          src={item.blockbyimg}
          alt=""
        />
          :
          <img
            className="w-12 h-12 rounded-full"
            src={item.blockimg}
            alt=""
          />
          }
          <div>
          {data.uid==item.blockid?
          <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
           {item.blockby}
          </h4>
          :
          <h4 className="ml-4 text-lg font-primary font-semibold text-[#222222]">
          {item.block}
         </h4>
        }
        {data.uid==item.blockid
        ?
        <h5 className="ml-4 text-sm font-primary font-normal text-[#222222]">
        {item.blockemail}
       </h5>
        :
        <h5 className="ml-4 text-sm font-primary font-normal text-[#222222]">
        {item.blockbyemail}
       </h5>
        }

          </div>
       
        {data.uid==item.blockbyid
        &&
          <button onClick={()=>handleUnblock(item)} className="ml-auto font-lg font-normal text-primary">
            Unblock
          </button>
        }

      
        </div>

        ))}
        
      </div>
    </div>
    );
};

export default BlockList;