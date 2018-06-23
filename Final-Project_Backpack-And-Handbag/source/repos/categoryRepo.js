var db = require('./database');
var config = require('../config/config');

exports.loadAll = () => {
	var sql = 'select * from categories';
	return db.load(sql);
}

exports.single = id => {
	var sql = `select * from categories where CatID = ${id}`;
	return db.load(sql);
}

exports.delete = id => {
	var sql = `delete from categories where CatID = ${id}`;
	return db.save(sql);
}

exports.count = () => {
	var sql = `select count(*) as total from categories`;
	return db.load(sql);
}