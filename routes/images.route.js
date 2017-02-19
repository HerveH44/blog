const express = require('express');
const passport = require('passport');
const Verify = require('./verify');
const multer = require('multer');
const mkdirp = require('mkdirp');
const bodyParser = require('body-parser');

//multers disk storage settings
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let dest = './public/images/articles/' + req.body.articleId +'/';
        mkdirp.sync(dest);
        cb(null, dest);
    },
    filename: function(req, file, cb) {
        let filename = file.originalname;
        cb(null, filename);
    }
});

//multer settings
let upload = multer({
    storage: storage
}).fields([{
        name: 'file'
    },{
        name: 'articleId'
    }
]);

let imageRouter = express.Router();
imageRouter.use(bodyParser.json());
imageRouter.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        res.json({
            error_code: 0,
            err_desc: null
        });
    });
});

module.exports = imageRouter;
