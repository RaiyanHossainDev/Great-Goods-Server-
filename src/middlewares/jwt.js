const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization
    jwt.verify(token, process.env.jwt_secret , function(err, decoded) {
        console.log(err);
        if (err) return res.status(401).send("unauthorized access");
        next();
        req.user = decoded.data;
    });
}

module.exports = jwtMiddleware;