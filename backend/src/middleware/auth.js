const jwt = require('jsonwebtoken');

const { authSecret } = require('../.env');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Token não informado');
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send('Token error');
    }

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send('Token mal formado');
    }

    jwt.verify(token, authSecret, (err, decode) => {
        if (err) {
            return res.status(401).send('Token invalido');
        }

        req.token = decode.token;
        return next();
    });
};