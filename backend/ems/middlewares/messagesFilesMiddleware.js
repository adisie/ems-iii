const fs = require('fs')
const multer = require('multer')

// message file folder
const messageFileFolder = (req,file) => {
    let path = `./public/uploads/messages/${req.user.username}/files/${file.mimetype.split('/')[0]}`
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive: true})
    }
    return path
}

// storage
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,messageFileFolder(req,file))
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

// message file upload
const messageFileUpload = multer({storage})

// exports
module.exports = {
    messageFileUpload,
}