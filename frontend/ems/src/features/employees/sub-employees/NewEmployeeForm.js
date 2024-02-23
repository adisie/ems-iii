import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'

// actions from slices
// employees 
import {
  newEmployee,
  selectIsNewEmployeePending,
  selectIsNewEmployeeDone,
  setEmployeesDir,
} from '../employeesSlice'

// icons
// image
import { CiImageOn } from "react-icons/ci"
// cancel
import { MdCancelPresentation } from "react-icons/md"
// main
// NewEmployeeForm
const NewEmployeeForm = () => {
  // states from slices
  // employee
  const isNewEmployeePending = useSelector(selectIsNewEmployeePending)
  const isNewEmployeeDone = useSelector(selectIsNewEmployeeDone)
  // local states 
  // first name
  const [firstName,setFirstName] = useState('')
  // last name
  const [lastName,setLastName] = useState('')
  // email
  const [email,setEmail] = useState('')
  // position
  const [position,setPosition] = useState('')
  // salary
  const [sallary,setSallary] = useState()
  // file
  const [file,setFile] = useState(null)
  // info
  const [info,setInfo] = useState('')

  // hooks 
  const dispatch = useDispatch()

  // effects
  useEffect(()=>{
    // redirect
    if(isNewEmployeeDone){
      dispatch(setEmployeesDir('LI'))
    }
  },[isNewEmployeeDone])

  // actions
  // file input change handler
  const fileInutChaneHandler = e => {
    let fileNameDisplayer = document.getElementById('file-name-span')
    setFile(e.target.files[0])
    fileNameDisplayer.textContent = e.target.files[0].name
  }

  // reset file
  const resetFile = () => {
      let fileNameDisplayer = document.getElementById('file-name-span')
      fileNameDisplayer.textContent = ''
      setFile(null)
  }

  // submit handler
  const submitHandler = e => {
    e.preventDefault()
    const formData = new FormData() 
    formData.append('first_name',firstName)
    formData.append('last_name',lastName)
    formData.append('email',email)
    formData.append('position',position)
    formData.append('sallary',sallary)
    formData.append('info',info) 
    if(file){
      formData.append('profile',file)
    }
    dispatch(newEmployee(formData))
    setFirstName('')
    setLastName('')
    setEmail('')
    setPosition('')
    setSallary('')
    setInfo('')
    setFile(null)
  }

  return (
    <div className="flex-grow flex">
      <form className="flex-grow h-[92vh] overflow-y-auto text-xs text-emerald-700 font-serif bg-gray-100 m-1 rounded-sm p-1">
        {/* title */}
        <div className="text-xl font-bold my-1">
          <span>Employee Registration</span>
        </div>
        {/* fields */}
        {/* first name */}
        <div className="flex flex-col mb-2">
          <div>First Name</div>
          <div className="ml-2 rounded-sm bg-white px-3 border-b border-emerald-700 border-opacity-[.35] py-[.15rem] w-max">
            <input type="text" name="first-name" 
              placeholder="first name" 
              required
              className="focus:outline-none bg-transparent m-[.15rem] w-[180px]" 
              value={firstName} 
              onChange={e=>setFirstName(e.target.value)} 
            />
          </div>
        </div>
        {/* last name */}
        <div className="flex flex-col mb-2">
          <div>Last Name</div>
          <div className="ml-2 rounded-sm bg-white px-3 border-b border-emerald-700 border-opacity-[.35] py-[.15rem] w-max">
            <input type="text" name="last-name" 
              placeholder="last name" 
              required
              className="focus:outline-none bg-transparent m-[.15rem] w-[180px]" 
              value={lastName} 
              onChange={e=>setLastName(e.target.value)} 
            />
          </div>
        </div>
        {/* email  */}
        <div className="flex flex-col mb-2">
          <div>Email</div>
          <div className="ml-2 rounded-sm bg-white px-3 border-b border-emerald-700 border-opacity-[.35] py-[.15rem] w-max">
            <input type="email" name="email" 
              placeholder="email address" 
              required
              className="focus:outline-none bg-transparent m-[.15rem] w-[180px]" 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
            />
          </div>
        </div>
        {/* position */}
        <div className="flex flex-col mb-2">
          <div>Postion</div>
          <div className="ml-2 rounded-sm bg-white px-3 border-b border-emerald-700 border-opacity-[.35] py-[.15rem] w-max">
            <input type="text" name="position" 
              placeholder="position" 
              required
              className="focus:outline-none bg-transparent m-[.15rem] w-[180px]" 
              value={position} 
              onChange={e=>setPosition(e.target.value)} 
            />
          </div>
        </div>
        {/* sallry */}
        <div className="flex flex-col mb-2">
          <div>Sallary</div>
          <div className="ml-2 rounded-sm bg-white px-3 border-b border-emerald-700 border-opacity-[.35] py-[.15rem] w-max">
            <input type="number" name="sallary" 
              placeholder="sallry" 
              required 
              className="focus:outline-none bg-transparent m-[.15rem] w-[180px]" 
              onChange={e=>setSallary(e.target.value)}
            />
          </div>
        </div>
        {/* profile */}
        <div className="flex items-center">
          <input type="file" name="profile" id="profile" accept="image/*" hidden onChange={fileInutChaneHandler}/>
          <label htmlFor="profile" 
            className="cursor-pointer flex items-center"
          >
            select profile: 
            <CiImageOn className="text-xl mr-1"/>
          </label>
          {/* file name */}
          <div className="flex items-center ml-1">
            <span className="text-[.675rem] italic" id='file-name-span'></span>
            {
              file 
              ?
              <button 
                className="ml-1 text-xl text-red-300 hover:text-red-700" 
                onClick={resetFile}
              >
                <MdCancelPresentation />
              </button>
              :
              <></>
            }
          </div>
        </div>
        {/* employee detail */}
        <div className="mt-3">
          <div className="mb-1">
            <span className="underline">Additional Employee Info</span>
          </div>
          <div>
            <textarea name="info" id="" 
              className="focus:outline-none resize-none bg-white text-xs text-emerald-700 font-serif w-[75%] h-[120px] border border-emerald-700 border-opacity-[.35] rounded-sm p-1"
              placeholder="employee infromation..." 
              value={info} 
              onChange={e=>setInfo(e.target.value)} 
            ></textarea>
          </div>
        </div>
        <div className='my-3 flex items-center'>
          {
            isNewEmployeePending 
            ?
            <div className='w-[24px] h-[24px] rounded-full border-4 border-emerald-700 border-r-transparent animate-spin'></div>
            :
            <button className="bg-emerald-700 text-gray-300 rounded-sm px-3 py-[.15rem]" type='submit' onClick={submitHandler}>Add Employee</button>
          }
        </div>
      </form>
    </div>
  )
}

export default NewEmployeeForm