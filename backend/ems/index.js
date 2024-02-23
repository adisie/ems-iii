require('dotenv').config()
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const socketio = require('socket.io')

// middlewares
const {
    privateRoutes,
} = require('./middlewares/privateRoutes')

// port
const PROT = process.env.PORT || 5050 
const MONGODB_URL = process.env.MONGODB_URL

// app
const app = express()
// server 
const server = new http.createServer(app)
// io
const io = socketio(server,{
    cors: {
        origin: true,
    }
})

// settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(cookieParser())

// db connection
mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log('CONNECTED')
    server.listen(PROT,()=>{
        console.log('LISTENING')
    })
})
.catch(err => {
    console.log(err)
})

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////  SOCKET.IO ////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// online users
let onlineUsers = [] 

// add new onlie user
const addNewOnlieUser = user => {
    let isOnlineUserExist = onlineUsers.find(usr => usr.userId === user.userId) 
    if(!isOnlineUserExist){
        onlineUsers.push(user)
    }else {
        let index = onlineUsers.findIndex(us => us.userId === user.userId) 
        onlineUsers[index] = user
    }
}

// remove user on logout
const removeUserOnLogout = _id => {
    onlineUsers = onlineUsers.filter(user => user.userId !== _id)
}

// remove user on disconnect
const removeUserOnDisconnect = socketId => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
}

io.on('connect',socket => {
    // users
    // new online user
    socket.on('newOnlineUser',userId => {
        addNewOnlieUser({userId,socketId: socket.id})
        io.emit('onlineUsers',onlineUsers)
    })
    // change user role
    socket.on('changeUserRole',user => {
        io.emit('changeUserRoleEvent',user)
        let isUserOnline = onlineUsers.find(us => us.userId === user._id) 
        if(isUserOnline){
            socket.broadcast.to(isUserOnline.socketId).emit('myRoleChageEvent',user)
        }
    })
    // user logout
    socket.on('userLogout',_id => {
        removeUserOnLogout(_id)
        io.emit('onlineUsers',onlineUsers)
    })
    // user disconnect
    socket.on('disconnect',()=>{
        removeUserOnDisconnect(socket.id)
        io.emit('onlineUsers',onlineUsers)
    })
    // new user signup
    socket.on('userSignup',user => {
        io.emit('userSignupEvent',user)
    })
    io.emit('onlineUsers',onlineUsers)
    // profiles
    // new profile
    socket.on('addNewProfile',profile => {
        io.emit('addNewProfileEvent',profile)
    })
    // delete profile
    socket.on('deleteProfile',profile => {
        io.emit('deleteProfileEvent',profile)
    })
    // connection event for chat
    socket.on('newConnection',connection=>{
        io.emit('newConnectionEvent',connection)
    })

    // messageing 
    // new message event
    socket.on('newMessage',data => {
        let user = onlineUsers.find(user => user.userId === data.receverId) 
        if(user){
            socket.to(user.socketId).emit('newMessageEvent',data.newMessage)
        }
    })

    // delete message event
    socket.on('deleteMessage',data => {
        let user = onlineUsers.find(user => user.userId === data.receverId) 
        if(user){
            socket.to(user.socketId).emit('deleteMessageEvent',data._id)
        }
    })

    // message typing event
    socket.on('messageTyping',data => {
        let user = onlineUsers.find(user => user.userId === data.receiverId)
        if(user){
            socket.to(user.socketId).emit('messageTypingEvent',data)
        }
    })
    // message sent
    socket.on('messageSent',data => {
        let user = onlineUsers.find(user => user.userId === data.receiverId)
        if(user){
            socket.to(user.socketId).emit('messageSentEvent',data)
        }
    })

    // employees
    // new employee event 
    socket.on('newEmployee',newEmployee=>{
        io.emit('newEmployeeEvent',newEmployee)
    })
    // delete employee event
    socket.on('deleteEmployee',_id => {
        io.emit('deleteEmployeeEvent',_id)
    })
    // update employee event
    socket.on('updateEmployee',updatedEmployee=>{
        io.emit('updateEmployeeEvent',updatedEmployee)
    })
})


// routes
// users routes
app.use('/api/users',require('./routes/usersRoutes'))
// profiles routes
app.use('/api/profiles',privateRoutes,require('./routes/profilesRoutes'))
// connections routes
app.use('/api/connections',privateRoutes,require('./routes/connectionsRoute'))
// employees routes
app.use('/api/employees',privateRoutes,require('./routes/employeesRoutes'))
// messages routes
app.use('/api/messages',privateRoutes,require('./routes/messagesRoutes'))

// public
app.use('/public',express.static('public'))

