import React from 'react';
import Sidebar from '../components/Sidebar';
import GroupList from '../components/GroupList';
import GroupChat from '../components/GroupChat';

const Group = () => {
    return (
        <div className='flex ' >
    <div className='w-[192px] '>
        <Sidebar active="group"/>
    </div>
    <div className='pl-6 pt-[50px] w-[424px] mr-4'>
    <GroupList/>
    </div>
    <div className='pl-3 pt-[50px]  border-l border-solid w-[784px] h-[1080px]'>
            <GroupChat/>
        </div>
</div>
    );
};

export default Group;