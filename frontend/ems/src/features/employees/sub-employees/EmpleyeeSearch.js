
// icons
// search
import { CiSearch } from "react-icons/ci"

// main
// EmployeeSearch
const EmpleyeeSearch = () => {
  return (
    <div className="flex items-center rounded-full bg-black bg-opacity-[.25] px-1">
        <CiSearch className="text-xl"/>
        <input type="text" placeholder="username" 
            className="focus:outline-none bg-transparent"
        />
    </div>
  )
}

export default EmpleyeeSearch