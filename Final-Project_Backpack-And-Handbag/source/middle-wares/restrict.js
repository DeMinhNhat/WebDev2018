module.exports = (req, res, next) => {
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	if (req.session.isLogged === false) {
		res.redirect(req.headers.referer);
	} else {
		next();
	}
}