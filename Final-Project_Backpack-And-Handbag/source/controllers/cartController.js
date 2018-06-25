var express = require('express');
var cartRepo = require('../repos/cartRepo');

var router = express.Router();

router.get('/', (req, res) => {
	var vm = {
		items: req.session.cart,
		total: 0
	};
	vm.total = cartRepo.getTotal(vm.items);
	res.render('cart/index', vm);
});

module.exports = router;