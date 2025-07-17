const express = require("express")
// Server Creatation
const app = express()
const PORT = 8080
// Database Connection
const connectDB = require('./DB/connectDB')
// middleware require
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes/index')

connectDB()

// middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use(routes)

app.listen(PORT, ()=>
    console.log(`http://localhost:${PORT}`)
)