var db = require('./database');
var config = require('../config/config');

exports.load = () => {
	var sql = 'select * from products';
	return db.load(sql);
}

exports.countProducts = () => {
	var sql = 'select count(*) as total from products';
	return db.load(sql);
}

exports.loadPage = (offset) => {
	var sql = `select * from products limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
	return db.load(sql);
}