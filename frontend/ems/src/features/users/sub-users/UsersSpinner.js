// main
// UsersSpinner
const UsersSpinner = () => {
    return (
      <div>
          <div className="relative flex items-center justify-center mt-12">
              <div className="absolute w-[75px] h-[75px] rounded-full border-4 border-emerald-700 border-r-transparent animate-spin flex items-center justify-center">
                      
              </div>
              <div className="absolute w-[50px] h-[50px] rounded-full border-4 border-emerald-700 border-l-transparent animate-anit-spin">
                      
              </div>
              <div className="absolute w-[25px] h-[25px] rounded-full border-4 border-emerald-700 border-r-transparent animate-spin">
                      
              </div>
          </div>
      </div>
    )
  }
  
  export default UsersSpinner