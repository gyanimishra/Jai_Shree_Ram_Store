const multer = require('multer');

const storage = multer.memoryStorage();

const singleUplaod = multer({storage}).single("file");


module.exports = singleUplaod