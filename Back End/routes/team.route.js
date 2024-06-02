const express = require('express')
const { createTeam, deleteTeam, addSharedWork, getTeams } = require('../controllers/team.controller')
// const getTeams = require('../controllers/team.controller')
// const getTeams = require('../controllers/team.controller')
const router = express.Router()

router.get("/getTeam", getTeams)
router.post("/createTeam", createTeam)
router.post("/deleteTeam", deleteTeam)
router.post("/addSharedWork", addSharedWork)


module.exports = router

