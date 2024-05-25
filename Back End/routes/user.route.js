const express = require('express')
const {loginUser, singupUser, getAllUsers, getUser} = require("../controllers/user.controller")
 
const router = express.Router()

// router.post('/register', singupUser)
router.post('/register', singupUser)
router.post('/login', loginUser)
router.get('/getAll', getAllUsers)
router.get('/user', getUser)



module.exports = router