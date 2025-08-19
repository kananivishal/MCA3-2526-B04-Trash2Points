const express = require('express')
const { getAllReports, updateReport, deleteReport } = require('../../controllers/admin/report.controller')
const { home } = require('../../controllers/admin/home.controller')
const router = express.Router()

// show all report
router.get('/reports', getAllReports)

// update
// handle missing report id router
router.get('/updatereport', (req, res) => {
    return res.status(400).json({
        success: false,
        message: "Report ID missing!"
    });
})
// update report
router.patch('/updatereport/:id', updateReport)

// handle missing report router
router.get('/deletereport', (req, res) => {
    return res.status(400).json({
        success: false,
        message: "Report ID missing!"
    });
})
// delete report
router.delete('/deletereport/:id', deleteReport)

// dashboard routers
router.get('/home', home)

module.exports = router