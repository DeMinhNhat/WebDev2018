var express = require('express');
var orderRepo = require('../repos/orderRepo'),
	cartRepo = require('../repos/cartRepo');

var router = express.Router();

router.get('/', (req, res) => {

	var p1 = orderRepo.loadAll();
	var p2 = orderRepo.loadAllByUserID(req.session.curUser.f_ID);

	Promise.all([p1, p2]).then(([adRows, cusRows]) => {
		var vm = {
			orders: adRows,
			cusOrders: cusRows
		};
		res.render('order/index', vm);
	});
})

module.exports = router;