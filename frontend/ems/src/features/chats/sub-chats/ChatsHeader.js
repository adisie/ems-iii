import { useEffect } from 'react'
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
  selectIsMessageTyping,
  setIsMessageTping,
} from '../../messages/messagesSlice'

import GetProfile from '../../profiles/sub-profiles/GetProfile'
import GetUsername from '../../users/sub-users/GetUsername'
import IsOnline from '../../users/sub-users/IsOnline'

// main
// ChatsHeader
const ChatsHeader = () => {
  // states
  // states from slices
  const isChat = useSelector(selectIsChat) 
  const user = useSelector(selectUser)
  let userId = isChat?.members.filter(member => member !== user?._id) 
  // messages
  const isMessageTyping = useSelector(selectIsMessageTyping)

  // hooks
  const dispatch = useDispatch()
  
  let typingTimer 
  clearTimeout(typingTimer)
  typingTimer = setTimeout(()=>{
    dispatch(setIsMessageTping(null))
  },1000 * 60)
  
  return (
    <div className="flex items-center p-1 text-xs text-emerald-700 bg-black bg-opacity-[.125] font-serif">
        <div className="flex items-center">
            <GetProfile userId={userId[0]} />
            <IsOnline userId={userId[0]} />
            <span className='ml-1'>
              <GetUsername userId={userId[0]} />
            </span>
            {
              isMessageTyping?.senderId === userId[0]
              ?
              <div className='ml-3 flex items-center'>
                <ul id='typing-list'>
                  <li id="typing-i"></li>
                  <li id="typing-ii"></li>
                  <li id="typing-iii"></li>
                </ul>
                <span className='ml-1 italic'>typing</span>
              </div>
              :
              <></>
            }
        </div>
    </div>
  )
}

export default ChatsHeader