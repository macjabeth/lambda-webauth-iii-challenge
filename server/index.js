require('dotenv').config();

const debug = require('debug')('server:init');

const port = process.env.PORT || require('config').get('port');

const server = require('./api/server');

server.listen(port, () => debug(`Listening {${port}}`));
