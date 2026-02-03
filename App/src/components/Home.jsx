import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import Paste from './Paste';

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [SearchParams, setSearchParams] = useSearchParams();
  const pasteId = SearchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
      if( pasteId && allPastes?.length > 0 ) {
        const paste = allPastes.find((p) => (p._id) === (pasteId));
        if(paste) {
          setTitle(paste.title || "");
        setValue(paste.content || "");
        }
      }
      
      
    }, [pasteId, allPastes])


  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
      
    }
    
    if(pasteId) {
      //update
      dispatch(updateToPastes(paste));
    }
    else {
      //create
      dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});

  }

  return (
   <div>
     <div className='flex flex-row gap-7 place-content-between'>
      <input
      className='p-2 rounded-2xl bg-gray-900 mt-2 w-[66%] pl-5'
       type="text" 
       placeholder='Enter Title Here'
      value={title}
      onChange={(e)=> setTitle(e.target.value)}
      />

      <button onClick={createPaste} className='p-2 rounded-2xl bg-gray-900 mt-2' >
      {  pasteId ? "Update My Paste" : "Create My Paste" }
      </button>
    </div>
    <div>
      <textarea
        className=' rounded-2xl mt-4 min-w-[500px] p-4 bg-gray-900 '
        value={value}
        placeholder='Enter content here!!'
        onChange={(e)=> setValue(e.target.value)}
        rows={20}
      />
    </div>

   </div>
  )
}

export default Home
