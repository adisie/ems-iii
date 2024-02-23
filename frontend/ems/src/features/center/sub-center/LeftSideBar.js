import {useDispatch} from 'react-redux'

// actions from slice
// center slice
import {
    setCenterDir,
} from '../centerSlice'
// employess slice
import {
    setEmployeesDir,
} from '../../employees/employeesSlice'
// chats
import {
    resetIsConnectingDone,
} from '../../chats/chatsSlice'
// ussers
import {
    logout,
    resetErrors,
    setUsersDir,
} from '../../users/usersSlice'

// icons
// employee
import { GrUserWorker } from "react-icons/gr"
// admin
import { RiAdminFill } from "react-icons/ri"
// settings
import { IoIosSettings } from "react-icons/io"

// main
// LeftSideBar
const LeftSideBar = () => {
    // hooks
    const dispatch = useDispatch()

    // show and hide 
    const sideMenuBarSHowHide = () => {
        let sideMenuBar = document.getElementById('left-side-menu-container') 
        let dropShadowBox = document.getElementById('drop-shdow-box')
        if(sideMenuBar?.classList.contains('left-[-100vw]')){
            sideMenuBar?.classList.remove('left-[-100vw]')
            sideMenuBar?.classList.add('left-0')
            dropShadowBox?.classList.remove('hidden')
            dropShadowBox?.classList.add('flex')
        }else{
            sideMenuBar?.classList.add('left-[-100vw]')
            sideMenuBar?.classList.remove('left-0')
            dropShadowBox?.classList.add('hidden')
            dropShadowBox?.classList.remove('flex')
        }
    }

  return (
    <div className="w-[25%] min-w-[170px] text-xs text-emerald-700 font-serif flex absolute left-[-100vw] bottom-0 bg-white h-full z-50  screen-l-5:relative screen-l-5:left-0" id='left-side-menu-container'>
        <ul className="flex-grow py-3 pr-3 flex flex-col">
            <li className="flex items-center py-1 mb-1 border-b border-emerald-700 border-opacity-[.13] cursor-pointer transition-all ease-in-out duration-300 hover:ml-1" 
                onClick={()=>{
                    dispatch(setCenterDir('EM'))
                    dispatch(setEmployeesDir('LI'))
                    dispatch(resetIsConnectingDone())
                    sideMenuBarSHowHide()
                }}
            >
                <GrUserWorker className="text-lg mr-1"/>
                <span>Employees</span>
            </li>
            <li className="flex items-center py-1 mb-1 border-b border-emerald-700 border-opacity-[.13] cursor-pointer transition-all ease-in-out duration-300 hover:ml-1"
                onClick={()=>{
                    dispatch(setCenterDir('AD'))
                    dispatch(resetIsConnectingDone())
                    sideMenuBarSHowHide()
                }}
            >
                <RiAdminFill className="text-lg mr-1"/>
                <span>Admins</span>
            </li>
            <li className="flex items-center py-1 mb-1 border-b border-emerald-700 border-opacity-[.13] cursor-pointer transition-all ease-in-out duration-300 hover:ml-1" 
                onClick={()=>{
                    dispatch(setCenterDir('SE'))
                    dispatch(resetIsConnectingDone())
                    sideMenuBarSHowHide()
                }}
            >
                <IoIosSettings className="text-lg mr-1"/>
                <span>Settings</span>
            </li>
            <button 
                className="my-3 bg-emerald-700 rounded-sm text-gray-300 border border-emerald-700 py-1 px-5 transition-all ease-in-out duration-300 hover:bg-white hover:text-emerald-700 self-start"
                onClick={()=>{
                    dispatch(resetIsConnectingDone())
                    dispatch(logout())
                    dispatch(setEmployeesDir('LI'))
                    dispatch(setCenterDir('EM'))
                    dispatch(resetErrors())
                    dispatch(setUsersDir('LI'))
                }}
            >Logout</button>
        </ul>
    </div>
  )
}

export default LeftSideBar