import {Navigate,Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'

// actions from slices
// users slice
import {
  selectUser,
} from '../features/users/usersSlice'

// main
// PrivateRoutes
const PrivateRoutes = () => {
    // states from slices
    // users
    const user = useSelector(selectUser)
  return (
    <>
    {
        user?.role === 'SUPER' || user?.role === 'ADMIN'
        ?
        <Outlet />
        :
        <Navigate to={'/users'}/>
    }
    </>
  )
}

export default PrivateRoutes