const casual = require('casual');

const generateUser = () => ({
  username: casual.username,
  password: casual.password,
  department: casual.letter
});

exports.seed = (knex) => knex('users').insert(
  Array(250).fill().map(u => generateUser())
);