
const userController = require('../../src/controllers/userController')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      const password = userController.encryptPassword('12345')
      console.log('password', password)

      return knex('users').insert([
        {
          userId: 1,
          firstName: 'admin',
          lastName: 'admin',
          email: 'admin@hotmail.com',
          password,
          admin: 'true',
          accountVerified: 'true'
        }
      ])
    })
}
