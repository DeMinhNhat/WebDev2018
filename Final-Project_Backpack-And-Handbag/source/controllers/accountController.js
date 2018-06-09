var express = require('express')

var accRouter = express.Router();

accRouter.get('/register',function(req, res){
    res.render('account/register');
});

accRouter.get('/login',function(req, res){
    res.render('account/login');
});

module.exports = accRouter;