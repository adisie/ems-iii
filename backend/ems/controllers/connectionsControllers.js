
// models
const Connection = require('../models/connectionsModel')

// all connections
const allConnections = async (req,res) => {
    try{
        const connections = await Connection.find()
        res.status(200).json({connections})
    }catch(err){
        res.status(400).json({
            error: 'get all connection error'
        })
    }
}

// new connection
const newConnection = async (req,res) => {
    try{
        const members = [req.user._id,req.body.receiverId] 
        const newConnection = await Connection.create({members})
        res.status(200).json({newConnection})
    }catch(err){
        res.status(200).json({
            error: 'new connection error'
        })
    }
}

// delete connection
const deleteConnection = (req,res) => {
    res.status(200).json('delete connection')
}

// exports
module.exports = {
    allConnections,
    newConnection,
    deleteConnection,
}