const express = require('express')
const router = express.Router()
const db = '/Bourbon.db'
const sqlite3 = require('sqlite3').verbose()
const dbB = require ("../db/bourbon")
const dbT = require("../db/testdbconnection")
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

const dbc = new sqlite3.Database('./Bourbon.db', sqlite3.OPEN_READWRITE)//, (err) => {
        //     if(err) return console.error(err.message)
        console.log(`Connection Succsessful to: ${db}`)

// All Bourbon Route
router.get('/', async(req, res) => { 
    res.render("/index.ejs") 
})
// router.get('/view', async(req, res, next) => {
//     //const data = "what what"
//     const data = await dbT.getAll()
//     console.log(data)    
//     res.render("distillers/view", { data: data })
// })
router.get('/view', async(req, res) => {
    //const data = "what what"
    const data = await dbB.getAllBourbon()
    console.log(typeof data)
    res.render("distillers/view", { data: data })
})

// New Bourbon Route
router.get('/new', (req, res) => { 
    var bourbon = ''
    res.render('distillers/new', { bourbon: bourbon})
})
// Create Bourbon Route
router.post('/new', async(req, res) => {
    var name = req.body.name
    var brand = req.body.brand
    var distiller = req.body.distiller
    var age = req.body.age
    var proof = req.body.proof
    var alcVol = req.body.alcVol
    var type = req.body.type
    var distWebsite = req.body.distWebsite
    var bourbon = JSON.stringify(`MMMMM, Great Choice :${name}, :${brand}, :${distiller}, :${age}, :${proof}, :${alcVol}, :${type}, :${distWebsite} has been added to the Database.`)
    const results = await dbB.createBourbon(req.body)
    res.render('distillers/new', {bourbon: bourbon})
})
 // Delete Bourbon Route
router.delete('/remove/:id', async(req, res, next) =>{
    var id = req.body.id
    console.log(id)
    var bourbon = JSON.stringify(`So Sorry to see ${id} removed from this collection...`)
    //console.log(JSON.stringify(`So Sorry to see ${id} removed from this collection...`))
    const results = await dbB.deleteBourbon(req.body.id)
    res.render('distillers/remove', {bourbon: bourbon})
})
router.get('/remove', async(req, res) =>{
    var bourbon = ""
    res.render('distillers/remove', {bourbon: bourbon})
})
// Update Bourbon
router.get('/update', async(req, res) => {
    const bourbon = ""
    res.render("distillers/update", { bourbon: bourbon })
})
router.patch('/update/:id', async(req, res) => {
    var id = req.body.id
    var data = [
        req.body.name,
        req.body.brand,
        req.body.distiller,
        req.body.age,
        req.body.proof,
        req.body.alcVol,
        req.body.type,
        req.body.size,
        req.body.distWebsite
    ]
    var bourbon = JSON.stringify(`Thanks for making this right :${id}, :${data} has been updated in the Database.`)
    const results = await dbB.updateBourbon(req.body.id, {
            name: req.body.name,
            brand: req.body.brand,
            distiller: req.body.distiller,
            age: req.body.age,
            proof: req.body.proof,
            alcVol: req.body.alcVol,
            size: req.body.size,
            type: req.body.type,

            distWebsite: req.body.distWebsite
    })
    res.render("distillers/updateid", { bourbon: bourbon })
})

module.exports = router