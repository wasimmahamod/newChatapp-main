import React from 'react'
import Sidebar from '../components/Sidebar'
import FriendsList from '../components/FriendsList'
import FriendChat from '../components/FriendsChat'


const Friends = () => {
  return (
    <div className='flex ' >
    <div className='w-[192px] '>
        <Sidebar active="friend"/>
    </div>
    <div className='pl-6 pt-[50px] w-[424px] mr-4'>
    <FriendsList/>
    </div>
    <div className='pl-3 pt-[50px]  border-l border-solid w-[784px] h-[1080px]'>
            <FriendChat/>
        </div>
</div>
  )
}

export default Friends