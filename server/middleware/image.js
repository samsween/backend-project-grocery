const multer = require("multer");

const storage = multer.diskStorage({
    
  destination: function (req, file, cb) {
    cb(null, "./images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

module.exports = multer({ storage });
