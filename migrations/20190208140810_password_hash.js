const { tables } = require('../constants');

const passwordHashColumnName = 'passwordHash';

exports.up = knex => {
  return knex.schema
    .table(tables.USER_TABLE, table => {
        table.text(passwordHashColumnName);
    });
};

exports.down = knex => {
  return knex.schema
    .table(tables.USER_TABLE, table => {
        table.dropColumn(passwordHashColumnName);
    });
};
