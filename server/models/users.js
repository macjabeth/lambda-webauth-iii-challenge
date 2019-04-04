const db = require('../database/db');

module.exports = {
  add: async function(user) {
    const [id] = await db('users').insert(user);
    return this.findById(id);
  },
  find: () => db('users').select('id', 'username', 'password'),
  findBy: (filter) => db('users').where(filter),
  findById: (id) => db('users').where({ id })
};
