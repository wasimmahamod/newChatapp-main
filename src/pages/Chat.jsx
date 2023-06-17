import React from 'react';
import GroupList from '../components/GroupList';
import Sidebar from '../components/Sidebar';
import ChatList from '../components/ChatList';
import ChatMsg from './../components/ChatMsg';
import FriendsList from './../components/FriendsList';

const Chat = () => {
    return (
        <div className='flex ' >
        <div className='w-[192px] '>
            <Sidebar active="chat"/>
        </div>
        <div className='pl-6 pt-[50px] w-[424px] mr-4'>
        <FriendsList/>
        </div>
        <div className='pl-3 pt-[50px]  border-l border-solid w-[784px] h-[1080px]'>
            <ChatMsg/>
        </div>
    </div>
    );
};

export default Chat;