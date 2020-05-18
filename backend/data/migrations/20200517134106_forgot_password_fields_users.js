
exports.up = function(knex) {
  return knex.schema.alterTable('users', table => {
    table.string('passwordResetToken')
    table.datetime('passwordResetExpires')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('passwordResetToken')
    table.dropColumn('passwordResetExpires')
  })
}
