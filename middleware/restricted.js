const debug = require('debug')('server:mw');
const secrets = require('config').get('secrets');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  Boolean(token)
    ? jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      if (error) {
        debug(error);
        // token not valid
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
    : res.status(401).json({ message: 'No token provided.' });
}
