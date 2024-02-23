import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

// icons
// back
import { IoArrowBackOutline } from "react-icons/io5"

// actions from slices
// users slice
import {
  setUsersDir,
} from '../usersSlice'

// sub-users
// UsersSpinner
import UsersSpinner from './UsersSpinner'


// main
// Signup
const ForgetPassword = () => {
  // local states
  // username
  const [email,setEmail] = useState('')


  // hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // effects
  // redirection on login
  useEffect(()=>{
    if(false){
      navigate('/')
    }
  },[])



  // validators
  // email
  const emailValidator = () => {
    let errorEmail = document.getElementById('forget-password-email-error')
    const emailPattern = /^([a-z\d-\.]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/ 
    if(!email.trim()){
      errorEmail.textContent = 'email address required'
    }else if(!emailPattern.test(email)){
      errorEmail.textContent = 'invalid email address'
    }else {
      errorEmail.textContent = ''
    }
  }



  // submit handler
  const submitHandler = () => {
    let emailError = document.getElementById('forget-password-email-error')
    if(!email.trim()){
      emailError.textContent = 'email address required'
    }else if(!emailError.textContent){
      console.log('reset')
    }else{
      console.log('error')
    }
    }

    // spinner
    if(false){
      return <UsersSpinner />
    }

  return (
    <div>
      {/* form */}
      <div className="bg-black bg-opacity-[.13] rounded-sm px-5 py-1 text-xs text-emerald-900 font-serif screen-l-3:px-16 screen-l-5:px-24">
          {/* title */}
          <div className="my-1 flex items-center justify-center text-lg font-bold">
            <span>Forget Password</span>
          </div>
          {/* input-controll username */}
          <div className="mb-[.65rem]">
            <div className="bg-white rounded-sm px-2 py-[.35rem] flex items-center justify-center">
              <input type="text" name="email" placeholder="email address" 
                className="flex-grow focus:outline-none w-[180px] bg-transparent" 
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
                onKeyUp={emailValidator}
              />
            </div>
            <div className="flex items-center justify-center text-red-700 text-[.75rem]" id="forget-password-email-error"></div>
          </div>


          {/* button */}
          <div className="my-1 flex items-center justify-center bg-emerald-700 rounded-sm text-gray-300 py-[.3rem] cursor-pointer transition-all ease-in-out duration-300 hover:opacity-[.75]" 
            onClick={()=>{
              submitHandler()
            }}
          >
            <span>Reset</span>
          </div>

          {/* have account link */}
          <div className="mt-3 mb-1 flex items-center justify-between">
            <span className="px-5 py-[.13rem] border border-emerald-700 rounded-full cursor-pointer transition-all duration-500 ease-in-out hover:bg-emerald-700 hover:text-gray-300" 
              onClick={()=>{
                dispatch(setUsersDir('LI'))
              }}
            >
              <IoArrowBackOutline className="text-lg"/>
            </span>
          </div>

      </div>
    </div>
  )
}

export default ForgetPassword