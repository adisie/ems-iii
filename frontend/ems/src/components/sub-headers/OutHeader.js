import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'

// actions from slices
// users slice
import {
  setUsersDir,
  resetErrors,
} from '../../features/users/usersSlice'

// main
// OutHeader
const OutHeader = () => {
  // hooks
  const dispatch = useDispatch()

  return (
    <div>
        <NavLink to={'/users'} 
            className={"px-3 py-[.13rem] rounded-sm bg-gray-300 border border-gray-300 text-emerald-700 transition-all duration-300 ease-in-out hover:bg-emerald-700 hover:text-gray-300 ml-1"}
            onClick={()=>{
              dispatch(setUsersDir('LI'))
              dispatch(resetErrors())
            }}
        >Login</NavLink>
        <NavLink to={'/users'} 
            className={"px-3 py-[.13rem] rounded-sm bg-gray-300 border border-gray-300 text-emerald-700 transition-all duration-300 ease-in-out hover:bg-emerald-700 hover:text-gray-300 ml-1"}
            onClick={()=>{
              dispatch(setUsersDir('SU'))
              dispatch(resetErrors())
            }}
        >Signup</NavLink>
    </div>
  )
}

export default OutHeader