
const clusterComp = require('../Cluster/Cluster');
exports.getSearchQuery = async (req, res) => {
    try {
        const searchQuery = req.header("search");
        const MainData = await clusterComp(searchQuery);
        return res.status(200).json({ message: "success", data: MainData })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error occured" })

    }
}


