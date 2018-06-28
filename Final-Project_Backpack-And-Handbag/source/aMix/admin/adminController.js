var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
	res.render('admin/index');
});

router.get('/login', (req, res) => {
	var vm = {
		errorMsg: req.query.errormsg
	};
	res.render('admin/login', vm);

});

module.exports = router;