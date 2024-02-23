import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

import {SOCKET} from '../../config'

const initialState = {
    connections: [],
    isChat: null,
    isConnectingDone: false,
    isConnectingPending: false,
    isConnectionId: null,
    connectionReceiverId: null,
}

// all connections
export const allConnections = createAsyncThunk('chats/allConnections',async () => {
    try{
        const response = await axios.get('/api/connections/all-connections')
        return response.data
    }catch(err){
        return err.response.data
    }
})
// new chats
export const newChat = createAsyncThunk('chats/newChat',async data => {
    try{
        const response = await axios.post('/api/connections/new-connection',{receiverId: data})
        return response.data
    }catch(err){
        return err.response.data
    }
})

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setIsChat: (state,action) => {
            state.isChat = action.payload
        },
        resetIsConnectingDone: state => {
            state.isConnectingDone = false
        },
        newConnectionEvent: (state,action) => {
            let connections = [...state.connections,action.payload] 
            let filteredConnections = [] 
            connections.forEach(connection => {
                let isConnectionExist = filteredConnections.find(con =>con._id === connection._id) 
                if(!isConnectionExist){
                    filteredConnections.push(connection)
                }
            })
            state.connections = filteredConnections
        },
        setIsConnectionId: (state,action) => {
            state.isConnectionId = action.payload
        },
        setConnectionReceiverId: (state,action) => {
            state.connectionReceiverId = action.payload 
        },
    },
    extraReducers: builder => {
        builder
            // cases
            // all connections 
            // fulfilled
            .addCase(allConnections.fulfilled,(state,action)=>{
                if(action.payload.connections){
                    state.connections = action.payload.connections
                }
            })
            // new chat
            // pending
            .addCase(newChat.pending,state=>{
                state.isConnectingPending = true 
            })
            // fulfilled
            .addCase(newChat.fulfilled,(state,action)=>{
                state.isConnectingPending = false
                if(action.payload.newConnection){
                    state.isConnectingDone = true 
                    state.isConnectionId = null
                    SOCKET.emit('newConnection',action.payload.newConnection)
                    state.isChat = action.payload.newConnection 
                }
            })
            // rejected
            .addCase(newChat.rejected,state => {
                state.isConnectingPending = false
                state.isChat = null
                state.isConnectionId = null
            })
    }
})

// actions
export const {
    setIsChat,
    resetIsConnectingDone,
    newConnectionEvent,
    setIsConnectionId,
    setConnectionReceiverId,
} = chatsSlice.actions

// selcectors
export const selectConnections = state => state.chats.connections
export const selectIsChat = state => state.chats.isChat
export const selectIsConnectingDone = state => state.chats.isConnectingDone
export const selectIsConnectionPending = state => state.chats.isConnectingPending 
export const selectIsConnectionId = state => state.chats.isConnectionId

export default  chatsSlice.reducer
