require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.header['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null)
        return res.sendStatus(401);

    jwt.verify(process.env.ACCESS_TOKEN, (err, response) => {
        if (err)
            return res.sendStatus(403);
        res.locals = response;
        next()
    })
}

module.exports = { authenticateToken: authenticateToken }