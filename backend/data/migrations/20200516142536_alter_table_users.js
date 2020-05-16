
exports.up = function(knex) {
  return knex.schema.alterTable('users', table => {
    table.renameColumn('name', 'firstName')
    table.string('lastName').notNull().defaultTo('')
    table.boolean('admin').notNull().defaultTo(false)
    table.boolean('accountVerified').notNull().defaultTo(false)
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('lastName')
    table.dropColumn('admin')
    table.dropColumn('accountVerified')
  })
}
