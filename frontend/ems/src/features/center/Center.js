import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'

// global constants
import {
    SOCKET,
} from '../../config'

// actions from slices
// center slice
import {
    selectCenterDir,
} from './centerSlice'
// users slice
import {
    selectUser,
    authCheck,
} from '../users/usersSlice'
// profiles slice
import {
    getAllProfiles,
    addNewProfileEvent,
    deleteProfileEvent,
} from '../profiles/profilesSlice'

// messages
import {
    getAllMessages,
    newMessageEvent,
    deleteMessageEvent,
} from '../messages/messagesSlice'

// pages
// Employees
import Employees from '../employees/Employees'
// Admins
import Admins from '../admins/Admins'
// Settings
import Settings from '../settings/Settings'
// Chats 
import Chats from '../chats/Chats'
// Profiles
import Profiles from '../profiles/Profiles'
// component
// LeftSideBar
import LeftSideBar from './sub-center/LeftSideBar'

// main
// Center
const Center = () => {
    // states from slices
    // center slice
    const centerDir = useSelector(selectCenterDir)
    // users slice
    const user = useSelector(selectUser)

    // hooks
    const dispatch = useDispatch()

    // effects
    // get all profiles
    useEffect(()=>{
        if(user){
            dispatch(getAllProfiles())
        }
    },[])

    // profiles 
    // new profile
    useEffect(()=>{
        SOCKET.on('addNewProfileEvent',profile=>{
            dispatch(addNewProfileEvent(profile))
        })
    },[])
    // delete profile
    useEffect(()=>{
        SOCKET.on('deleteProfileEvent',profile => {
            dispatch(deleteProfileEvent(profile))
        })
    },[])

    // messages
    // get all messages
    useEffect(()=>{
        dispatch(getAllMessages())
    },[])

    // new message 
    useEffect(()=>{
        SOCKET.on('newMessageEvent',message => {
            dispatch(newMessageEvent(message))
        })
    },[])
    // delete message
    useEffect(()=>{
        SOCKET.on('deleteMessageEvent',_id => {
            dispatch(deleteMessageEvent(_id))
        })
    },[])

    // auth-check
    useEffect(()=>{
        dispatch(authCheck())
    })
  return ( 
    <div className="flex-grow flex relative">
        {/* container */}
        <div className="flex-grow max-w-[1050px] mx-auto px-3 flex">
            <LeftSideBar />
            {
                centerDir === 'EM'
                ?
                <Employees />
                :
                centerDir === 'AD'
                ?
                <Admins />
                :
                centerDir === 'SE'
                ?
                <Settings />
                :
                centerDir === 'CH'
                ?
                <Chats />
                :
                centerDir === 'PR' 
                ?
                <Profiles />
                :
                <></>
            }
        </div>
        <div className='absolute w-full h-full bg-black bg-opacity-[.5] z-40 hidden screen-l-5:hidden' id='drop-shdow-box'></div>
    </div>
  )
}

export default Center