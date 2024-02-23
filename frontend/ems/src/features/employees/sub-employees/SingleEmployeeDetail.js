import {useSelector} from 'react-redux'

// global constants
import {
  BASE_URL,
} from '../../../config'

// actions from slice
// employees
import {
  selectIsEmployee,
} from '../employeesSlice'

// default employee profile
import defaultEmployeeProfile from '../../../assets/images/defaults/profiles/male-profile-3.jpg'

// main
// SingleEmployeeDetail
const SingleEmployeeDetail = () => {
  // states from slices
  // employees
  const isEmployee = useSelector(selectIsEmployee) 
  return (
    <div className="flex-grow bg-black bg-opacity-[.1] m-1 rounded-sm flex justify-center">
      <div className="mt-1 flex flex-col items-center">
        {/* image */}
        <div>
          {
            isEmployee.profile 
            ?
            <img src={`${BASE_URL}/${isEmployee.profile}`} alt="" 
              className="w-[120px] h-[120px] rounded-md"
            />
            :
            <img src={defaultEmployeeProfile} alt="" 
              className="w-[120px] h-[120px] rounded-md"
            />
          }
        </div>
        <div>
          <table id="employee-detail-table" className="text-xs text-emerald-700 font-serif">
            <tbody>
              <tr>
                <th>Full Name</th>
                <td>{isEmployee?.first_name} {isEmployee?.last_name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{isEmployee?.email}</td>
              </tr>
              <tr>
                <th>Position</th>
                <td>{isEmployee?.position}</td>
              </tr>
              <tr>
                <th>Salary</th>
                <td>{isEmployee?.sallary} {isEmployee.sallary ? "Bir.": ""}</td>
              </tr>
              </tbody>
          </table>
        </div>
        <div className="max-w-[75%] text-xs text-emerald-700 font-serif my-3">
          <p>
            {isEmployee?.info}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingleEmployeeDetail