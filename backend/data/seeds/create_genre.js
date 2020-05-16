
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('genres').del()
    .then(function () {
      // Inserts seed entries
      return knex('genres').insert([
        {genreId: 1, description: 'Ação'},
        {genreId: 2, description: 'Romance'},
        {genreId: 3, description: 'Comédia'},
        {genreId: 4, description: 'Drama'}
      ])
    })
}
