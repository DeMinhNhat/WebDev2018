var db = require('./database');

exports.loadAll = () => {
	var sql = 'select proName, TinyDes, Price, Quantity from products';
	return db.load(sql);
}