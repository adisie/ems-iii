import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {SOCKET} from '../../config'

// initial state
const initialState = {
    profiles: [],
    isProfileId: null,
    userProfiles: [],
    currentProfileIndex: null, 
    isProfileUploading: false,
    isProfileDeleteing: false,
}

// get all profiles
export const getAllProfiles = createAsyncThunk('profiles/getAllProfiles',async () => {
    try{
        const response = await axios.get('/api/profiles/all-profiles')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// add new profile
export const addNewProfile = createAsyncThunk('profiles/addNewProfile',async data => {
    try{
        const response = await axios.post('/api/profiles/new-profile',data)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// delete profile
export const deleteProfile = createAsyncThunk('profiles/deleteProfile',async _id => {
    try{
        const response = await axios.delete(`/api/profiles/delete-profile/${_id}`)
        return response.data
    }catch(err){
        return err.response.data
    }
})

// profiles slice
const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        setIsProfileId: (state,action) => {
            state.isProfileId = action.payload
            let userProfiles = state.profiles.find(profile => profile._id === action.payload) 
            state.userProfiles = userProfiles.profiles
            state.currentProfileIndex = state.userProfiles.length - 1
        },
        imageNavigator: (state,action) => {
            if(action.payload > 0){
                if(state.currentProfileIndex === 0){
                    state.currentProfileIndex = state.userProfiles.length - 1
                }else{
                    state.currentProfileIndex = state.currentProfileIndex - 1
                }
            }else{
                if(state.currentProfileIndex === state.userProfiles.length - 1){
                    state.currentProfileIndex = 0
                }else{
                    state.currentProfileIndex = state.currentProfileIndex + 1
                }
            }
        },
        addNewProfileEvent: (state,action) => {
            let index = state.profiles.findIndex(profile => profile._id === action.payload.userId) 
            let userProfiles = state.profiles.find(profile => profile._id === action.payload.userId)
            
            if(!userProfiles?.profiles){
                userProfiles.profiles = []
            }
            let profiles = [...userProfiles.profiles,{_id: action.payload._id,profilePath: action.payload.profilePath}] 
            let filteredProfiles = [] 
            profiles.forEach(profile => {
                let isProfileExist = filteredProfiles.find(pro => pro._id === profile._id) 
                if(!isProfileExist){
                    filteredProfiles.push(profile)
                }
            }) 
            // console.log(filteredProfiles) 

            state.profiles.at(index).profiles = filteredProfiles 
            state.userProfiles = filteredProfiles 
            state.currentProfileIndex = filteredProfiles.length - 1

        },
        deleteProfileEvent: (state,action) => {
            let index = state.profiles.findIndex(profile => profile._id === action.payload.userId) 
            let userProfiles = state.profiles.find(profile => profile._id === action.payload.userId) 
            let finalProfiles = userProfiles?.profiles 
            finalProfiles = finalProfiles.filter(profile => profile._id !== action.payload._id) 
            state.profiles.at(index).profiles = finalProfiles 
            if(state.isProfileId){
                state.userProfiles = finalProfiles 
                if(finalProfiles.length > 0){
                    state.currentProfileIndex = finalProfiles.length - 1
                }
            }
        },
        addNewUserProfileEvent: (state,action) => {
            let profiles = [...state.profiles,{_id: action.payload,profiles: []}] 
            let filteredProfiles = [] 
            profiles.forEach(profile => {
                let isProfileExist = filteredProfiles.find(pro => pro._id === profile._id) 
                if(!isProfileExist){
                    filteredProfiles.push(profile)
                }
            })
            state.profiles = filteredProfiles
        },
    },
    extraReducers: builder => {
        builder
            // cases
            // get all profiles
            // fulfilled
            .addCase(getAllProfiles.fulfilled,(state,action)=>{
                if(action.payload.profiles){
                    state.profiles = action.payload.profiles
                }
            })
            // add new profile
            // pending
            .addCase(addNewProfile.pending, state => {
                state.isProfileUploading = true
            })
            // fulfilled
            .addCase(addNewProfile.fulfilled,(state,action)=>{
                state.isProfileUploading = false 
                if(action.payload.profile){
                    SOCKET.emit('addNewProfile',action.payload.profile)
                }
            })
            // rejected
            .addCase(addNewProfile.rejected, state => {
                state.isProfileUploading = false
            })
            // deleting profile
            // pending
            .addCase(deleteProfile.pending,state => {
                state.isProfileDeleteing = true 
            })
            // fulfilled
            .addCase(deleteProfile.fulfilled,(state,action)=>{
                state.isProfileDeleteing = false
                if(action.payload._id){
                    SOCKET.emit('deleteProfile',action.payload)
                }
            })
            // rejected
            .addCase(deleteProfile.rejected,state=>{
                state.isProfileDeleteing = false
            })
    },
})

// exports
// actions
export const {
    setIsProfileId,
    imageNavigator,
    addNewProfileEvent,
    deleteProfileEvent,
    addNewUserProfileEvent,
} = profilesSlice.actions
// selectors
// profiles
export const selectProfiles = state => state.profiles.profiles
// isProfilesId
export const selectIsProfileId = state => state.profiles.isProfileId
// userProfiles
export const selectUserProfiles = state => state.profiles.userProfiles 
// currentIndex
export const selectCurrentProfileIndex = state => state.profiles.currentProfileIndex
// isProfileUploading
export const selectIsProfileUploading = state => state.profiles.isProfileUploading 
// isProfileDeleting
export const selectIsProfileDeleting = state => state.profiles.isProfileDeleteing 
// default exports
export default profilesSlice.reducer