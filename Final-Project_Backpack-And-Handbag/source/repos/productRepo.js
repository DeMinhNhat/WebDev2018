var db = require('./database');
var config = require('../config/config');

exports.loadAll = () => {
	var sql = 'select * from products';
	return db.load(sql);
}

exports.loadNewest = () => {
	var sql = `select * from products
	order by ImportDate desc limit ${config.PRODUCTS_TO_EXPOSE}`;
	return db.load(sql);
}

exports.loadTopViewed = () => {
	var sql = `select * from products
	order by Clicks desc limit ${config.PRODUCTS_TO_EXPOSE}`;
	return db.load(sql);
}

exports.loadTopSold = () => {
	// chưa bik câu sql sao....
	return db.load(sql);
}

exports.loadPage = offset => {
	var sql = `select * from products 
	limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
	return db.load(sql);
}

exports.count = () => {
	var sql = `select count(*) as total from products`;
	return db.load(sql);
}

exports.loadAllByCat = catId => {
	var sql = `select * from products where CatID = ${catId}`;
	return db.load(sql);
}

exports.loadSameCat = catId => {
	var sql = `select * from products where CatID = ${catId} 
	order by Clicks asc limit ${config.PRODUCTS_TO_EXPOSE}`;
	return db.load(sql);
}

exports.loadPageByCat = (catId, offset) => {
	var sql = `select * from products where CatID = ${catId} 
	limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
	return db.load(sql);
}

exports.loadAllByBra = braId => {
	var sql = `select * from products where BraID = ${braId}`;
	return db.load(sql);
}

exports.loadSameBra = braId => {
	var sql = `select * from products where BraID = ${braId} 
	order by Clicks asc limit ${config.PRODUCTS_TO_EXPOSE}`;
	return db.load(sql);
}

exports.loadPageByBra = (braId, offset) => {
	var sql = `select * from products where BraID = ${braId} 
	limit ${config.PRODUCTS_PER_PAGE} offset ${offset}`;
	return db.load(sql);
}

exports.countByCat = catId => {
	var sql = `select count(*) as total from products where CatID = ${catId}`;
	return db.load(sql);
}

exports.countByBra = braId => {
	var sql = `select count(*) as total from products where BraID = ${braId}`;
	return db.load(sql);
}

exports.single = id => {
	var sql = `select * from products where ProID = ${id}`;
	return db.load(sql);
}

exports.loadSingle = id => {
	var sql = `select products.*, categories.CatName as CatName,
	brands.BraName as BraName, brands.Origin as Origin
	from products
	inner join categories on products.CatID = categories.CatID
	inner join brands on products.BraID = brands.BraID
	where ProID = ${id}`;
	return db.load(sql);
}

// các hàm cho việc tìm kiếm theo tên, loại, thương hiệu, giá cả...