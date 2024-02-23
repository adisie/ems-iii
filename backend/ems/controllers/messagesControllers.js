// models
const Message = require('../models/messagesModel')
const Connection = require('../models/connectionsModel')

// all messages
const messages = async (req,res) => {
    try{
        const myConnections = await Connection.find({members: {$in: [req.user._id]}})
        let connectionIds = myConnections.map(con => con._id) 
        
        const messages = await Message.find({connectionId: {$in: [...connectionIds]}})  
        
        res.status(200).json({messages})
    }catch(err){
        res.status(400).json({
            error: 'get all messages error'
        })
    }
}

// new message 
const newMessage = async (req,res) => {
    try{
        const {connectionId,message} = req.body 
        const senderId = req.user._id 
        const newMessage = await Message.create({connectionId,senderId,message}) 
        res.status(200).json({newMessage})
    }catch(err){
        res.status(400).json({
            error: 'new message error'
        })
    }
}

// delete message
const deleteMessage = async (req,res) => {
    try{
        const message = await Message.findById(req.params._id) 
        if(!message){
            return res.status(400).json({
                error: 'message not found'
            })
        }
        await message.deleteOne()
        res.status(200).json({
            message: 'message deleted successfuly',
            _id: req.params._id
        })
    }catch(err){
        res.status(400).json({
            error: 'delete message error'
        })
    }
}

// exports
module.exports = {
    messages,
    newMessage,
    deleteMessage,
}