import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeFromPaste(pasteId));
  }

  return (
    <div>
      <input
      className='p-2 rounded-2xl min-w-[600px] mt-5 bg-gray-900 '
      type="search"
      placeholder='Search Here!!'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5' >
          {
            filteredData.length > 0 && 
            filteredData.map(
              (paste) => {
                return(
                  <div className='border'>
                     <div>
                       {paste.title}
                     </div>
                     <div>
                      {paste.content}
                     </div>
                     <div className='flex flex-row gap-4 place-content-evenly' >
                      <button>
                        <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                      </button>
                      <button><a href={`/pastes/${paste?._id}`}>View</a></button>
                      <button onClick={()=> handleDelete(paste?._id)} >Delete</button>
                      <button onClick={()=>{
                        navigator.clipboard.writeText(paste?.content)
                        toast.success("Copied!")
                      }}
                      >Copy</button>
                      {/* khudse */}
                      <button
                      onClick={() => {
                        const shareUrl = `${window.location.origin}/paste/${paste._id}`;
                        if(navigator.share) {
                          navigator
                          .share({
                            title: paste.title,
                            text: paste.content,
                            url: shareUrl,
                          })
                          .then(() =>{
                            console.log("shared succesfully!");
                          })
                          .catch((err) => {
                            console.error("error sharing", err);
                          });
                        } else {
                          toast.error("Sharing Not supported on This Device")
                        }
                      }}
                      >
                      Share
                      </button>
                     </div>
                     <div>
                      {new Date(paste.createdAt).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                     </div>
                  </div>
                )
              }
                
            )
          }
      </div>


    </div>
  )
}

export default Paste
