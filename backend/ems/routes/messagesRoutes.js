const {Router} = require('express')

// controllers
// messages controllers
const {
    messages,
    newMessage,
    deleteMessage,
} = require('../controllers/messagesControllers')

// middlewares
// message file upload middlewares
const {
    messageFileUpload,
} = require('../middlewares/messagesFilesMiddleware')

// router
const router = Router()

// get all messages 
router.get('/messages',messages)

// new message
router.post('/new-message',messageFileUpload.array('files'),newMessage)

// delete message
router.delete('/delete-message/:_id',deleteMessage)

// exports
module.exports = router