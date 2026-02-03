import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import Paste from './Paste';

const ViewPaste = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
      <input
      className='p-2 rounded-2xl bg-gray-900 mt-2 w-[66%] pl-5'
       type="text" 
       disabled
       placeholder='Enter Title Here'
      value={paste.title}
      onChange={(e)=> setTitle(e.target.value)}
      />

      {/* <button onClick={createPaste} className='p-2 rounded-2xl bg-gray-900 mt-2' >
      {  pasteId ? "Update My Paste" : "Create My Paste" }
      disa
      </button> */}
    </div>
    <div>
      <textarea
        className=' rounded-2xl mt-4 min-w-[500px] p-4 bg-gray-900 '
        value={paste.content}
        placeholder='Enter content here!!'
        onChange={(e)=> setValue(e.target.value)}
        rows={20}
        disabled
      />
    </div>
  
      </div>
  )
}

export default ViewPaste
