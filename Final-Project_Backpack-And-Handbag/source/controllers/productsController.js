var express = require('express');
var productsRepo = require('../repos/productsRepo');

var router = express.Router();

router.get('/', (req, res) => {
    productsRepo.load().then(rows => {
        var vm = {
            products: rows
        };
        res.render('management/products/index', vm);
    });
});

router.get('/add', (req, res) => {
    var vm = {
        showResult: false
    }
    res.render('management/products/add', vm);
});

router.post('/add', (req, res) => {
    productsRepo.add(req.body).then(value => {
        // console.log(value);
        var vm = {
            showResult: true
        }
        res.render('management/products/add', vm);
    });
});

router.get('/delete', (req, res) => {
    var vm = {
        id: req.query.id
    };
    res.render('management/products/delete', vm);
});

router.post('/delete', (req, res) => {
    productsRepo.delete(req.body.CatID).then(value => {
        res.redirect('/index');
    });
});

router.get('/edit', (req, res) => {
    productsRepo.single(req.query.id).then(rows => {
        var vm = {
            Category: rows[0]
        };
        res.render('products/edit', vm);
    });
});

router.post('/edit', (req, res) => {
    productsRepo.update(req.body).then(value => {
        res.redirect('/index');
    });
});

module.exports = router;