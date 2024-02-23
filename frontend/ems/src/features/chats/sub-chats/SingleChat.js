import {useDispatch} from 'react-redux'
import {formatDistanceToNow} from 'date-fns'

// global constants
import {
  BASE_URL,
} from '../../../config'

// actions from slices
// messages
import {
  deleteMessage,
} from '../../messages/messagesSlice'

// icons
import { MdDelete } from "react-icons/md"
import { CiSaveDown1 } from "react-icons/ci"

// get username
import GetUsername from '../../users/sub-users/GetUsername'
// get profile
import GetProfile from '../../profiles/sub-profiles/GetProfile'

// main
// SingleMessage
const SingleChat = ({isOwn,message}) => {
    // hooks
    const dispatch = useDispatch()

  return (
    <>
    {
      isOwn 
      ?
      <div className='m-1 mb-3 text-xs font-serif flex justify-end'>
        <div className='max-w-[75%]'>
          {/* message */}
          <div className='p-2 rounded-sm mr-5 self-end flex flex-col items-end'>
            {
              message.files 
              ?
              <>
              {
                message.files.map((file,index)=>(
                  <div key={index}> 
                    {
                      file.split('\\')[5] === 'image'
                      ?
                      <img src={`${BASE_URL}/${file}`} className='mb-1 h-[200px]'/>
                      :
                      file.split('\\')[5] === 'audio'
                      ?
                      <audio controls className='mb-1'>
                        <source src={`${BASE_URL}/${file}`}/>
                      </audio> 
                      :
                      file.split('\\')[5] === 'video'
                      ?
                      <video controls className='mb-1 h-[200px]'>
                        <source src={`${BASE_URL}/${file}`}/>
                      </video>
                      :
                      file.split('\\')[5] === 'application'
                      ?
                      <div>
                        <a href={`${BASE_URL}/${file}`} download={true} className='mb-1 flex items-center px-3 py-1 bg-black bg-opacity-[.13] rounded-sm text-emerald-700'>
                          <span>download document </span>
                          <CiSaveDown1 className='ml-3 text-xl'/>
                        </a>
                      </div>
                      :
                      <></>
                    }
                  </div>
                ))
              }
              </>
              :
              <></>
            }
            {
              message.message 
              ?
              <p className='bg-black bg-opacity-[.13] px-3 py-1 rounded-sm'>
                {message.message}
              </p>
              :
              <></>
            }
          </div>
          {/* controllers */}
          <div className='flex items-center justify-end py-1 mt-1'>
            {
              false
              ?
              <div className='w-[18px] h-[18px] border-2 border-emerald-950 rounded-full border-r-transparent animate-spin mr-3'></div>
              :
              <button 
                className='text-xl mr-3 opacity-[.13] hover:opacity-[.85]' 
                onClick={()=>{
                  dispatch(deleteMessage(message._id))
                }}
              >
                <MdDelete />
              </button>
            }
            <span>
            {formatDistanceToNow(new Date(message.createdAt),{addSuffix: true})}
            </span>
            {/* name profile */}
            <div className='flex items-center ml-3'>
              <span className='mx-1'>
                <GetUsername userId={message.senderId}/>
              </span>
              <GetProfile userId={message.senderId}/>
            </div>
          </div>
        </div>
      </div>
      :
      <div className='m-1 mb-3 text-xs font-serif'>
          {/* message */}
          <div className='ml-5 max-w-[75%] text-gray-200 p-2 rounded-sm'>
            {
              message.files 
              ?
              <>
              {
                message.files.map((file,index)=>(
                  <div key={index}> 
                    {
                      file.split('\\')[5] === 'image'
                      ?
                      <img src={`${BASE_URL}/${file}`} className='mb-1 h-[230px]'/>
                      :
                      file.split('\\')[5] === 'audio'
                      ?
                      <audio controls className='mb-1'>
                        <source src={`${BASE_URL}/${file}`}/>
                      </audio> 
                      :
                      file.split('\\')[5] === 'video'
                      ?
                      <video controls className='mb-1 h-[200px]'>
                        <source src={`${BASE_URL}/${file}`}/>
                      </video>
                      :
                      file.split('\\')[5] === 'application'
                      ?
                      <div>
                        <a href={`${BASE_URL}/${file}`} download={true} className='mb-1 flex items-center px-3 py-1 bg-black bg-opacity-[.13] rounded-sm text-emerald-700'>
                          <span>download document </span>
                          <CiSaveDown1 className='ml-3 text-xl'/>
                        </a>
                      </div>
                      :
                      <></>
                    }
                  </div>
                ))
              }
              </>
              :
              <></>
            }
            {
              message.message 
              ?
              <p className='bg-emerald-700 px-3 py-1 rounded-sm w-[65%]'>
                {message.message}
              </p>
              :
              <></>
            }
          </div>
          {/* author */}
          <div className='flex items-center mt-1'>
            {/* profile and username */}
            <div className='flex items-center mr-1'>
              <GetProfile userId={message.senderId}/>
              <span className='mx-1'>
                <GetUsername userId={message.senderId}/>
              </span>
            </div>
            {/* controllers */}
            <div className='flex items-center'>
              <span>
              {formatDistanceToNow(new Date(message.createdAt),{addSuffix: true})}
              </span>
              {
              false
              ?
              <div className='w-[18px] h-[18px] border-2 border-emerald-950 rounded-full border-r-transparent animate-spin ml-3'></div>
              :
              <button 
                className='text-xl mr-3 opacity-[.13] hover:opacity-[.85]' 
                onClick={()=>{
                  dispatch(deleteMessage(message._id))
                }}
                
              >
                <MdDelete />
              </button>
            }
            </div>
          </div>
      </div>
    }
    </>
  )
}

export default SingleChat