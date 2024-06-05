const express = require('express')
const {loginUser, singupUser, getAllUsers, getUser, editProfile, blockUser, unblockUser} = require("../controllers/user.controller")
 
const router = express.Router()

// router.post('/register', singupUser)
router.post('/register', singupUser)
router.post('/login', loginUser)
router.get('/getAll', getAllUsers)
router.post('/getUser', getUser)
router.put('/editProfile', editProfile)
router.post('/blockUser', blockUser)
router.post('/unblockUser', unblockUser)  


module.exports = router