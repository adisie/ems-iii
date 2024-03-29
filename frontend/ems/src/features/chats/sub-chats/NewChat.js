import { useState } from "react"
import {useSelector,useDispatch} from 'react-redux'

// global constants
import {
  SOCKET,
} from '../../../config'

// actions from slices
// chats
import {
  selectIsChat,
} from '../chatsSlice'
// messages
import {
  newMessage,
  selectIsMessageSending,
} from '../../messages/messagesSlice'
// users
import {
  selectUser,
} from '../../users/usersSlice'

// icons
import { GrSend } from "react-icons/gr"
import { MdAttachFile } from "react-icons/md"

// main
// NewMessage
const NewChat = () => {
  // states from slices
  // chats
  const isChat = useSelector(selectIsChat)
  // messages
  const isMessageSending = useSelector(selectIsMessageSending)
  // states
  const [message,setMessage] = useState('')
  // users
  const user = useSelector(selectUser) 
  
  let receiverId = isChat?.members.find(mb => mb !== user?._id) 
  

  // hooks
  const dispatch = useDispatch()

  // addjust text area height
  const addjustTextareaHeight = e => {
    let textarea = document.getElementById('chat') 
    textarea.style.height = '18px' 
    let scHeight = e.target.scrollHeight 
    textarea.style.height = `${scHeight}px`
  }

  // submit handler
  const submitHandler = () => {
    let textarea = document.getElementById('chat') 
    if(message.trim()){
      dispatch(newMessage({connectionId: isChat?._id,message}))
      SOCKET.emit('messageSent',{senderId: user?._id,receiverId})
    }
    setMessage('')
    textarea.style.height = '18px'
    // textarea.focus()
  }

  // files submit handler
  const filesSubmitHandler = e => {
    let files = e.target.files 
    let formData = new FormData 
    formData.append('connectionId',isChat?._id)
    for(let i = 0; i < files.length; i++){
      formData.append('files',files[i])
    }
    dispatch(newMessage(formData))
    SOCKET.emit('messageSent',{senderId: user?._id,receiverId})
  }

  // isMessagePending
  if(isMessageSending){
    return <div className="flex items-center justify-center relative">
      <div className="absolute bottom-2 flex items-start bg-gray-200 px-1 py-[.195rem] w-[24px] h-[24px] border-emerald-700 border-4 rounded-full border-r-transparent animate-spin"></div>
    </div>
  }

  // on focus
  const onKeyPressHandler = e => {
    SOCKET.emit('messageTyping',{senderId: user?._id,receiverId})
  }


  return (
    <div className="flex items-center justify-center relative">
      <div className="absolute bottom-0 flex items-start bg-emerald-700 text-gray-300 rounded-sm px-1 py-[.195rem] font-serif text-xs">
        <input type="file" name="files" id="msg-files" multiple hidden onChange={filesSubmitHandler}/> 
        <label htmlFor="msg-files" className="text-gray-300 text-xl cursor-pointer">
          <MdAttachFile />
        </label>
        <textarea name="message" id="chat" 
          className="focus:outline-none w-[250px] h-[18px] bg-transparent resize-none mt-[.1rem] max-h-[450px]" 
          placeholder="message..." 
          onKeyUp={addjustTextareaHeight}  
          value={message} 
          onChange={e=>setMessage(e.target.value)} 
          onFocus={onKeyPressHandler}  
        ></textarea>
        <button
          className="self-end text-xl opacity-[.65] hover:opacity-[.85]" 
          onClick={submitHandler} 
        >
          <GrSend />
        </button>
      </div>
    </div>
  )
}

export default NewChat