
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('userId').primary()
    table.string('firstName').notNull()
    table.string('lastName').notNull()
    table.string('email').notNull()
    table.string('password').notNull()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('deletedAt')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
