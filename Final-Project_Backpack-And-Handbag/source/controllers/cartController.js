var express = require('express');
var productRepo = require('../repos/productRepo'),
	cartRepo = require('../repos/cartRepo');

var router = express.Router();

router.get('/', (req, res) => {
	var vm = {
		items: req.session.cart
	};
	res.render('cart/index', vm);
});

module.exports = router;