const {Router} = require('express')

// controllers
// usersControllers
const {
    signup,
    login,
    logout,
    checkAuth,
    allUsers,
    changeUserRole,
} = require('../controllers/usersControllers')

// middlewares
// privateRoutes
const {
    privateRoutes,
} = require('../middlewares/privateRoutes')

const router = Router()

// signup
router.post('/signup',signup)

// login
router.post('/login',login)

// logout
router.get('/logout',logout)

// chec-auth
router.get('/check-auth',privateRoutes,checkAuth)

//all-users
router.get('/all-users',allUsers)
// change-user-role
router.put('/change-user-role',privateRoutes,changeUserRole)

// exports
module.exports = router