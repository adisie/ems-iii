import {useEffect} from 'react'
import {Routes,Route} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

// actions from slices
// users slice
import {
  selectUser,
  getAllUsers,
} from '../users/usersSlice'

// pages
// Users
import Users from '../users/Users'
// Center
import Center from '../center/Center'
// utils
// PrivateRoutes
import PrivateRoutes from '../../utils/PrivateRoutes'
// pending page
import PendingPage from '../../components/PendingPage'

// main
// Home
const Home = () => {
  // states from slice
  // users slice
  const user = useSelector(selectUser)

  // hooks
  const dispatch = useDispatch()

  // get all users
  useEffect(()=>{
    if(user){
      dispatch(getAllUsers())
    }
  })
  return (
    <div className="flex-grow flex">
        {/* routes */}
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route index element={<Center />} />
            </Route>
            <Route path='/users'element={<Users />} />
            <Route path='/pending'element={<PendingPage />} />
        </Routes>
    </div>
  )
}

export default Home