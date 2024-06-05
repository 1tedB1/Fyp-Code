const express = require('express')
const { getPairRequestByUserId, createPairRequest, deletePairRequest } = require('../controllers/pairRequest.controller')

const router = express.Router()

router.post("/getPairRequestByUserId", getPairRequestByUserId)
router.post("/createPairRequest", createPairRequest)
router.post("/deletePairRequest", deletePairRequest)

module.exports = router

