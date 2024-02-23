import {useSelector} from 'react-redux'

// actions from slices
// users slice
import {
  selectUsersDir,
} from './usersSlice'

// sub-users
// Login
import Login from './sub-users/Login'
// Signup 
import Signup from './sub-users/Signup'
// ForgetPassword
import ForgetPassword from './sub-users/ForgetPassword'
// main
// Users
const Users = () => {
  // states from slices
  // users slice
  const usersDir = useSelector(selectUsersDir) 

  return (
    <div className="flex-grow flex justify-center pt-7">
      <div className="flex-grow max-w-[1050px] mx-auto px-3 flex justify-center">
        {
          usersDir === 'LI'
          ?
          <Login />
          :
          usersDir === 'SU'
          ?
          <Signup />
          :
          usersDir === 'FP'
          ?
          <ForgetPassword />
          :
          <></>
        }
      </div>
    </div>
  )
}

export default Users