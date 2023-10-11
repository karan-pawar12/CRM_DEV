const User = require('../../schema/user'); // Import the User schema
const Lead = require('../../schema/lead');
const mongoose = require('mongoose')

module.exports = async function (req, res, next) {
    try {
        const { leadId } = req.query; // Assuming you're passing the ID as a URL parameter

        // Use Mongoose's aggregate method to retrieve a lead by its ID
        const lead = await Lead.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(leadId)
                }
            },
            {
                $lookup: {
                    from: 'users', // Replace with the actual name of the User collection
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'createdByUser'
                }
            },
            {
                $lookup: {
                    from: 'users', // Replace with the actual name of the User collection
                    localField: 'updatedBy',
                    foreignField: '_id',
                    as: 'updatedByUser'
                }
            },
            {
                $unwind: '$createdByUser' // Unwind the createdByUser array
            },
            {
                $unwind: '$updatedByUser' // Unwind the updatedByUser array
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    phone: 1,
                    leadSource: 1,
                    leadStatus: 1,
                    rating: 1,
                    description: 1,
                    softDelete: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    leadOwner: {
                        $concat: ['$createdByUser.firstName', ' ', '$createdByUser.lastName']
                    },
                    updatedBy: {
                        $concat: ['$updatedByUser.firstName', ' ', '$updatedByUser.lastName']
                    }
                }
            }
        ]);

        if (!lead || lead.length === 0) {
            return res.status(404).json({ error: 'Lead not found.' });
        }

        res.json(lead[0]); // Assuming there's only one lead with the given ID
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
