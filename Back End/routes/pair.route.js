const express = require('express');
const { getAllPair, cretaePair, deletePair, shareWorkInPair, addReviewToShareWork } = require('../controllers/pair.controller');
const router = express.Router();


router.get("/getAllPair", getAllPair)
router.post("/cretaePair", cretaePair)
router.post("/deletePair", deletePair)
router.post("/shareWorkInPair", shareWorkInPair)
router.post("/addReviewToShareWork", addReviewToShareWork)

module.exports =  router