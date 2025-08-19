const jwt = require("jsonwebtoken")
const { User } = require("../../model/User")
const Report = require("../../model/Report")

const home = async (req, res) => {
    try {
        let { token } = req.headers
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing!"
            })
        }

        const decodedToken = jwt.verify(token, "Trash2Points")
        const user = await User.findOne({ email: decodedToken.email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }

        // Total reports count
        const totalReports = await Report.countDocuments();

        // Status-wise report count (for all reports)
        const statusCountsArray = await Report.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        const statusCounts = {};
        statusCountsArray.forEach(item => {
            statusCounts[item._id] = item.count;
        });
        const defaultStatuses = ['pending', 'cleaned', 'rejected'];
        defaultStatuses.forEach(status => {
            if (!statusCounts[status]) {
                statusCounts[status] = 0;
            }
        });

        // Total user count (role = user)
        const totalUsers = await User.countDocuments({ role: "user" });

        // Latest 5 reports
        const latestReports = await Report.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('userId', 'name')
        .populate('verifiedBy', 'name')

        return res.status(200).json({
            success: true,
            totalReports,
            statusCounts,
            totalUsers,
            latestReports : latestReports.map(report => ({
                id: report._id,
                location: report.location,
                user: report.userId.name,
                description: report.description,
                status: report.status,
                image: report.image,
                updatedAt: report.updatedAt.toLocaleDateString(),
                createdAt: report.createdAt.toLocaleDateString(),
                verifiedBy: report.verifiedBy ? report.verifiedBy.name : null
            }))
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

module.exports = { home }