import {NavLink} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

// actions from slices
// center slice
import {
    setCenterDir,
} from '../features/center/centerSlice'
// employees slice
import {
    setEmployeesDir,
} from '../features/employees/employeesSlice'
// users
import {
    selectUser,
} from '../features/users/usersSlice'
// chats
import {
    resetIsConnectingDone,
} from '../features/chats/chatsSlice'

// profiles slice

// icons
// menu
import { GiHamburgerMenu } from "react-icons/gi"

// sub-headers
// InHeader
import InHeader from './sub-headers/InHeader'
// OutHeader
import OutHeader from './sub-headers/OutHeader'
// sub-employees 
// EmployeeSearch
import EmpleyeeSearch from '../features/employees/sub-employees/EmpleyeeSearch'
// main
// Header
const Header = () => {
    // states from slices
    // users slice
    const user = useSelector(selectUser)
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
    <header className='text-xs text-gray-300 font-serif bg-emerald-700'>
        {/* main header container */}
        <div className="max-w-[1050px] mx-auto px-3 py-1 flex items-center justify-between">
            {/* site logo and menu */}
            <div className="flex items-center">
                {/* menu */}
                <div className='flex screen-l-5:hidden'>
                    <button 
                        onClick={()=>{
                            sideMenuBarSHowHide()
                        }}
                    >
                        <GiHamburgerMenu className="text-3xl pt-[.15rem]"/>
                    </button>
                </div>
                {/* site logo */}
                <div className="text-2xl font-black hidden screen-l-5:flex">
                    <NavLink to={'/'} 
                        onClick={()=>{
                            dispatch(setCenterDir('EM'))
                            dispatch(setEmployeesDir('LI'))
                            dispatch(resetIsConnectingDone())
                        }}
                    >
                        <span>E</span><span className="text-gray-400">MS</span>
                    </NavLink>
                </div>
            </div>
            {/* search bar */}
            <div className="flex-grow flex items-center justify-center">
                {/* <EmpleyeeSearch /> */}
            </div>
            {/* in or out header */}
            {
                user?.role === 'SUPER' || user?.role === 'ADMIN' 
                ?
                <InHeader user={user}/>
                :
                <OutHeader />
            }
        </div>
    </header>
  )
}

export default Header