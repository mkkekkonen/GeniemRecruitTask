module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './todos.db'
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb);
      }
    }
  },
};
