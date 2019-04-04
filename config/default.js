module.exports = {
  port: 2000,
  secrets: {
    jwtSecret: process.env.JWT_SECRET || 'How should I feel? Creatures lie here, looking through the window!'
  },
  knex: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { filename: './database/users.db3' },
    migrations: { directory: './database/migrations' },
    seeds: { directory: './database/seeds' },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  }
}
