const express = require('express')
const {createCompetition, getAllCompetitions, addEntry} = require("../controllers/competition.controller")
// const addEntry = require('../controllers/competition.controller')
const router = express.Router()

// console.log(addEntry);

router.get("/getAllCompetitions", getAllCompetitions)
router.post("/createCompetition", createCompetition)
router.post("/addEntry", addEntry)


module.exports = router

