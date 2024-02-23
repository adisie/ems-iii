import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {SOCKET} from '../../config'

// local user
const localUser = JSON.parse(localStorage.getItem('user'))
// initialState
const initialState = {
    usersDir: 'LI',
    user: localUser ? localUser : null,
    users: [],
    isUserPending: false,
    errors: [],
    onlineUsers: [],
    isUserId: null,
    isChangingRole: false,
}

// signup
export const signup = createAsyncThunk('users/signup',async data => {
    try{
        const response = await axios.post('/api/users/signup',data) 
        return response.data
    }catch(err){
        return err.response.data
    }
})

// login
export const login = createAsyncThunk('users/login',async data => {
    try{
        const response = await axios.post('/api/users/login',data) 
        return response.data
    }catch(err){
        return err.response.data
    }
})

// logout
export const logout = createAsyncThunk('users/logout',async () => {
    try{
        const response = await axios.get('/api/users/logout')
        return response.data
    }catch(err){
        return err.response.data
    }
})


// all users
export const getAllUsers = createAsyncThunk('users/getAllUsers',async () => {
    try{
        const response = await axios.get('/api/users/all-users')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// change role
export const changeUserRole = createAsyncThunk('users/changeUserRole',async data => {
    try{
        const response = await axios.put('/api/users/change-user-role',data)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// auth-check 
export const authCheck = createAsyncThunk('users/authCheck',async () => {
    try{
        const response = await axios.get('/api/users/check-auth')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// users slice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // set users directions
        setUsersDir: (state,action) => {
            state.usersDir = action.payload
        },
        resetErrors: state => {
            state.errors = null
        },
        setOnlineUsers: (state,action) => {
            state.onlineUsers = action.payload
        },
        setIsUserId: (state,action) => {
            state.isUserId = action.payload
        },
        setUsers: (state,action) => {
            let index = state.users.findIndex(user => user._id === action.payload._id) 
            state.users[index] = action.payload
        },
        setUser: (state,action) => {
            state.user = action.payload 
            localStorage.setItem('user',JSON.stringify(action.payload))
        },
        userSignupEvent: (state,action) => {
            let allUsers = [...state.users,action.payload] 
            let filtedUsers = [] 
            allUsers.forEach(user => {
                let isUserExist = filtedUsers.find(us => us._id === user._id) 
                if(!isUserExist){
                    filtedUsers.push(user)
                }
            })
            state.users = filtedUsers
        }
    },
    extraReducers: builder => {
        builder
            // cases
            // signup
            // pending
            .addCase(signup.pending, state => {
                state.isUserPending = true 
            })
            // fulfilled
            .addCase(signup.fulfilled,(state,action)=>{
                state.isUserPending = false 
                if(action.payload.user){
                    state.user = action.payload.user 
                    state.errors = null
                    localStorage.setItem('user',JSON.stringify(action.payload.user))
                    SOCKET.emit('userSignup',action.payload.user)
                    SOCKET.emit('newOnlineUser',action.payload.user._id)
                }else if(action.payload.errors){
                    state.errors = action.payload.errors
                }
            })
            // rejected
            .addCase(signup.rejected, state => {
                state.isUserPending = false
                console.log('signup rejected')
            })
            // login
            // pending
            .addCase(login.pending, state => {
                state.isUserPending = true
            })
            // fulfilled
            .addCase(login.fulfilled,(state,action)=>{
                state.isUserPending = false 
                if(action.payload.user){
                    state.user = action.payload.user 
                    state.errors = null
                    localStorage.setItem('user',JSON.stringify(action.payload.user))
                    SOCKET.emit('newOnlineUser',action.payload.user._id)
                }else if(action.payload.errors){
                    state.errors = action.payload.errors
                }
            })
            // rejected
            .addCase(login.rejected, state => {
                state.isUserPending = false 
                console.log('login rejected')
            })
            // get all users
            // fulfilled case
            .addCase(getAllUsers.fulfilled,(state,action)=>{
                if(action.payload.users){
                    state.users = action.payload.users
                }
            })
            // logout
            // fulfilled case
            .addCase(logout.fulfilled,(state,action)=>{
                if(action.payload.message === 'logged out'){
                    SOCKET.emit('userLogout',state.user._id)
                    state.user = null
                    localStorage.removeItem('user')
                }
            })
            // changing role
            // pending
            .addCase(changeUserRole.pending,state => {
                state.isChangingRole = true 
            })
            // fulfilled
            .addCase(changeUserRole.fulfilled,(state,action)=>{
                state.isChangingRole = false 
                state.isUserId = null 
                if(action.payload.user){
                    SOCKET.emit('changeUserRole',action.payload.user)
                }
            })
            // rejected
            .addCase(changeUserRole.rejected, state => {
                state.isChangingRole = false 
                state.isUserId = null
            })
            // auth check
            // fulfilled
            .addCase(authCheck.fulfilled,(state,action)=>{
                if(action.payload.error === 'unauthorized'){
                    state.user = null 
                    localStorage.removeItem('user')
                }
            })
    },
})

// exports
// actions
export const {
    setUsersDir,
    resetErrors,
    setOnlineUsers,
    setIsUserId,
    setUsers,
    setUser,
    userSignupEvent,
} = usersSlice.actions

// selectors
// usersDir
export const selectUsersDir = state => state.users.usersDir
// user
export const selectUser = state => state.users.user
// isUserPending
export const selectIsUserPending = state => state.users.isUserPending 
// errors
export const selectErrors = state => state.users.errors 
// users
export const selectUsers = state => state.users.users 
// onlineUsers
export const selectOnlineUsers = state => state.users.onlineUsers 
// isUserId
export const selectIsUserId = state => state.users.isUserId
// isChangingRole
export const selectIsChangingRole = state => state.users.isChangingRole

// defaults
export default usersSlice.reducer


