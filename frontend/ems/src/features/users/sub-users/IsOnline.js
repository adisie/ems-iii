import { useSelector } from 'react-redux'

// actions from slice
// users slice
import {
    selectOnlineUsers,
} from '../usersSlice'

// main
// IsOnlie
const IsOnline = ({userId}) => {
    // states from slice
    // users slice
    const onlieUsers = useSelector(selectOnlineUsers)
    const isOnline = onlieUsers.find(user => user.userId === userId)
  return (
    <>
    {
        isOnline 
        ?
        <div className="w-[7px] h-[7px] rounded-full bg-emerald-700 ml-[-.4rem]"></div>
        :
        <></>
    }
    </>
  )
}

export default IsOnline