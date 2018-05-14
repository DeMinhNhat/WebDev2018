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
    res.render('category/add', vm);
});

router.post('/add', (req, res) => {
    categoryRepo.add(req.body).then(value => {
        // console.log(value);
        var vm = {
            showResult: true
        }
        res.render('category/add', vm);
    });
});

router.get('/delete', (req, res) => {
    var vm = {
        id: req.query.id
    };
    res.render('category/delete', vm);
});

router.post('/delete', (req, res) => {
    categoryRepo.delete(req.body.CatID).then(value => {
        res.redirect('/category');
    });
});

router.get('/edit', (req, res) => {
    categoryRepo.single(req.query.id).then(rows => {
        var vm = {
            Category: rows[0]
        };
        res.render('category/edit', vm);
    });
});

router.post('/edit', (req, res) => {
    categoryRepo.update(req.body).then(value => {
        res.redirect('/category');
    });
});

module.exports = router;