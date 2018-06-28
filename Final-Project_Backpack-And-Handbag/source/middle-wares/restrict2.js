module.exports = (req, res, next) => {
	next();
	req.session.isWrong = false;
}