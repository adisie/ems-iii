import {useSelector} from 'react-redux'

// actions from slices
// chats
import {
  selectIsChat,
} from '../chatsSlice'
// users
import {
  selectUser,
} from '../../users/usersSlice'

// sub-box
import ChatList from "./ChatList"
import NewChat from "./NewChat"

// main
// ChatBox
const ChatBox = () => {
  // states from slices
  const isChat = useSelector(selectIsChat) 
  const user = useSelector(selectUser)
  
  return (
    <div className='flex-grow flex flex-col px-1'>
      <ChatList isChat={isChat} user={user}/>
      <NewChat isChat={isChat} user={user}/>
    </div>
  )
}

export default ChatBox