const express = require('express')
const { createContent, likeContent,disLikeContent,viewContent,removeContent,getAllArticles, updateArticle } = require("../controllers/article.controller")

const router = express.Router()
//define routes based on the functions exported 
router.post('/createArticle', createContent)
router.post('/likeArticle', likeContent)
router.post('/disLikeArticle', disLikeContent)
router.post('/viewArticle', viewContent)
router.post('/removeArticle', removeContent)
router.get('/getAllArticles', getAllArticles)
router.put('/updateArticle', updateArticle)


module.exports = router