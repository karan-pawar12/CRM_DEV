const multer = require('multer');
const { nanoid } = require('nanoid');
const path = require('path');

const uploadPath = `F:/Company_Leaning/Project/CRM_DEV/backend/uploads`;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const fileFilter = function (req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|webp|jpeg|JPG|JPEG|PNG|GIF|png|gif|mp4|mpeg|avi|pdf|xlsx|xls|XLSX|XLS|TXT|txt)$/)) {
        return cb(new Error('Only media/document files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
}).array('attachments', 10);

module.exports = { upload };