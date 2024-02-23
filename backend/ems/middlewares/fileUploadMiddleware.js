const multer = require('multer')
const fs = require('fs')

// generate folder
// profile file
const createFolderProfileFile = req => {
    let path = `./public/uploads/profiles/${req.user.username}`
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive: true})
    }
    return path
}

// profile file
const profileFile = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,createFolderProfileFile(req))
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})


// profileFile
const profileUpload = multer({storage:profileFile})

// exports
module.exports = {
    profileUpload,
}