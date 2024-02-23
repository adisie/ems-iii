const {Router} = require('express')

// controllers
const {
    allConnections,
    newConnection,
    deleteConnection,
} = require('../controllers/connectionsControllers')


// router
const router = Router()

// all connections
router.get('/all-connections',allConnections)

// new connection 
router.post('/new-connection',newConnection)

// delete connection
router.delete('/delete-connectio/:_id',deleteConnection)

// exports
module.exports = router