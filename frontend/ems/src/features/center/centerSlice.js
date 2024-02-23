import {createSlice} from '@reduxjs/toolkit'

// initial state
const initialState = {
    centerDir: 'EM',
}

// center slice
const centerSlice = createSlice({
    name: 'center',
    initialState,
    reducers: {
        setCenterDir: (state,action) => {
            state.centerDir = action.payload
        },
    },
    extraReducers: builder => {

    },
})

// exports
// actions
export const {
    setCenterDir,
} = centerSlice.actions
// selectors
export const selectCenterDir = state => state.center.centerDir
// default
export default centerSlice.reducer
