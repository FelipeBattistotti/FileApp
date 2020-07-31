
exports.up = function(knex) {
    return knex.schema.createTable('doc', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('content').notNullable();
        table.string('size').notNullable();
        table.string('path').notNullable();

        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('user');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('doc');
};
