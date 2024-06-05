const express = require("express")
const { getAllChat, sendChat, deleteChat, viewChat, editChat } = require("../controllers/chat.controller")

const router = express.Router()

router.get("/getAllChats", getAllChat)
router.post("/sendChat",sendChat)
router.post("/deleteChat",deleteChat)
router.post("/viewChat",viewChat)
router.post("/editChat",editChat)

module.exports = router


