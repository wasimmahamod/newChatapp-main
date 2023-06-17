import React from 'react';
import Sidebar from '../components/Sidebar';
import PeopleList from '../components/PeopleList';

const People = () => {
  return (
    <div className='flex '>
    <div className='w-[192px] '>
        <Sidebar active="people"/>
    </div>
    <div className='pl-6 pt-[50px] w-[424px] '>
      <PeopleList/>
    </div>
</div>
  );
};

export default People;