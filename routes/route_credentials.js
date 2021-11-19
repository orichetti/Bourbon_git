if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


const express = require('express')
const fs = require('fs')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')

const router = express.Router()
const db = '/Bourbon.db'
const users = []
// const sqlite3 = require('sqlite3').verbose()
// const dbB = require ("../db/bourbon")
router.use(express.urlencoded({ extended: false }))
router.use(express.json())
router.use(flash())
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

router.get('/', (req, res) => { 
    res.render("./index.ejs", { data: "req.user.name" }) 
})
router.get('/users', (req, res) => {
    const data = JSON.stringify(users)
    res.render("credentials/login", {data: data})
})
router.get('/login', (req, res) => {
    const data = " "
    res.render("credentials/login", {data: data})
})
router.post('/login', async(req, res) => {
    const user = users.find(user => user.email === req.body.email)
    if (user == null || user.email != req.body.email){
        const data = "Cannot find email address..."
        return res.render("credentials/login", {data: data})
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            const data = `Wecome Back, glad you're here...`
            return res.render("credentials/login", {data: data})
        } else {
            const data = "Incorrect Password..."
            return res.render("credentials/login", {data: data})
        }
    } catch (error){
        const data = error
        return res.render("credentials/login", {data: data})
    }
})

router.get('/register', (req, res) => {
    const data = ""
    res.render("credentials/register", {data: data})
})
router.post('/register', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        res.render("credentials/login", { data: JSON.stringify(users) })
    } catch {
        res.render('/credentials/register', { data: JSON.stringify(users) })
    }
    console.log(users)
})

module.exports = router