const multer = require('multer');
const del = require('del');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

// Uploads Storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    callback(null, 'uploads/images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    console.log(ext);
    callback(null, name + '-' + Date.now() + "." + ext);
  }
});

// Images only Filter
const imageFilter = (req, file, callback) => {
  console.log(file.originalname.toLowerCase());
  if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
    // return callback(new Error('Only image files are allowed'), false);
    return callback(console.log('Only .jpg/.jpeg/.png/.gif files are allowed'), false);
  }
  callback(null, true);
};

// Clear Folder Uploads after Server Restart
module.exports.cleanFolder = (folderPath) => {
  del.sync([`${folderPath}/**`, `!${folderPath}`]);
  console.log('Cleaning folder ' + folderPath + '...');
};

module.exports = multer({
  storage: storage
}).single("image");
