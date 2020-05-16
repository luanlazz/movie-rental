
exports.up = function(knex) {
  return knex.schema.alterTable('movies', table => {
    table.integer('genreId').references('genreId').inTable('genres')
    table.dropColumn('quantity')
    table.dropColumn('avaible')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('movies', table => {
    table.integer('quantity').notNull()
    table.integer('avaible').notNull()
  })
}
