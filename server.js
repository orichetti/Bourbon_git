const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const indexRouter = require('./routes/route_index')
const distillerRouter = require('./routes/route_distillers')
const credentialsRouter = require('./routes/route_credentials')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('src'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', indexRouter)
app.use('/distillers', distillerRouter)
app.use('/credentials', credentialsRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`))