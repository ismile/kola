var Knex = require('knex');

/**
 * @param {Knex} knex
 */
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('t_<%= name %>', function (table) {
      table.increments('id').primary();
      table.string('name');
    })
};

/**
 * @param {Knex} knex
 */
exports.down = function(knex, Promise) {
	return knex.schema
    .dropTableIfExists('t_<%= name %>')
};
