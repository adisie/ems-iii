import {motion} from 'framer-motion'
import {useSelector,useDispatch} from 'react-redux'

// actions from slice
// employees slice
import {
    setEmployeesDir,
    selectEmployees,
    resetIsNewEmployeeDone,
} from '../employeesSlice'

// sub-employees
// SingleEmployee
import SingleEmployee from './SingleEmployee'
// icons
// add
import { IoAddCircleSharp } from "react-icons/io5"
import { FaHandPointDown } from "react-icons/fa"
// main
// EmployeesList
const EmployeesList = () => {
    // states from slices
    // employees slice
    const employees = useSelector(selectEmployees)

    // hooks
    const dispatch = useDispatch()

    

  return (
    <div className="flex-grow h-[93vh] relative overflow-hidden flex flex-col">
        {/* employee list */}
        <div className="flex-grow mt-1 flex flex-col bg-black bg-opacity-[.1]">
            {/* table header */}
            {/* <div className="grid grid-cols-5 gap-7 text-sm text-gray-300 font-serif font-bold bg-emerald-700 py-[.25rem] px-[.15rem] mb-1">
                <div>Employee</div>
                <div className='hidden screen-l-9:flex'>Email</div>
                <div className='col-span-2 screen-l-9:col-span-1'>Position</div>
                <div>Sallary</div>
                <div>Action</div>
            </div> */}
            {/* list */}
            <div className="flex-grow h-[82vh] overflow-y-auto pr-1" id='employee-list-container'>
                {
                    employees?.length > 0 
                    ?
                    employees.map(employee=>(
                        <SingleEmployee key={employee._id} employee={employee}/>
                    )) 
                    :
                    <div className='flex items-center justify-center'>
                        <div className='flex flex-col items-center text-emerald-700 font-serif text-2xl'>
                            <div className='opacity-[.35]'>No Employee Registereed</div>
                            <div className='opacity-[.35]'>Register Now</div>
                            <div className='mt-5'>
                                <button className="text-3xl m-1 opacity-[.55] animate-bounce" 
                                    onClick={()=>{
                                        dispatch(resetIsNewEmployeeDone())
                                        dispatch(setEmployeesDir('NE'))
                                    }}
                                >
                                    <FaHandPointDown />
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
        {/* add new employee btn */}
        <div className='w-full bg-transparent absolute left-0 bottom-0 flex items-center justify-center'>
            <motion.button 
                className='text-4xl text-emerald-700 transition-all duration-300 ease-in-out hover:opacity-[.75]' 
                drag
                dragSnapToOrigin
                dragMomentum={false} 
                onClick={()=>{
                    dispatch(resetIsNewEmployeeDone())
                    dispatch(setEmployeesDir('NE'))
                }}
            >
                <IoAddCircleSharp />
            </motion.button>
        </div>
    </div>
  )
}

export default EmployeesList