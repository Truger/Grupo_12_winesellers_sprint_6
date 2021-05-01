const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controller/userController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/Img'));
    },
    filename: (req, file, cb) => {
        const newFileName = 'user-'+Date.now() + path.extname(file.originalname);
        req.body.file = newFileName;
        cb(null, newFileName);
    }
});

const upload = multer({storage: storage});

router.get('/login', userController.login);

router.get('/register', userController.register);

router.post('/register',upload.single('file'), userController.create);


module.exports = router;