const debug = require('debug')('server:log');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const server = express();

// Middleware
server.use(express.json());
server.use(compression());
server.use(helmet());
server.use(cors());
server.use((req, res, next) => {
  res.on('finish', () => {
    debug(`${req.method} ${req.originalUrl} - ${res.statusCode} [${res.statusMessage}]`);
  });
  next();
});

// Routes
server.use('/api/auth', require('../routes/auth'));
server.use('/api/users', require('../routes/users'));

server.use('/api', (req, res) => {
  res.status(418).json({ message: "It's working! It's working!!!" });
});

module.exports = server;
