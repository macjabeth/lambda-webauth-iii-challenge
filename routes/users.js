const debug = require('debug')('server:db');
const router = require('express').Router();

const restricted = require('../middleware/restricted');
const userDB = require('../models/users');

router.get('/', restricted, async (req, res) => {
  try {
    const department = req.decodedJwt && decodedJwt.department;
    if (department) {
      const users = await userDB.findBy({ department });
      res.status(200).json(users);
    } else {
      res.status(403).json({ message: 'Better luck next time.' });
    }
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; the users could not be retrieved.'
    });
  }
});

module.exports = router;
