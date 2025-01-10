const notFoundMiddleware = (req, res, next) => {
    res.status(404).send(`Sorry can't find that! ${req.url}! Please try another url!`);
}

module.exports = notFoundMiddleware;