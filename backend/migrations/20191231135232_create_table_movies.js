
exports.up = function(knex) {
  return knex.schema.createTable('movies', table => {
      table.increments('movieId').primary()
      table.string('title').notNull()
      table.string('director').notNull()
      table.decimal('price').notNull()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('movies')
}
