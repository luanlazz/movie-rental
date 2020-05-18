const express = require('express')

const userController = require('../controllers/userController')
const movieController = require('../controllers/movieController')
const rentMovieController = require('../controllers/rentMovieController')
const authController = require('../controllers/authController')

const authMiddleware = require('../middleware/auth')

const routes = express.Router()

routes.post('/signup', userController.save)
routes.post('/signin', authController.signin)
routes.post('/forgot-password', userController.forgotPassword)
routes.post('/reset-password', userController.resetPassword)
routes.post('/validate-token', authController.validateToken)

routes.route('/users')
  .all(authMiddleware)
  .get(userController.get)
  .post(userController.save)

routes.route('/users/:id')
  .all(authMiddleware)
  .get(userController.getById)
  .post(userController.save)
  .delete(userController.delete)

routes.route('/movies')
  .all(authMiddleware)
  .get(movieController.get)
  .post(movieController.save)

routes.route('/movies/:id')
  .all(authMiddleware)
  .get(movieController.getById)
  .post(movieController.save)
  .delete(movieController.delete);

routes.route('/movies/search/:title')
  .all(authMiddleware)
  .get(movieController.getByTitle);


routes.route('/rent')
  .all(authMiddleware)
  .get(rentMovieController.getRented)
  .post(rentMovieController.rentMovie);

routes.route('/return/:id')
  .all(authMiddleware)
  .get(rentMovieController.getReturned)
  .post(rentMovieController.returnMovie);

module.exports = routes;
