import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'


// actions from slices
// chats
import {
  selectIsChat,
} from '../chatsSlice'
// users
import {
  selectUser,
} from '../../users/usersSlice'
// messages
import {
  newMessage,
} from '../../messages/messagesSlice'

// sub-box
import ChatList from "./ChatList"
import NewChat from "./NewChat"

// main
// ChatBox
const ChatBox = () => {
  // states from slices
  const isChat = useSelector(selectIsChat) 
  const user = useSelector(selectUser)

  // local states
  const [isDragging,setIsDragging] = useState(false)

  // hooks
  const dispatch = useDispatch()

  // functions
  const onDragOverHandler = e => {
    e.preventDefault()
    setIsDragging(true)
    e.dataTransfer.dropEffect = 'copy'
  }

  const onDragLeaveHandler = e => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDropHandler = e => {
    e.preventDefault()
    setIsDragging(false)

    let formData = new FormData() 
    formData.append('connectionId',isChat?._id)
    let files = e.dataTransfer.files 
    for(let i = 0; i < files.length; i++){
      formData.append('files',files[i])
    }
    dispatch(newMessage(formData))
  }
  
  return (
    <div className='flex-grow flex flex-col px-1 relative' onDragOver={onDragOverHandler} onDragLeave={onDragLeaveHandler} onDrop={onDropHandler}>
      <ChatList isChat={isChat} user={user}/>
      <NewChat isChat={isChat} user={user}/>
      {
        isDragging 
        ?
        <div className='absolute left-0 top-0 h-full w-full bg-black bg-opacity-[.3] flex items-center justify-center'>
          <div className='p-3 rounded-sm bg-gray-300 text-emerald-700 text-xl font-serif font-bold'>
            <div>Drop Here</div>
          </div>
        </div>
        :
        <></>
      }
    </div>
  )
}

export default ChatBox