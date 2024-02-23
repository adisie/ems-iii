import {useDispatch, useSelector} from 'react-redux'

// global constants
import {
  BASE_URL,
} from '../../../config'

// actions from slices
// employees slice
import {
  setEmployeesDir,
  setIsEmployee,
  deleteEmployee,
  selectIsEmployeeDeleting,
  setIsEmployeeId,
  selectIsEmployeeId,
} from '../employeesSlice'

// default profile employee images
// male profile
import maleDefaultProfile from '../../../assets/images/defaults/profiles/male-profile-3.jpg'
// icons
// edit
import { CiEdit } from "react-icons/ci"
// delete
import { MdDelete } from "react-icons/md"

// main
// SingleEmployee
const SingleEmployee = ({employee}) => {
  // states from slices
  // employee
  const isEmployeeDeleting = useSelector(selectIsEmployeeDeleting)
  const isEmployeeId = useSelector(selectIsEmployeeId)
  // hooks
  const dispatch = useDispatch()
  return (
    <div className="flex items-center justify-between text-xs text-emerald-700 font-serif py-[.25rem] px-[.15rem] border-b border-emerald-700 border-opacity-[.15] transition-all duration-300 ease-in-out hover:bg-gray-200">
        {/* emaployye */}
        <div className='cursor-pointer flex items-center w-[150px]' 
          onClick={()=>{
            dispatch(setIsEmployee(employee))
            dispatch(setEmployeesDir('SE'))
          }}
        >
          {
            employee.profile 
            ?
            <img src={`${BASE_URL}/${employee.profile}`} alt="employee profile" className='w-[24px] h-[24px] rounded-full'/>
            :
            <img src={maleDefaultProfile} alt="employee profile" className='w-[24px] h-[24px] rounded-full'/>
          }
          <span className='ml-1'>
            {employee?.first_name} {employee?.last_name} 
          </span>
        </div>
        {/* email */}
        <div className='hidden screen-l-7:flex'>{employee?.email}</div>
        {/* postion */}
        <div>{employee?.position}</div>
        {/* sallart */}
        <div className='hidden screen-l-3:flex'>{employee?.sallary} Birr</div>
        {/* action */}
        <div className='flex items-center'>
          <button 
            className='text-xl mr-1 transition-all duration-300 ease-in-out hover:text-emerald-950' 
            onClick={()=>{
              dispatch(setIsEmployee(employee))
              dispatch(setEmployeesDir('EE'))
            }}
          >
            <CiEdit />
          </button>
          {
            isEmployeeDeleting && employee?._id === isEmployeeId
            ?
            <div className='ml-1 w-[18px] h-[18px] rounded-full border-2 border-red-700 border-r-transparent animate-spin'/>
            :
            <button 
              className='text-xl ml-1 text-red-300 transition-all duration-300 ease-in-out hover:text-red-800' 
              onClick={()=>{
                dispatch(setIsEmployeeId(employee?._id))
                dispatch(deleteEmployee(employee?._id))
              }}
            >
              <MdDelete />
            </button>
          }
        </div>
    </div>
  )
}

export default SingleEmployee