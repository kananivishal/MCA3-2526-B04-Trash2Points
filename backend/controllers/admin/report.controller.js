const jwt = require('jsonwebtoken')
const { User } = require('../../model/User')
const Report = require('../../model/Report')

// to verify admin
const verifyAdmin = async (token) => {
    if (!token) {
        throw {
            status: 401,
            message: "Token missing!"
        }
    }

    const decodedToken = jwt.verify(token, "Trash2Points")
    const user = await User.findOne({ email: decodedToken.email })
    if (!user) {
        throw {
            status: 404,
            message: "User not found!"
        }
    }
    if (user.role !== 'admin') {
        throw {
            status: 403,
            message: "Access denied!"
        }
    }

    return user
}

// get all users all reports
const getAllReports = async (req, res) => {
    try {
        let { token } = req.headers
        await verifyAdmin(token)

        let reports = await Report.find({}).sort({ createdAt: -1 })
        if (!reports) {
            return res.status(404).json({
                success: false,
                message: "Report not found!"
            })
        }

        res.status(200).json({
            success: true,
            count: reports.length,
            reports
        })

    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error!",
        })
    }
}

const updateReport = async (req, res) => {
    try {
        let { status } = req.body
        const { id } = req.params

        if (!status || !id) {
            return res.status(400).json({
                success: false,
                message: "Some fileds are missing!"
            })
        }

        let { token } = req.headers
        const user = await verifyAdmin(token)

        const report = await Report.findById(id)
        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found!"
            })
        }

        const updateReport = await Report.findByIdAndUpdate(id, {
            status: status,
            verifiedBy: user._id
        }, { new: true })

        res.status(200).json({
            success: true,
            message: "Report status changed!",
            report: updateReport
        })

    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error!",
        })
    }
}

const deleteReport = async (req, res) => {
    try {
        let { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Some fileds are missing!"
            })
        }

        let { token } = req.headers
        await verifyAdmin(token)

        const report = await Report.findById(id)
        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found!"
            })
        }

        const deleteReport = await Report.findByIdAndDelete(id)
        if (!deleteReport) {
            return res.status(400).json({
                success: false,
                message: "Report not deleted!"
            })
        }
        res.status(200).json({
            success: true,
            message: "Report deleted successfully."
        })

    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error!",
        })
    }
}

module.exports = { getAllReports, updateReport, deleteReport }