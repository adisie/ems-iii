import { useEffect } from "react"
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

// actions from slices
// users slice
import {
  setOnlineUsers,
  setUsers,
  setUser,
  selectUser,
  userSignupEvent,
} from './features/users/usersSlice'
// chats
import {
  allConnections,
  newConnectionEvent,
} from './features/chats/chatsSlice'
// profiles
import {
  addNewUserProfileEvent,
} from './features/profiles/profilesSlice'
// employess
import {
  getAllEmployees,
  newEmployeeEvent,
  deleteEmployeeEvent,
  updateEmployeeEvent,
} from './features/employees/employeesSlice'

// global constant
import {
  SOCKET,
} from './config'

// components
// Header
import Header from "./components/Header"
// pages
// Home
import Home from "./features/home/Home"
// main
// App
const App = () => {

  // states from slices
  // users slice
  const user = useSelector(selectUser)

  // hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // effects
  // onlie users
  useEffect(()=>{
    SOCKET.on('onlineUsers',onlineUsers => {
      dispatch(setOnlineUsers(onlineUsers))
    })
  },[])
  // change user role
  useEffect(()=>{
    SOCKET.on('changeUserRoleEvent',user => {
      dispatch(setUsers(user))
    })
  },[])
  useEffect(()=>{
    if(user){
      SOCKET.on('myRoleChageEvent',user => {
        dispatch(setUser(user))
        navigate('/')
      })
    }
  })
  // new user signup
  useEffect(()=>{
    SOCKET.on('userSignupEvent',user => {
      dispatch(userSignupEvent(user))
      dispatch(addNewUserProfileEvent(user._id))
    })
  },[])
  useEffect(()=>{
    if(user){
      SOCKET.emit('newOnlineUser',user?._id)
    }
  },[])
  // connections
  // all connects
  useEffect(()=>{
    if(user){
      dispatch(allConnections())
    }
  })
  // new connection
  useEffect(()=>{
    SOCKET.on('newConnectionEvent',connection=>{
      console.log('HELLO NEW INCOMMING CONNECTION')
      dispatch(newConnectionEvent(connection))
    })
  },[])
  // employees
  // get all employees
  useEffect(()=>{
    dispatch(getAllEmployees())
  })

  // new emplooye evenet
  useEffect(()=>{
    SOCKET.on('newEmployeeEvent',newEmployee=>{
      dispatch(newEmployeeEvent(newEmployee))
    })
  },[])
  // delete employee 
  useEffect(()=>{
    SOCKET.on('deleteEmployeeEvent',_id=>{
      dispatch(deleteEmployeeEvent(_id))
    })
  },[])
  // update employee
  useEffect(()=>{
    SOCKET.on('updateEmployeeEvent',updatedEmployee=>{
      dispatch(updateEmployeeEvent(updatedEmployee))
    })
  },[])
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <Home />
    </div>
  )
}

export default App