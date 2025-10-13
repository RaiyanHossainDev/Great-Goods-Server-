const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization
    jwt.verify(token, process.env.jwt_secret , function(err, decoded) {
        if (err) return res.status(401).send("unauthorized access");
        req.user = decoded;
        next();
    });
}

module.exports = jwtMiddleware;