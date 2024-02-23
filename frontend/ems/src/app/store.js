import {configureStore} from '@reduxjs/toolkit'

// reducers
// users reducer
import usersReducer from '../features/users/usersSlice'
// center reducer
import centerReducer from '../features/center/centerSlice'
// employees reducer
import employeesReducer from '../features/employees/employeesSlice'
// profiles reducer
import profilesReducer from '../features/profiles/profilesSlice'
// chats reducer
import chatsReducer from '../features/chats/chatsSlice'
// messages reducer
import messagesReducer from '../features/messages/messagesSlice'

// store
export const store = configureStore({
    reducer: {
        users: usersReducer,
        center: centerReducer,
        employees: employeesReducer,
        profiles: profilesReducer,
        chats: chatsReducer,
        messages: messagesReducer,
    }
})
