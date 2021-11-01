// if (process.env.NODE_ENV !== 'production'){
//    require('dotenv').parse() //.load()
// }

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const db = '/Bourbon.db';
const sqlite3 = require('sqlite3').verbose();

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)

const dbc = new sqlite3.Database('./Bourbon.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message)
console.log(`Connected to ${db}`)
})



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));