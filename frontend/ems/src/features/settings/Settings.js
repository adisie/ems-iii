
// icons
import { IoMdSettings } from "react-icons/io"

// main
// Settings
const Settings = () => {
  return (
    <div className="flex-grow flex p-1">
      <div className="flex-grow bg-black bg-opacity-[.13] rounded-sm flex items-center justify-center">
        <div className="flex flex-col items-center text-xl font-serif text-emerald-700">
          <div className="opacity-[.3]">
            Account Configration
          </div>
          <div className="my-5 text-5xl animate-spin opacity-[.35]">
            <IoMdSettings />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings