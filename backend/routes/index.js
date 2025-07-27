const express = require('express')
const router = express.Router()
// router
const userRouter = require('./auth')
const reportRouter = require('./client')
const adminReportRouter = require('./admin')

// Coman router
// auth router
router.use('/auth', userRouter)


// User router

// user report router
router.use('/report', reportRouter)
// rouetr.use('/dashboard')


// Admin router

// admin report router
router.use('/adminreport', adminReportRouter)

module.exports = router