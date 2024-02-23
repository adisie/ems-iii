
// main
// PendingPage
const PendingPage = () => {
  return (
    <div className="flex-grow flex justify-center pt-7">
        <div className="flex-grow max-w-[1050px] mx-auto px-3 flex justify-center">
            <div className="flex flex-col items-center text-emerald-700 text-xs font-serif">
                <div>Your  account is Pending</div>
                <ul id="penfing-list">
                  <li id="pending-i"></li>
                  <li id="pending-ii"></li>
                  <li id="pending-iii"></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default PendingPage