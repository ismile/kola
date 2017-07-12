/**
 * @param {Knex} knex
 */
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('t_user', function (table) {
      table.increments('id').primary();
      table.string('username');
      table.string('password');
      table.string('fullname');
			table.string('role');
    })
};

/**
 * @param {Knex} knex
 */
exports.down = function(knex, Promise) {
	return knex.schema
    .dropTableIfExists('t_user')
};
