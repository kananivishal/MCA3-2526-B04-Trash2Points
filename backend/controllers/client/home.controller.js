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

        const statusCountsArray = await Report.aggregate([
            { $match: { userId: user._id } },
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

        const letestRepoert = await Report.find().sort({ createdAt: -1 }).limit(5)

        if(!letestRepoert){
            return res.status(404).json({
                success: false,
                message: "Report not available!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Home data found",
            statusCounts,
            letestRepoert
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