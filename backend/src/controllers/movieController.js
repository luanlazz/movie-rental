const db = require('../db/db');

const { existsOrError, notExistsOrError } = require('./validations');

module.exports = {
    async save(req, res) {
        const movie = req.body;

        if (req.params.id) {
            movie.movieId = req.params.id;
        }

        try {
            existsOrError(movie.title, 'Informe o titulo');
            existsOrError(movie.director, 'Informe o diretor');
            existsOrError(movie.quantity, 'Informe a quantidade');
            existsOrError(movie.avaible, 'Informe a quantidade disponivel');
            existsOrError(movie.price, 'Informe o valor');

            if (movie.avaible > movie.quantity) {
                movie.avaible = movie.quantity;
            }

            const movieDb = await db('movies')
                .where({ title: movie.title }).first();

            if (!movie.movieId) {
                notExistsOrError(movieDb, 'Filme já cadastrado');
            }

        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (movie.movieId) {
            await db('movies')
                .update(movie)
                .where({ movieId: movie.movieId })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        } else {
            await db('movies')
                .insert(movie)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    },

    async get(req, res) {
        await db('movies')
            .select()
            .then(movies => res.json(movies))
            .catch(err => res.status(500).send(err));
    },

    async getById(req, res) {
        await db('movies')
            .select()
            .where({ movieId: req.params.id })
            .then(movie => res.json(movie))
            .catch(err => res.status(500).send(err));
    },

    async getByTitle(req, res) {
        await db('movies')
            .select()
            .whereRaw('LOWER(title) LIKE ?', `%${req.params.title.toLowerCase()}%`)
            .then(movie => res.json(movie))
            .catch(err => res.status(500).send(err));
    },

    async delete(req, res) {
        try{
            const rowDeleted = await db('movies')
                                .where({ movieId: req.params.id }).del();

            existsOrError(rowDeleted, 'Filme não encontrado');

            return res.status(204).send();
        } catch(msg) {
            return res.status(400).send(msg);
        }
    },
}