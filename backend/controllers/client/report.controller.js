const jwt = require("jsonwebtoken")
const { User } = require("../../model/User")
const Report = require("../../model/Report")

// add report
const addReport = async (req, res) => {
    try {
        let { image, latitude, longitude, address, description } = req.body
        let { token } = req.headers
        let decodedToken = jwt.verify(token, "Trash2Points")
        let user = await User.findOne({ email: decodedToken.email })
        if (!user || !image || !latitude || !longitude || !address || !description) {
            return res.status(404).json({
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
        res.status(500).json({
            success: false,
            message: "Internal server error!",
            error
        })
    }
}

// show all reports
const getUserReports = async (req, res) => {
    try {
        let { token } = req.headers
        const decodedToken = jwt.verify(token, "Trash2Points")
        const user = await User.findOne({ email: decodedToken.email })
        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            })
        }
        let reports = await Report.find({ userId: user._id }).sort({ createdAt: -1 });
        if (!reports) {
            return res.status(404).json({
                message: "Reports not available!"
            })
        }
        res.status(200).json({
            success: true,
            count: reports.length,
            reports
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!",
            error
        })
    }
}

// show one report
const getSingleReport = async (req, res) => {
    try {
        let { id } = req.params
        console.log(id)
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Report id meassing!"
            })
        }

        const report = await Report.findById(id);

        if (!report) {
            return res.status(404).status({
                success: false,
                message: "Report not found!"
            })
        }
        res.status(200).json({
            success: true,
            report
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!",
            error
        })
    }
}

module.exports = { addReport, getUserReports, getSingleReport }