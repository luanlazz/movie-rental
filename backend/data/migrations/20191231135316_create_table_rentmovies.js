
exports.up = function(knex) {
  return knex.schema.createTable('rent', table => {
    table.increments('rentId').primary()
    table.integer('movieId').references('movieId').inTable('movies')
    table.integer('userId').references('userId').inTable('users')
    table.datetime('rentedAt').notNull()
    table.datetime('returnedAt')
    table.decimal('total')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('rentMovies')
}
