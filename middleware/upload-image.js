const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/img/cars');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});
const uploadImage = multer({ storage: storage }).array('images', 10);
const uploadOneImg = multer({ storage: storage }).single('images');

module.exports = { uploadImage, uploadOneImg };
