import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'


// actions from slices
// users slice
import {
  logout,
  resetErrors,
  setUsersDir,
} from '../../features/users/usersSlice'
// center slice
import {
  setCenterDir,
} from '../../features/center/centerSlice'
// employees slice
import {
  setEmployeesDir,
} from '../../features/employees/employeesSlice'
// profiles slice
import {
  setIsProfileId,
} from '../../features/profiles/profilesSlice'

// sub-profiles
// GetProfile
import GetProfile from '../../features/profiles/sub-profiles/GetProfile'


// main
// InHeader
const InHeader = ({user}) => {
  // hooks
  const dispatch = useDispatch()

  return (
    <div className="flex items-center">
        <NavLink className={"flex items-center"} onClick={()=>{
          dispatch(setCenterDir('PR'))
          dispatch(setIsProfileId(user?._id))
        }}>
            <span>{user?.username}</span>
            <GetProfile userId={user?._id}/>
        </NavLink>
        <button className="px-3 py-[.13rem] rounded-sm bg-gray-300 border border-gray-300 text-emerald-700 transition-all duration-300 ease-in-out hover:bg-emerald-700 hover:text-gray-300 ml-1" 
        onClick={()=>{
          dispatch(logout())
          dispatch(setEmployeesDir('LI'))
          dispatch(setCenterDir('EM'))
          dispatch(resetErrors())
          dispatch(setUsersDir('LI'))
        }}
        >Logout</button>
    </div>
  )
}

export default InHeader