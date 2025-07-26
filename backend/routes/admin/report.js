const express = require('express')
const { getAllReports, updateReport, deleteReport } = require('../../controllers/admin/report.controller')
const router = express.Router()

// show all report
router.get('/reports', getAllReports)

// update report status
router.patch('/updatereport/:id', updateReport)

// delete report
router.delete('/deletereport/:id', deleteReport)

module.exports = router