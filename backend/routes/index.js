const express = require('express')
const router = express.Router()
// router
const userRouter = require('./auth')
const reportRouter = require('./client/report')
const adminReportRouter = require('./admin/report')

// Coman router
// auth router
router.use('/auth', userRouter)


// User router

// user report router
router.use('/report', reportRouter)


// Admin router

// admin report router
router.use('/adminreport', adminReportRouter)

module.exports = router