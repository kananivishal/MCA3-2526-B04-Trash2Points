const express = require('express')
const { addReport, getUserReports, getSingleReport } = require('../../controllers/client/report.controller')
const router = express.Router()

// report routers
// add report router
router.post('/addreport', addReport)
// all reports router
router.get('/reports/', getUserReports)
// one report router
// handle missing report router
router.get('/report', (req, res) => {
    return res.status(400).json({
        success: false,
        message: "Report ID missing!"
    });
})
// get single report router
router.get('/report/:id', getSingleReport)

// dashboard routers

module.exports = router