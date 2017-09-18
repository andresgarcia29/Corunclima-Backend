const UserController = require('../controllers/user.controller'),
  NewController = require('../controllers/new.controller'),
  ProductController = require('../controllers/product.controller'),
  settings = require('../config/settings'),
  express = require('express'),
  Router = express.Router(),
  aws = require('aws-sdk'),
  multer  = require('multer'),
  multerS3 = require('multer-s3');

let s3 = new aws.S3();

let upload = multer({
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png|gif/;
    var mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
  },
  storage: multerS3({
    s3: s3,
    bucket: settings.aws_s3_bucket,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
});

Router

  .post('/actions/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.json({
      status: 0,
      data: req.file.location
    });
  })

  .post('/signup', UserController.signup)
  .post('/signin', UserController.signin)
  .get('/get', UserController.get)
  .get('/getid/:_id', UserController.getId)
  .put('/update/:_id', UserController.update)
  .delete('/delete/:_id', UserController.delete)

  .get('/new/get', NewController.get)
  .get('/new/get/:_id', NewController.getId)
  .get('/new/category/:_id', NewController.getCategory)
  .post('/new/create', NewController.create)
  .put('/new/update/:_id', NewController.update)
  .delete('/new/delete/:_id', NewController.delete)

  .get('/product/get', ProductController.get)
  .get('/product/get/:_id', ProductController.getId)
  .get('/product/get/category/:_category', ProductController.getByCategory)
  .post('/product/create', ProductController.create)
  .put('/product/update/:_id', ProductController.update)
  .delete('/product/delete/:_id', ProductController.delete);

module.exports = Router;
function newFunction() {
    return 'image';
}
