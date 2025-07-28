const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const { User } = require("../../model/User")
const Report = require("../../model/Report")

// to verify admin
const verifyUser = async (token) => {
    if (!token) {
        throw {
            status: 401,
            message: "Authorization token missing!"
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

    return user
}

// add report
const addReport = async (req, res) => {
    try {
        let { image, latitude, longitude, address, description } = req.body
        let { token } = req.headers
        const user = await verifyUser(token)
        
        if (!image || !latitude || !longitude || !address || !description) {
            return res.status(400).json({
                success: false,
                message: "Some fields are missing"
            })
        }

        const newReport = await Report.create({
            userId: user._id,
            image: image,
            location: {
                latitude: latitude,
                longitude: longitude,
                address: address
            },
            description: description
        })

        return res.status(200).json({
            success: true,
            message: "Report submitted successfully",
            report: newReport
        })


    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error!",
        })
    }
}

// show all reports
const getUserReports = async (req, res) => {
    try {
        let { token } = req.headers
        const user = await verifyUser(token)

        let reports = await Report.find({ userId: user._id }).sort({ createdAt: -1 })
        if (!reports) {
            return res.status(404).json({
                message: "Reports not available!"
            })
        }
        return res.status(200).json({
            success: true,
            count: reports.length,
            reports
        })

    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error!",
        })
    }
}

// show one report
const getSingleReport = async (req, res) => {
    try {
        let { id } = req.params

        let { token } = req.headers
        await verifyUser(token)

        // check report id valide or not
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Report ID format!"
            });
        }

        const report = await Report.findById(id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found!"
            })
        }
        return res.status(200).json({
            success: true,
            report
        })

    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error!",
        })
    }
}

module.exports = { addReport, getUserReports, getSingleReport }