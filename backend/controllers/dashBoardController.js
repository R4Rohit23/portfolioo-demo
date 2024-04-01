const jwtService = require("../middleware/auth");
const DBService = require("../services/mongodb");
const dbUtils = require("../utils/db_operations");
const commonUtils = require("../utils/common");
const configs = require("../configs.json");
const DATABASE_COLLECTIONS = configs.CONSTANTS.DB_COLLECTIONS;
const databaseObject = new DBService();

module.exports.dashBoard = async (req, res) => {
    try {
        // Construct aggregate userPipeline
        const userPipeline = [
            {
                $group: {
                    _id: "$accountType",
                    count: { $sum: 1 }
                }
            }
        ];

        // Execute aggregate query to get count of artists and clients
        const counts = await dbUtils.aggregate(userPipeline, databaseObject, DATABASE_COLLECTIONS.USERS);

        // Extract counts of artists and clients from the result
        let artistCount = 0;
        let clientCount = 0;
        counts.forEach(({ _id, count }) => {
            if (_id === "Artist") {
                artistCount = count;
            } else if (_id === "Client") {
                clientCount = count;
            }
        });

        // Construct aggregate pipeline for gigs count
        const gigPipeline = [
            {
                $group: {
                    _id: "$title",
                    count: { $sum: 1 }
                }
            }
        ];

        // Execute aggregate query to get total count of gigs
        const gigCounts = await dbUtils.aggregate(gigPipeline, databaseObject, DATABASE_COLLECTIONS.GIGS);

        // Prepare structured counts object
        const titleCounts = {};
        gigCounts.forEach(({ _id, count }) => {
            titleCounts[_id] = count;
        });

        // Extract total gigs count from the result
        const totalGigsCount = gigCounts.length > 0 ? gigCounts[0].count : 0;

        // Construct aggregate pipeline for counting artists created monthly
        const artistMonthlyPipeline = [
            {
                $match: { accountType: "Artist" } // Filter only artists
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and month
            }
        ];

        // Execute aggregate query to get monthly count of artists
        const monthlyArtistCounts = await dbUtils.aggregate(artistMonthlyPipeline, databaseObject, DATABASE_COLLECTIONS.USERS);

        // Prepare structured monthly counts
        const monthlyartistCounts = {};
        monthlyArtistCounts.forEach(({ _id, count }) => {
            const monthName = new Date(_id.year, _id.month - 1, 1).toLocaleString('en-US', { month: 'short' });
            const year = _id.year;
            if (!monthlyartistCounts[year]) {
                monthlyartistCounts[year] = {};
            }
            monthlyartistCounts[year][monthName] = count;
        });


        // Construct aggregate pipeline for counting clients created monthly
        const clientMonthlyPipeline = [
            {
                $match: { accountType: "Client" } // Filter only clients
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 } // Sort by year and month
            }
        ];

        // Execute aggregate query to get monthly count of clients
        const monthlyClientCounts = await dbUtils.aggregate(clientMonthlyPipeline, databaseObject, DATABASE_COLLECTIONS.USERS);

        // Prepare structured monthly counts for clients
        const monthlyclientCounts = {};
        monthlyClientCounts.forEach(({ _id, count }) => {
            const monthName = new Date(_id.year, _id.month - 1, 1).toLocaleString('en-US', { month: 'short' });
            const year = _id.year;
            if (!monthlyclientCounts[year]) {
                monthlyclientCounts[year] = {};
            }
            monthlyclientCounts[year][monthName] = count;
        });



        // Send success response with counts
        res.status(200).json({ type: 'Success', artistCount, clientCount , totalGigsCount , monthlyartistCounts , monthlyclientCounts , titleCounts });
    } catch (error) {
        console.error(`[dashBoard] Error occurred : ${error}`);
        res.status(500).json({ type: 'Error', message: "Internal server error." });
    }
};


