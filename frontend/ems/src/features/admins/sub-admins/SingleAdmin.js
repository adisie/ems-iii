import {useSelector,useDispatch} from 'react-redux'

// actions from slices
// center slice
import {
    setCenterDir,
} from '../../center/centerSlice'
// users
import {
    selectUser,
    changeUserRole,
    setIsUserId,
    selectIsUserId,
    selectIsChangingRole,
} from '../../users/usersSlice'
// messages slice
import {
    selectMessages,
    setReceiverId,
} from '../../messages/messagesSlice'

// chats slice
import {
    newChat,
    selectConnections,
    selectIsConnectingDone,
    setIsChat,
    selectIsConnectionPending,
    setIsConnectionId,
    selectIsConnectionId,
    setConnectionReceiverId,
} from '../../chats/chatsSlice'


// sub-users
import GetUsername from '../../users/sub-users/GetUsername'
import IsOnline from '../../users/sub-users/IsOnline'
// sub-profiles
// GetProfile
import GetProfile from '../../profiles/sub-profiles/GetProfile'
import { useEffect } from 'react'

// main
// SingleAdmin
const SingleAdmin = ({inUser}) => {
    // states from slices
    // users
    const user = useSelector(selectUser)
    const isUserId = useSelector(selectIsUserId)
    const isChangingRole = useSelector(selectIsChangingRole)
    // chats
    const connections = useSelector(selectConnections) 
    const isConnected = connections.find(connection => connection.members.includes(inUser._id) && connection.members.includes(user?._id)) 
    const isConnectingDone = useSelector(selectIsConnectingDone)
    const isConnectingPending = useSelector(selectIsConnectionPending)
    const isConnectionId = useSelector(selectIsConnectionId)

    
    
    // hooks
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isConnectingDone){
            dispatch(setCenterDir('CH'))
        }
    },[isConnectingDone])

  return (
    <>
    {
        user?.role !== "SUPER" && inUser.role === "NORMAL"
        ?
        <></>
        :
        <div className="flex items-center justify-between m-1 border-b border-emerald-700 border-opacity-[.13] p-1 text-xs text-emerald-700 font-serif">
            <div className="flex items-center cursor-pointer" 
                onClick={()=>{
                    if(!isConnected){
                        dispatch(setIsConnectionId(inUser._id))
                        dispatch(newChat(inUser._id))
                    }else{
                        dispatch(setIsChat(isConnected))
                        dispatch(setCenterDir('CH'))
                    }
                    dispatch(setConnectionReceiverId(inUser._id))
                    dispatch(setReceiverId(inUser._id))
                }}
            >
                <GetProfile userId={inUser._id}/>
                <IsOnline  userId={inUser._id}/>
                <span className='mx-1'>
                    <GetUsername userId={inUser._id}/>
                </span>

                {
                    isConnectingPending && isConnectionId === inUser._id
                    ?
                    <div className='mx-1 w-[22px] h-[22px] rounded-full border-2 border-emerald-700 border-r-transparent animate-spin'></div>
                    :
                    <></>
                }
                
            </div>
            <div className="flex items-center">
                {
                    inUser.role === 'SUPER'
                    ?
                    <span>Super Admin</span>
                    :
                    inUser.role === 'ADMIN'
                    ?
                    <span>Admin</span>
                    :
                    inUser.role === 'NORMAL'
                    ?
                    <span>Normal</span>
                    :
                    <></>
                }
                {
                    user.role === 'SUPER'
                    ?
                    <>
                    {
                        inUser.role === 'NORMAL'
                        ?
                        <>
                        {
                            isChangingRole && inUser._id === isUserId 
                            ?
                            <div className='w-[18px] h-[18px] rounded-full border-2 border-emerald-700 border-r-transparent animate-spin mx-3'></div>
                            :
                            <button className='mx-1 border border-emerald-700 px-3 py-[.15rem] rounded-sm transition-all ease-in-out duration-300 hover:bg-emerald-700 hover:text-gray-300' 
                                onClick={()=>{
                                    dispatch(setIsUserId(inUser._id))
                                    dispatch(changeUserRole({role: 'ADMIN',_id: inUser._id}))
                                }}
                            >make admin</button>
                        }
                        </>
                        :
                        inUser.role === 'ADMIN'
                        ?
                        <>
                        {
                            isChangingRole && inUser._id === isUserId 
                            ?
                            <div className='w-[18px] h-[18px] rounded-full border-2 border-red-700 border-r-transparent animate-spin mx-3'></div>
                            :
                            <button className='mx-1 border border-red-700 text-red-700 px-3 py-[.15rem] rounded-sm transition-all ease-in-out duration-300 hover:bg-red-700 hover:text-gray-300' 
                                onClick={()=>{
                                    dispatch(setIsUserId(inUser._id))
                                    dispatch(changeUserRole({role: 'NORMAL',_id: inUser._id}))
                                }}
                            >make normal</button>
                        }
                        </>
                        :
                        <></>
                    }
                    </>
                    :
                    <></>
                }
            </div>
        </div>
    }
    </>
  )
}

export default SingleAdmin