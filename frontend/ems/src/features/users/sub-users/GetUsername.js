import {useSelector} from 'react-redux'

// actions from slices
// users slice
import {
    selectUsers,
} from '../usersSlice'

const GetUsername = ({userId}) => {
    // states from slices
    // users slice
    const users = useSelector(selectUsers) 
    const user = users.find(user => user._id === userId)
  return (
    <>{user?.username}</>
  )
}

export default GetUsername