import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// global constants
import {
    SOCKET,
} from '../../config'

// initialState
const initialState = {
    employeesDir: 'LI',
    employees: [],
    isEmployee: null,
    isNewEmployeePending: false,
    isNewEmployeeDone: false,
    isEmployeeDeleting: false,
    isEmployeeId: null,
}

// get all employess
export const getAllEmployees = createAsyncThunk('employees/getAllEmployees',async () => {
    try{
        const response = await axios.get('/api/employees/all-employees')
        return response.data
    }catch(err){
        return err.response.data
    }
})

// new employee
export const newEmployee = createAsyncThunk('employees/newEmployee',async data => {
    try{
        const response = await axios.post('/api/employees/new-employee',data) 
        return response.data
    }catch(err){
        return err.response.data
    }
})

// update employee
export const updateEmployee = createAsyncThunk('employees/updateEmployee',async data => {
    try{
        const response = await axios.put(`/api/employees/update-employee/${data._id}`,data.formData) 
        return response.data
    }catch(err){
        return err.response.data
    }
})

// delete employee
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee',async _id => {
    try{
        const response = await axios.delete(`/api/employees/delete-employee/${_id}`)
        return response.data
    }catch(err){
        return err.response.data
    }
})


// employees slice
const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployeesDir: (state,action) => {
            state.employeesDir = action.payload
        },
        setIsEmployee: (state,action) => {
            state.isEmployee = action.payload
        },
        resetIsNewEmployeeDone: (state) => {
            state.isNewEmployeeDone = false
        },
        newEmployeeEvent: (state,action) => {
            let employees = [action.payload,...state.employees] 
            let filteredEmployees = [] 
            employees.forEach(employee => {
                let isEmployeeExist = filteredEmployees.find(em => em._id === employee._id) 
                if(!isEmployeeExist){
                    filteredEmployees.push(employee)
                }
            })
            state.employees = filteredEmployees
        },
        deleteEmployeeEvent: (state,action) => {
            state.employees = state.employees.filter(emp => emp._id !== action.payload)
        },
        setIsEmployeeId: (state,action) => {
            state.isEmployeeId = action.payload
        },
        updateEmployeeEvent: (state,action) => {
            let index = state.employees.findIndex(em => em._id === action.payload._id) 
            state.employees[index] = action.payload
        },
    },
    extraReducers: builder => {
        builder
            // cases
            // get all employees
            // fulfilled
            .addCase(getAllEmployees.fulfilled,(state,action)=>{
                if(action.payload.employees){
                    state.employees = action.payload.employees
                }
            })
            // new employee
            // pending
            .addCase(newEmployee.pending,state=>{
                state.isNewEmployeePending = true
            })
            // fulfilled
            .addCase(newEmployee.fulfilled,(state,action)=>{
                state.isNewEmployeePending = false 
                if(action.payload.newEmployee){
                    state.employees = [action.payload.newEmployee,...state.employees]
                    state.isNewEmployeeDone = true 
                    SOCKET.emit('newEmployee',action.payload.newEmployee)
                }
            })
            // rejected
            .addCase(newEmployee.rejected,(state)=>{
                state.isNewEmployeePending = false
            })
            // delete employee
            // pending
            .addCase(deleteEmployee.pending, state => {
                state.isEmployeeDeleting = true
            })
            // fulfilled
            .addCase(deleteEmployee.fulfilled,(state,action)=> {
                state.isEmployeeDeleting = false 
                if(action.payload._id){
                    state.isEmployeeId = null
                    SOCKET.emit('deleteEmployee',action.payload._id)
                }
            })
            // rejected
            .addCase(deleteEmployee.rejected,state => {
                state.isEmployeeDeleting = false
            })
            // update employee
            // pending
            .addCase(updateEmployee.pending, state => {
                state.isNewEmployeePending = true 
            })
            // fulfilled
            .addCase(updateEmployee.fulfilled,(state,action)=>{
                state.isNewEmployeePending = false
                if(action.payload.updatedEmployee){
                    state.isNewEmployeeDone = true 
                    SOCKET.emit('updateEmployee',action.payload.updatedEmployee)
                }
            })
            // rejected
            .addCase(updateEmployee.rejected,state => {
                state.isNewEmployeePending = false 
            })
    },
})

// exports
// actions
export const {
    setEmployeesDir,
    setIsEmployee,
    resetIsNewEmployeeDone,
    newEmployeeEvent,
    deleteEmployeeEvent,
    setIsEmployeeId,
    updateEmployeeEvent,
} = employeesSlice.actions
// selectors
export const selectEmployeesDir = state => state.employees.employeesDir
export const selectEmployees = state => state.employees.employees
export const selectIsEmployee = state => state.employees.isEmployee
export const selectIsNewEmployeePending = state => state.employees.isNewEmployeePending
export const selectIsNewEmployeeDone = state => state.employees.isNewEmployeeDone 
export const selectIsEmployeeDeleting = state => state.employees.isEmployeeDeleting
export const selectIsEmployeeId = state => state.employees.isEmployeeId
// defaults
export default employeesSlice.reducer
