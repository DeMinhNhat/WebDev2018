var express = require('express'),
	productRepo = require('../repos/productRepo'),
	config = require('../config/config');

var router = express.Router();

router.get('/byCat/:catId', (req, res) => {
	var catId = req.params.catId;

	var page = req.query.page;
	if (!page) page = 1;
	if (page < 1) page = 1;

	var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

	var p1 = productRepo.loadPageByCat(catId, offset);
	var p2 = productRepo.countByCat(catId);
	Promise.all([p1, p2]).then(([rows, count_rows]) => {
		var total = count_rows[0].total;
		var nPages = total / config.PRODUCTS_PER_PAGE;
		if (total % config.PRODUCTS_PER_PAGE > 0)
			nPages++;

		var numbers = [];
		for (i = 1; i <= nPages; i++) {
			numbers.push({
				value: i,
				isCurrentPage: i === +page
			});
		}

		var vm = {
			products: rows,
			noProducts: rows.length === 0,
			page_numbers: numbers
		};
		res.render('product/byCat', vm);
	});
});

router.get('/byBra/:braId', (req, res) => {
	var braId = req.params.braId;

	var page = req.query.page;
	if (!page) page = 1;
	if (page < 1) page = 1;

	var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

	var p1 = productRepo.loadPageByBra(braId, offset);
	var p2 = productRepo.countByBra(braId);
	Promise.all([p1, p2]).then(([rows, count_rows]) => {
		var total = count_rows[0].total;
		var nPages = total / config.PRODUCTS_PER_PAGE;
		if (total % config.PRODUCTS_PER_PAGE > 0)
			nPages++;

		var numbers = [];
		for (i = 1; i <= nPages; i++) {
			numbers.push({
				value: i,
				isCurrentPage: i === +page
			});
		}

		var vm = {
			products: rows,
			noProducts: rows.length === 0,
			page_numbers: numbers
		};
		res.render('product/byBra', vm);
	});
});

router.get('/detail/:proId', (req, res) => {
	var proId = req.params.proId;

	productRepo.single(proId).then(rows => {
		if (rows.length > 0) {
			var p1 = productRepo.loadSameCat(rows[0].CatID);
			var p2 = productRepo.loadSameBra(rows[0].BraID);

			Promise.all([p1, p2]).then(([same_cats, same_bras]) => {
				vm = {
					same_cats: same_cats,
					same_bras: same_bras,
					product: rows[0]
				};
				res.render('product/detail', vm);
			});

		} else {
			res.render('error/index');
		}
	});
});

module.exports = router;