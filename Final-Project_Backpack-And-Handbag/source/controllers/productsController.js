var express = require('express');
var productsRepo = require('../repos/productsRepo');
var config = require('../config/config');

var router = express.Router();

// router.get('/', (req, res) => {
// 	productsRepo.load().then(rows => {
// 		var vm = {
// 			products: rows
// 		};
// 		res.render('management/products/index', vm);
// 	});
// });

router.get('/', (req, res) => {

	var page = req.query.page;

	if (!page) page = 1;
	if (page < 1) page = 1;

	var offset = (page - 1) * config.PRODUCTS_PER_PAGE;

	var p1 = productsRepo.loadPage(offset);
	var p2 = productsRepo.countProducts();

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

		res.render('management/products/index', vm);
	});

	// productsRepo.countProducts().then(count_rows) => {
	// 	var total = count_rows[0].total;
	// 	var nPages = total / config.PRODUCTS_PER_PAGE;
	// 	if (total % config.PRODUCTS_PER_PAGE > 0)
	// 		nPages++;

	// 	var numbers = [];
	// 	for (i = 1; i <= nPages; i++) {
	// 		numbers.push({
	// 			value: i,
	// 			isCurrentPage: i === +page
	// 		});
	// 	}

	// 	var vm = {
	// 		products: rows,
	// 		noProducts: rows.length === 0,
	// 		page_numbers: numbers
	// 	};
	// 	res.render('management/products/index', vm);
	// };
});

// router.get('/add', (req, res) => {
//     var vm = {
//         showResult: false
//     }
//     res.render('management/products/add', vm);
// });

// router.post('/add', (req, res) => {
//     productsRepo.add(req.body).then(value => {
//         // console.log(value);
//         var vm = {
//             showResult: true
//         }
//         res.render('management/products/add', vm);
//     });
// });

// router.get('/delete', (req, res) => {
//     var vm = {
//         id: req.query.id
//     };
//     res.render('management/products/delete', vm);
// });

// router.post('/delete', (req, res) => {
//     productsRepo.delete(req.body.CatID).then(value => {
//         res.redirect('/index');
//     });
// });

// router.get('/edit', (req, res) => {
//     productsRepo.single(req.query.id).then(rows => {
//         var vm = {
//             Category: rows[0]
//         };
//         res.render('products/edit', vm);
//     });
// });

// router.post('/edit', (req, res) => {
//     productsRepo.update(req.body).then(value => {
//         res.redirect('/index');
//     });
// });

module.exports = router;