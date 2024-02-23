const fs = require('fs')
// models
const Employee = require('../models/employeeModel')

// all employee
const allEmployee = async (req,res) => {
    try{
        const employees = await Employee.find().sort({first_name: 1}) 
        res.status(200).json({employees})
    }catch(err){
        res.status(400).json({
            error: 'get all employees error'
        })
    }
}

// new employee
const newEmployee = async (req,res) => {
    try{
        const {first_name,last_name,email,position,sallary,info} = req.body 
        const profile = req.file?.path 
        const newEmployee = await Employee.create({first_name,last_name,email,position,sallary,info,profile})
        res.status(200).json({newEmployee})
    }catch(err){
        res.status(400).json({
            error: 'new employee error'
        })
    }
}

// update employee
const updateEmployee = async (req,res) => {
    try{
        const {first_name,last_name,email,position,sallary,info} = req.body 
        const profile = req.file?.path 
        const employee = await Employee.findById(req.params._id) 
        if(profile && employee.profile){
            if(fs.existsSync(employee.profile)){
                fs.unlinkSync(employee.profile)
            }
        }
        const updatedEmployee = await Employee.findByIdAndUpdate({_id: req.params._id},{$set: {
            first_name,
            last_name,
            email,
            position,
            sallary,
            info,
            profile,
        }},{new: true})
        res.status(200).json({updatedEmployee})
    }catch(err){
        res.status(400).json({
            error: 'update employee detail error'
        })
    }
}

// delete employee
const deleteEmployee = async (req,res) => {
    try{
        const employee = await Employee.findById(req.params._id) 
        if(!employee){
            return res.status(400).json({
                error: 'employee detail not found'
            })
        }
        if(fs.existsSync(employee.profile)){
            fs.unlinkSync(employee.profile)
        }
        await employee.deleteOne()
        res.status(200).json({
            message: 'employee detail deleted successfuly',
            _id: req.params._id,
        })
    }catch(err){
        res.status(400).json({
            error: 'delete employee detail error'
        })
    }
}

// exports
module.exports = {
    allEmployee,
    newEmployee,
    updateEmployee,
    deleteEmployee,
}