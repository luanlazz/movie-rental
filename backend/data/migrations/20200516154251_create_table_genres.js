
exports.up = function(knex) {
  return knex.schema.createTable('genres', table => {
    table.increments('genreId').primary()
    table.string('description').notNull()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('genres')
}
