import {useSelector} from 'react-redux'

// actions from slices
// employees slice
import {
  selectEmployeesDir,
} from './employeesSlice'

// sub-employees
// EmployeesList
import EmployeesList from './sub-employees/EmployeesList'
// NewEmployeeForm
import NewEmployeeForm from './sub-employees/NewEmployeeForm'
// EditEmployeeForm
import EditEmployeeForm from './sub-employees/EditEmployeeForm'
// SingleEmployeeDetail
import SingleEmployeeDetail from './sub-employees/SingleEmployeeDetail'

// main
// Employees
const Employees = () => {
  // states from slices
  // employees slice
  const employeesDir = useSelector(selectEmployeesDir)

  return (
    <div className="flex-grow flex">
      {
        employeesDir === 'LI'
        ?
        <EmployeesList />
        :
        employeesDir === 'NE'
        ?
        <NewEmployeeForm />
        :
        employeesDir === 'EE'
        ?
        <EditEmployeeForm />
        :
        employeesDir === 'SE'
        ?
        <SingleEmployeeDetail />
        :
        <></>
      }
    </div>
  )
}

export default Employees