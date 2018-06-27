var db = require('./database');
var config = require('../config/config');

exports.getAllByOrderID = orderID => {
	var sql = `select * from orderdetails where OrderID = ${orderID}`;
	return db.load(sql);
}