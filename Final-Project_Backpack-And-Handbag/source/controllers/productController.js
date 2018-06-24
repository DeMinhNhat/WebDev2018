var express = require('express'),
	productRepo = require('../repos/productRepo'),
	brandRepo = require('../repos/brandRepo'),
	categoryRepo = require('../repos/categoryRepo'),
	config = require('../config/config');

var router = express.Router();

router.get('/', (req, res) => {

	var page = req.query.page;
	if (!page) page = 1;
	if (page < 1) page = 1;

	var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

	var p1 = productRepo.loadPage(offset);
	var p2 = productRepo.count();

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
		res.render('product/index', vm);
	});
});

router.get('/search', (req, res) => {

	var page = req.query.page;
	var s = req.query.search;
	var words = s.split(`[^\W\d](\w|[-']{1,2}(?=\w))*`);

	if (!page) page = 1;
	if (page < 1) page = 1;

	var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

	var p1 = productRepo.loadPageByWords(words, offset);
	var p2 = productRepo.countByWords(words);

	Promise.all([p1, p2]).then(([rows, count_rows]) => {

		var total = count_rows[0].total;
		var nPages = total / config.PRODUCTS_PER_PAGE;
		if (total % config.PRODUCTS_PER_PAGE > 0)
			nPages++;

		var numbers = [];
		for (i = 1; i <= nPages; i++) {
			numbers.push({
				value: i,
				isCurrentPage: i === +page,
				sstring: s
			});
		}

		var vm = {
			products: rows,
			noProducts: rows.length === 0,
			page_numbers: numbers
		};
		res.render('product/search', vm);
	});
});

router.get('/byCat/:catId', (req, res) => {
	var catId = req.params.catId;
	if (catId < 1 || catId > 5) {
		res.render('error/index');
		return;
	}

	var page = req.query.page;
	if (!page) page = 1;
	if (page < 1) page = 1;

	var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

	var p1 = productRepo.loadPageByCat(catId, offset);
	var p2 = productRepo.countByCat(catId);
	var p3 = categoryRepo.single(catId);

	Promise.all([p1, p2, p3]).then(([rows, count_rows, cats]) => {
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
			CatName: cats[0].CatName,
			products: rows,
			noProducts: rows.length === 0,
			page_numbers: numbers
		};
		res.render('product/byCat', vm);
	});
});

router.get('/byBra/:braId', (req, res) => {
	var braId = req.params.braId;
	if (braId < 1 || braId > 5) {
		res.render('error/index');
		return;
	}

	var page = req.query.page;
	if (!page) page = 1;
	if (page < 1) page = 1;

	var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

	var p1 = productRepo.loadPageByBra(braId, offset);
	var p2 = productRepo.countByBra(braId);
	var p3 = brandRepo.single(braId);

	Promise.all([p1, p2, p3]).then(([rows, count_rows, bras]) => {
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
			BraName: bras[0].BraName,
			products: rows,
			noProducts: rows.length === 0,
			page_numbers: numbers
		};
		res.render('product/byBra', vm);
	});
});

router.get('/detail/:proId', (req, res) => {
	var proId = req.params.proId;
	if (proId < 1 || proId > 50) {
		res.render('error/index');
		return;
	}

	productRepo.loadSingle(proId).then(rows => {
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