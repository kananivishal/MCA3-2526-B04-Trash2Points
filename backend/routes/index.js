const express = require('express')
const router = express.Router()
// router
const userRouter = require('./auth')
const reportRouter = require('./client/report')

router.use('/auth',userRouter)

router.use('/report',reportRouter)

module.exports = router