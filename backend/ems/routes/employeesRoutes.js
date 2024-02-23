const {Router} = require('express')

// controllers
const {
    allEmployee,
    newEmployee,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employessControllers')

// middlewares 
// employee profile middleware
const {
    employeeFileUpload,
} = require('../middlewares/employeesFileUploadMiddleware')
// router
const router = Router()

// get all employees
router.get('/all-employees',allEmployee)

// new employee
router.post('/new-employee',employeeFileUpload.single('profile'),newEmployee)

// update employee
router.put('/update-employee/:_id',employeeFileUpload.single('profile'),updateEmployee)

// delete employee
router.delete('/delete-employee/:_id',deleteEmployee)


// exports
module.exports = router
