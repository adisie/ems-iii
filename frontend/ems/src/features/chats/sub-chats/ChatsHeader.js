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
  return (
    <div className="flex items-center p-1 text-xs text-emerald-700 bg-black bg-opacity-[.125] font-serif">
        <div className="flex items-center">
            <GetProfile userId={userId[0]} />
            <IsOnline userId={userId[0]} />
            <span className='ml-1'>
              <GetUsername userId={userId[0]} />
            </span>
        </div>
    </div>
  )
}

export default ChatsHeader