const Joi = require('joi');
const debug = require('debug')('server:db');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('config').get('secrets').jwtSecret;
const userDB = require('../models/users');

const schema = Joi.object().keys({
  username: Joi.string().max(35).required(),
  password: Joi.string().max(128).required(),
  department: Joi.string().max(50)
});

const generateToken = (user) => jwt.sign({
  subject: user.id,
  username: user.username
}, secret, {
  expiresIn: '1d'
});

router.post('/register', async ({ body: newUser }, res) => {
  const { error } = Joi.validate(newUser, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

  try {
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const [user] = await userDB.add(newUser);
    res.status(201).json(user);
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; user could not be registered.'
    });
  }
});

router.post('/login', async ({ body: creds }, res) => {
  const { error } = Joi.validate(creds, schema);
  if (error) return res.status(400).json({
    error: error.details[0].message
  });

  try {
    const { username, password } = creds;
    const user = await userDB.findBy({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}!`,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    debug(error); res.status(500).json({
      error: 'Something went wrong; user could not be logged in.'
    });
  }
});

module.exports = router;
