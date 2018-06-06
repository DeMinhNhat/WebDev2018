module.exports = (req, res, next) => {
    if (req.session.isLogged === false) {
        res.redirect('/account/login?retUrl=' + req.originalUrl);
    } else {
        next();
    }
}