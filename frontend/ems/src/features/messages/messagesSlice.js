import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {SOCKET} from '../../config'

// initial state
const initialState = {
    messages: [],
    myMessages: [],
    isMessageSending: false,
    isMessageDeleting: false,
    receverId: null,
    isMessageTyping: null,
}

// get all messages
export const getAllMessages = createAsyncThunk('messages/getAllMessages',async () => {
    try{
        const response = await axios.get('/api/messages/messages')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// new message
export const newMessage = createAsyncThunk('messages/newMessage',async data => {
    try{
        const response = await axios.post('/api/messages/new-message',data)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// delete message
export const deleteMessage = createAsyncThunk('messages/deleteMessage',async _id => {
    try{
        const response = await axios.delete(`/api/messages/delete-message/${_id}`)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// messages slice
const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMyMessages: (state,action)=>{
            console.log(action.payload)
        },
        setReceiverId: (state,action) => {
            state.receverId = action.payload
        },
        newMessageEvent: (state,action) => {
            let allMessages = [...state.messages,action.payload] 
            let filteredMessages = [] 
            allMessages.forEach(message => {
                let isMessageExist = filteredMessages.find(msg => msg._id === message._id) 
                if(!isMessageExist){
                    filteredMessages.push(message)
                }
            })
            state.messages = filteredMessages
        },
        deleteMessageEvent: (state,action) => {
            state.messages = state.messages.filter(message => message._id !== action.payload)
        },
        // message typing
        setIsMessageTping: (state,action) => {
            state.isMessageTyping = action.payload
        },
    },
    extraReducers: builder => {
        builder
            // cases
            // get all messages
            // fulfilled 
            .addCase(getAllMessages.fulfilled,(state,action)=>{
                if(action.payload.messages){
                    state.messages = action.payload.messages 
                }
            })
            // new message
            // pending
            .addCase(newMessage.pending, state => {
                state.isMessageSending = true
            })
            // fulfilled
            .addCase(newMessage.fulfilled,(state,action)=>{
                state.isMessageSending = false 
                if(action.payload.newMessage){
                    state.messages = [...state.messages,action.payload.newMessage]
                    SOCKET.emit('newMessage',{newMessage: action.payload.newMessage,receverId: state.receverId})
                }
            })
            // rejected
            .addCase(newMessage.rejected,state=>{
                state.isMessageSending = false
            })
            // delete message
            // pending
            .addCase(deleteMessage.pending, state => {
                state.isMessageDeleting = true
            })
            // fulfilled
            .addCase(deleteMessage.fulfilled,(state,action)=> {
                state.isMessageDeleting = false 
                if(action.payload._id){
                    state.messages = state.messages.filter(message => message._id !== action.payload._id)
                    SOCKET.emit('deleteMessage',{_id:action.payload._id,receverId: state.receverId})
                }
            })
            // rejected
            .addCase(deleteMessage.rejected, state => {
                state.isMessageDeleting = false
            })
    }
})

// actions 
export const {
    setMyMessages,
    setReceiverId,
    newMessageEvent,
    deleteMessageEvent,
    setIsMessageTping,
} = messagesSlice.actions
// selectors
// messages
export const selectMessages = state => state.messages.messages
// isMessageTyping
export const selectIsMessageTyping = state => state.messages.isMessageTyping 
// exports
export default messagesSlice.reducer