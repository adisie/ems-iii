
// sub-chats
import ChatsHeader from "./sub-chats/ChatsHeader"
import ChatsBox from "./sub-chats/ChatsBox"
// main
// Chats
const Chats = () => {
  return (
    <div className="flex-grow bg-black bg-opacity-[.1] m-1 rounded-sm flex flex-col">
      <ChatsHeader />
      <ChatsBox />
    </div>
  )
}

export default Chats