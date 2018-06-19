var express = require('express'),
    sha256 = require('crypto-js/sha256'),
    moment = require('moment');

var restrict = require('../middle-wares/restrict');
var accountRepo = require('../repos/accountRepo');

var router = express.Router();

router.get('/register', (req, res) => {
    res.render('account/register');
});

router.post('/register', (req, res) => {
    var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DDTHH:mm');

    var user = {
        username: req.body.username,
        password: sha256(req.body.rawPWD).toString(),
        name: req.body.name,
        email: req.body.email,
        dob: dob,
        permisson: 0
    };

    accountRepo.add(user).then(value => {
        res.render('account/register');
    });
});

router.get('/login', (req, res) => {
    res.render('account/login');
});

router.post('/login', (req, res) => {
    var user = {
        username: req.body.username,
        password: sha256(req.body.rawPWD).toString()
    };

    accountRepo.login(user).then(rows => {
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.curUser = rows[0];
            req.session.cart = [];

            var url = '/';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.redirect(url);
        } else {
            var vm = {
                showError: true,
                errorMsg: 'Login failed'
            };
            res.render('account/login', vm);
        }
    });
});

router.post('/logout', restrict, (req, res) => {
    req.session.isLogged = false;
    req.session.curUser = null;
    req.session.cart = [];

    res.redirect(req.headers.referer);
});

router.get('/profile', restrict, (req, res) => {
    res.render('account/profile');
});

module.exports = router;