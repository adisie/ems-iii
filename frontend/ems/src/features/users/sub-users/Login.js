import { useState, useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

// actions from slices
// users slice
import {
  setUsersDir,
  selectUser,
  selectErrors,
  login,
  selectIsUserPending,
  resetErrors,
} from '../usersSlice'

// sub-users
// UsersSpinner
import UsersSpinner from './UsersSpinner'


// main
// Signup
const Login = () => {
  // local states
  // username
  const [username,setUsername] = useState('')
  // password
  const [password,setPassword] = useState('')

  // states from slices
  // users slice
  const isUserPending = useSelector(selectIsUserPending)
  const user = useSelector(selectUser)
  const errors = useSelector(selectErrors)


  // hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // effects
  // redirection on login
  useEffect(()=>{
    if(user?.role === 'SUPER' || user?.role === 'ADMIN'){
      navigate('/')
    }else if(user?.role === 'NORMAL'){
      navigate('/pending')
    }
  },[user])



  // validators
  // usernmae
  const usernameValidator = () => {
    let errorUsername = document.getElementById('login-username-error')
    const usernamePattern = /^[a-zA-Z]/
    if(!username.trim()){
      errorUsername.textContent = 'username required'
    }else if(username.includes('/') || username.includes(' ') || username.includes('?') || username.includes('.')){
      errorUsername.textContent = 'invalid character'
    }else if(!usernamePattern.test(username)){
      errorUsername.textContent = 'username must start with letter'
    }else {
      errorUsername.textContent = ''
    }
  }


  // password
  const passwordValidator = () => {
    let errorPassword = document.getElementById('login-password-error')
    if(!password){
      errorPassword.textContent = 'password required'
    }else if(password.length < 3){
      errorPassword.textContent = 'too short password'
    }else if(password){
      errorPassword.textContent = ''
    }
  }



  // submit handler
  const submitHandler = () => {
    let errorUsername = document.getElementById('login-username-error')
    let errorPassword = document.getElementById('login-password-error')
    if(!username.trim()  && !password){
      errorUsername.textContent = 'username required'
      errorPassword.textContent = 'password required'
    }else if(username.trim() && !password){
      errorUsername.textContent = ''
      errorPassword.textContent = 'password required'
    }else if(!username.trim() && password){
      errorUsername.textContent = 'username required'
      errorPassword.textContent = ''
    }else if(!errorUsername.textContent && !errorPassword.textContent){
      dispatch(login({username,password}))
    }else {
      console.log('cant')
    }
    }

    // spinner
    if(isUserPending){
      return <UsersSpinner />
    }

  return (
    <div>
      {/* form */}
      <div className="bg-black bg-opacity-[.13] rounded-sm px-5 py-1 text-xs text-emerald-900 font-serif screen-l-3:px-16 screen-l-5:px-24">
          {/* title */}
          <div className="my-1 flex items-center justify-center text-lg font-bold">
            <span>Login</span>
          </div>
          {/* input-controll username */}
          <div className="mb-[.65rem]">
            <div className="bg-white rounded-sm px-2 py-[.35rem] flex items-center justify-center">
              <input type="text" name="username" placeholder="username" 
                className="flex-grow focus:outline-none w-[180px] bg-transparent" 
                value={username} 
                onChange={e=>setUsername(e.target.value)} 
                onKeyUp={usernameValidator}
              />
            </div>
            <div className="flex items-center justify-center text-red-700 text-[.75rem]" id="login-username-error">{errors?.username}</div>
          </div>

          

          {/* input-controll password */}
          <div className="mb-[.65rem]">
            <div className="bg-white rounded-sm px-2 py-[.35rem] flex items-center justify-center">
              <input type="password" name="password" placeholder="password" 
                className="flex-grow focus:outline-none w-[180px] bg-transparent" 
                value={password} 
                onChange={e=>setPassword(e.target.value)} 
                onKeyUp={passwordValidator}
              />
            </div>
            <div className="flex items-center justify-center text-red-700 text-[.75rem]" id="login-password-error">{errors?.password}</div>
          </div>


          {/* button */}
          <div className="my-1 flex items-center justify-center bg-emerald-700 rounded-sm text-gray-300 py-[.3rem] cursor-pointer transition-all ease-in-out duration-300 hover:opacity-[.75]" 
            onClick={()=>{
              submitHandler()
            }}
          >
            <span>Login</span>
          </div>

          {/* have account link */}
          <div className="mt-3 mb-1 flex items-center justify-between">
            <span className="hover:underline cursor-pointer opacity-[.75]" 
              onClick={()=>{
                dispatch(setUsersDir('SU'))
                dispatch(resetErrors())
              }}
            >have no account?</span>
            <span className="hover:underline cursor-pointer opacity-[.75] text-red-700" 
              onClick={()=>{
                dispatch(setUsersDir('FP'))
                dispatch(resetErrors())
              }}
            >forget password</span>
          </div>

      </div>
    </div>
  )
}

export default Login