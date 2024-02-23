import {useSelector} from 'react-redux'

// actions from slices
// users slice
import {
  selectUsers,
  selectUser,
} from '../../users/usersSlice'

// sub-admins
// SingleAdmin
import SingleAdmin from "./SingleAdmin"
// main
// AdminsList
const AdminsList = () => {
  // states from slices 
  let users = useSelector(selectUsers)
  const user = useSelector(selectUser)
  users = users.filter(usr => usr._id !== user?._id)
  return (
    <div className="flex-grow flex">
        <div className="flex-grow bg-black bg-opacity-[.1] h-[90vh] overflow-y-auto m-1 rounded-sm pr-3" id="admin-list-container-id">
            {
              users?.length > 0 
              ?
              <>
              {
                users.map(user=>(
                  <SingleAdmin key={user._id} inUser={user}/>
                ))
              }
              </>
              :
              <div className='flex items-center justify-center'>
                <div className='flex items-center justify-center mt-5 text-gray-600 text-2xl font-serif'>
                  <div className='animate-bounce opacity-[.5]'>No User Signup Yet!!!</div>
                </div>
              </div>
            }
        </div>
    </div>
  )
}

export default AdminsList