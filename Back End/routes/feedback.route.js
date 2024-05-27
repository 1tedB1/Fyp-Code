const express = require('express')
const {createFeedback, removeFeedback,getFeedback,getReplies, getAllFeedback} = require("../controllers/feedback.controller")
 
const router = express.Router()

// router.post('/register', singupUser)
router.post('/createFeedback', createFeedback)
router.post('/removeFeedback', removeFeedback)
router.post('/getFeedback', getFeedback)
router.post('/getReplies', getReplies)
router.get('/getAllFeedback',getAllFeedback)

module.exports = router