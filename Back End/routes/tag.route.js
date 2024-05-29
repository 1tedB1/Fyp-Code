const express = require('express')
const {createTag, getAllTags} = require("../controllers/tag.controller")
const router = express.Router()

router.get("/getAllTags", getAllTags)
router.post("/createTag", createTag)

module.exports = router

