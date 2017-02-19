var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var Articles = require('../models/articles.model');
var Verify = require('./verify');

var articleRouter = express.Router();
articleRouter.use(bodyParser.json());

articleRouter.route('/')
    // Récupération de tous les articles
    // @return articles
    .get(function(req, res, next) {
        Articles.find({}).sort('-createdAt').exec(function(err, articles) {
            if (err) throw err;
            res.json(articles);
        });
    })

    // Création d'un nouvel article
    // @return Id du article
    .post(function(req, res, next) {
        Articles.create(req.body, function(err, article) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            var id = article._id;
            res.json({
                id: id
            });
        });
    })

    // Suppression de tous les articles
    .delete(function(req, res, next) {
        Articles.remove({}, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });


articleRouter.route('/:articleId')
    // Récupération d'un article
    .get(function(req, res, next) {
        Articles.findById(req.params.articleId, function(err, article) {
            if (err) throw err;
            res.json(article);
        });
    })

    // Mise à jour d'un article
    // TODO: Gestion de l'autorisation!
    // .put(Verify.verifyOrdinaryUser, function(req, res, next) {
    .put(function(req, res, next) {
        console.log(req.body);
        Articles.findByIdAndUpdate(req.params.articleId, {
            $set: req.body
        }, {
            new: true // send back the new item in the cb
        }, function(err, article) {
            if (err) throw err;
            res.json(article);
        });
    })

    // Suppression d'un article
    //@return ?
    .delete(function(req, res, next) {
        Articles.findByIdAndRemove(req.params.articleId, function(err, resp) {
            if (err)
                throw err;
            res.json(resp);
        });
    });

module.exports = articleRouter;
