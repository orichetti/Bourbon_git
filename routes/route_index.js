const express = require('express')
const router = express.Router()
const db = require ("../db/bourbon")
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.get('/', (req, res) => {
    res.render('index')
})
module.exports = router