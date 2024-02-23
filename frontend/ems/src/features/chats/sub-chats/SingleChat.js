import {useDispatch} from 'react-redux'
import {formatDistanceToNow} from 'date-fns'

// actions from slices
// messages
import {
  deleteMessage,
} from '../../messages/messagesSlice'

// icons
import { MdDelete } from "react-icons/md"

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
          <div className='bg-black bg-opacity-[.13] p-2 rounded-sm mr-5'>
            <p>
              {message.message}
            </p>
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
          <div className='ml-5 max-w-[75%] bg-emerald-700 text-gray-200 p-2 rounded-sm'>
            <p>
              {message.message}
            </p>
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