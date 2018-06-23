var express = require('express');
var productRepo = require('../repos/productRepo');
var config = require('../config/config');

var router = express.Router();

router.get('/', (req, res) => {

	var p1 = productRepo.loadNewest(config.PRODUCTS_TO_EXPOSE, 1);
	var p2 = productRepo.loadTopViewed(config.PRODUCTS_TO_EXPOSE, 1);
	// được mua nhiều nhất, chưa bik viết
	var p3 = productRepo.loadTopViewed(config.PRODUCTS_TO_EXPOSE, 1);
	Promise.all([p1, p2, p3]).then(([newest, top_viewed, top_sold]) => {
		vm = {
			newest: newest,
			top_viewed: top_viewed,
			top_sold: top_sold
		};
		res.render('home/index', vm);
	});
});

module.exports = router;