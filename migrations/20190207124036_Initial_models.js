const { tables } = require('../constants');

exports.up = knex => {
  return knex.schema
    .createTable(tables.USER_TABLE, table => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('name');
      table.string('lastName');

      table.bigInteger('createdAt').notNullable().defaultTo(knex.fn.now());
      table.bigInteger('updatedAt').notNullable().defaultTo(knex.fn.now());
    })
    .createTable(tables.TODO_TABLE, table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.string('description');

      table.bigInteger('createdAt').notNullable().defaultTo(knex.fn.now());
      table.bigInteger('updatedAt').notNullable().defaultTo(knex.fn.now());
      
      table
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists(tables.USER_TABLE)
    .dropTableIfExists(tables.TODO_TABLE);
};
