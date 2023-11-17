const mongoose = require('mongoose');
let multer = require('multer');
let { nanoid } = require('nanoid');
var path = require('path');
const Emailer = require('../../schema/emailer'); // Update the path

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../campaign'));
    },
    filename: function (req, file, cb) {
        cb(null, nanoid());
    }
});

let htmlFilter = function (req, file, cb) {
    // Accept HTML files
    if (!file.originalname.match(/\.(html)$/)) {
        return cb(new Error('Only HTML files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer(
    {
        storage: storage,
        fileFilter: htmlFilter // Use the updated HTML filter
    }
).array("campaign", 10);

module.exports = async function (req, res, next) {
    try {
        // Replace the existing "upload" middleware with the one configured for HTML files
        upload(req, res, async function (err) {
            if (err) {
                console.log(err.message);
                return res.status(500).end();
            }

            let emailers = [];
            let data = [];

            try {
                let createdBy = req.payload._id;
                for (let i = 0; i < res.req.files.length; i++) {
                    const { originalname, mimetype, filename, size, destination } = res.req.files[i];
                    console.log(originalname, mimetype, filename, size, destination);
                    let emailer = await new Emailer({
                        title: "abc", // Set the title or use any other relevant value
                        isPublished: true, // Set the publication status
                        startDate: new Date(), // Set the start date or use any other relevant value
                        endDate: new Date(), // Set the end date or use any other relevant value
                        createdBy,
                        updatedBy: createdBy, // Assuming createdBy and updatedBy are the same
                        uploadedFileName: filename,
                        originalFileName: originalname,
                        fileLocation: destination
                    }).save();
                    emailers.push(emailer);
                }

                let temp = [];
                for (let i = 0; i < emailers.length; i++) {
                    temp.push(emailers[i].uploadedFileName);
                }

                data = await Emailer.aggregate([
                    {
                        $match: {
                            uploadedFileName: { $in: temp },
                        }
                    },
                    // Add any other aggregation stages as needed
                ]);

                res.json(data);
            } catch (error) {
                console.log(error.message);
                return res.status(500).end();
            }
        });


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
