const express = require('express')
const { addReport, getUserReports, getSingleReport } = require('../../controllers/client/report.controller')
const router = express.Router()

// add report
router.post('/addreport', addReport)

// show all reports
router.get('/reports/', getUserReports)

// show one report
router.get('/report/:id', getSingleReport)

module.exports = router