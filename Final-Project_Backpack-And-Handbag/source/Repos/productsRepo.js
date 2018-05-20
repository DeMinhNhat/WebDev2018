var db = require('./database');

exports.load = () => {
	var sql = 'select * from products';
	return db.load(sql);
}

exports.add = () => {

}