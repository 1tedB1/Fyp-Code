const express = require('express')
const { createContent, likeContent,disLikeContent,viewContent,removeContent,getAllArticles } = require("../controllers/article.controller")

const router = express.Router()
//define routes based on the functions exported 
router.post('/createContent', createContent)
router.post('/likeContent', likeContent)
router.post('/disLikeContent', disLikeContent)
router.post('/viewContent', viewContent)
router.post('/removeContent', removeContent)
router.get('/getAllArticles', getAllArticles)

module.exports = router