const express = require('express')
const router = express.Router()
// router
const authRouter = require('./auth')
const userRouter = require('./client')
const adminRouter = require('./admin')

// Coman router
// auth router
router.use('/auth', authRouter)
router.use('/profile', authRouter)


// User router
// user report router
router.use('/report', userRouter)
router.use('/', userRouter)


// Admin router
// admin report router
router.use('/adminreport', adminRouter)
router.use('/admin', adminRouter)

module.exports = router