const User = require('../../schema/user');

module.exports = async function (req, res, next) {
    try {
        const users = await User.aggregate([
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    id: '$_id', // Rename _id to id
                    name: {
                        $concat: ['$firstName', ' ', '$lastName'] // Concatenate firstName and lastName
                    }
                }
            }
        ]);
        res.json(users);
    } catch (error) {
        console.log(e.message);
        return res.status(500).end();
    }
}
