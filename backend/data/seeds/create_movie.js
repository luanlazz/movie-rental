
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([
        {
          movieId: 1,
          title: 'O milagre da cela 7',
          director: 'Mehmet Ada Öztekin',
          price: 4.5,
          genreId: 4
        },
        {
          movieId: 2,
          title: 'Ford v Ferrari',
          director: 'James Mangold',
          price: 4.5,
          genreId: 1
        },
        {
          movieId: 3,
          title: 'The Platform',
          director: 'Galder Gaztelu-Urrutia',
          price: 4.5,
          genreId: 4
        },
        {
          movieId: 4,
          title: 'Interstellar',
          director: 'Christopher Nolan',
          price: 4.5,
          genreId: 1
        }
      ])
    })
}
