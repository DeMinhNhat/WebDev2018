module.exports = (req, res, next) => {
    if (req.session.isLogged === false) {
        // res.redirect('/account/login?retUrl=' + req.originalUrl);
    	// hiển thị form login hoặc form signup
    } else {
        next();
    }
}