import {useRef,useEffect} from 'react'
import {useSelector} from 'react-redux'


// actions from slices
// users
import {
  selectUser,
} from '../../users/usersSlice'
// messages
import {
  selectMessages,
} from '../../messages/messagesSlice'

// icons
import { FaHandPointDown } from "react-icons/fa"

// sub box
import SingleChat from './SingleChat'
// main
// MessagesList
const ChatList = ({isChat}) => {
  // states 
  const scroll = useRef()

  // states from slices
  // users
  const user = useSelector(selectUser) 
  // messages 
  const messages = useSelector(selectMessages) 

  
  let finalMessages = messages?.filter(message => message.connectionId === isChat?._id) 
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: 'smooth'})
  })

  
  return (
    <div className="flex-grow h-[82vh] overflow-y-auto pt-3" id="chat-list-container">
        {
          finalMessages?.length > 0 
          ?
          finalMessages.map(message=>(
            <SingleChat key={message._id} message={message} isOwn={message.senderId === user?._id}/>
          ))
          :
          <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center text-2xl text-emerald-700 font-serif'>
              <div className='opacity-[.3]'>No Message Yet</div>
              <div className='opacity-[.3]'>Start Chating...</div>
              <div className='mt-7 animate-bounce opacity-[.45] text-3xl'>
                <FaHandPointDown />
              </div>
            </div>
          </div>
        }
        <div ref={scroll}/>
    </div>
  )
}

export default ChatList