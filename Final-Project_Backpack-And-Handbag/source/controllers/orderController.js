var express = require('express');
var orderRepo = require('../repos/orderRepo'),
	cartRepo = require('../repos/cartRepo');

var router = express.Router();

router.get('/', (req, res) => {
	orderRepo.loadAll().then(rows => {
		var vm = {
			orders: rows
		};
		res.render('order/index', vm);
	});
})

module.exports = router;