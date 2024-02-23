const fs = require('fs')
const multer = require('multer')

// create folder
const createFolder = () => {
    let path = './public/uploads/employees/profiles' 
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive: true})
    }
    return path
}
// storage
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,createFolder())
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

// employee file upload
const employeeFileUpload = multer({storage})

// exports
module.exports = {
    employeeFileUpload,
}