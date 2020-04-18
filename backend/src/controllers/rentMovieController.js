const db = require('../db/db');

const { existsOrError } = require('./validations');

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

module.exports = {

    async rentMovie(req, res) {
        return db.transaction(async trx => {
            try {
                const rentInfo = req.body;
    
                existsOrError(rentInfo.movieId, 'Informe o filme');
                existsOrError(rentInfo.userId, 'Informe o usuário');
    
                rentInfo.rentedAt = new Date();
                rentInfo.returnedAt = null;
                rentInfo.total = 0;
    
                const movie = await db('movies')
                    .select()
                    .where({ movieId: rentInfo.movieId }).first();
    
                if (movie.avaible < 1 || movie === undefined) {
                    return res.status(400).send('Não há unidades disponiveis');
                }
    
                const rentInserted = await db('rent')
                    .transacting(trx)
                    .insert(rentInfo);
        
                existsOrError(rentInserted, 'Aluguel não concluido');
    
                movie.avaible = movie.avaible - 1;
        
                const movieUpdated = await db('movies')
                    .transacting(trx)
                    .update(movie)
                    .where({ movieId: rentInfo.movieId });
    
                existsOrError(movieUpdated, 'Aluguel não concluido');
    
                await trx.commit(rentInserted);
                await trx.commit(movieUpdated);
                
                return res.status(204).send();
            } catch (msg) {
                await trx.rollback(msg);
                return res.status(400).send(msg);
            }
        })
    },

    async returnMovie(req, res) {
        return db.transaction(async trx => {
            try {
                const rentInfo = await db('rent')
                    .select()
                    .where({ rentId: req.params.id })
                    .whereNull('returnedAt').first();

                existsOrError(rentInfo, 'Locação não encontrada ou já devolvida');
                
                const movie = await db('movies')
                    .select()
                    .where({ movieId: rentInfo.movieId }).first();
    
                rentInfo.returnedAt = new Date();
    
                let days = dateDiffInDays(rentInfo.rentedAt, rentInfo.returnedAt);
                days = days == 0 ? 1 : days;
    
                rentInfo.total = movie.price * days;
        
                const rentUpdated = await db('rent')
                    .transacting(trx)
                    .update(rentInfo)
                    .where({ rentId: rentInfo.rentId });
    
                existsOrError(rentUpdated, 'Devolução não concluida');
    
                movie.avaible = movie.avaible + 1;
    
                const movieUpdated = await db('movies')
                    .transacting(trx)
                    .update(movie)
                    .where({ movieId: movie.movieId });
    
                existsOrError(movieUpdated, 'Devolução não concluida');
    
                await trx.commit(rentUpdated);
                await trx.commit(rentUpdated);
    
                return res.status(204).send();
            } catch (msg) {
                await trx.rollback(msg);
                return res.status(400).send(msg);
            }
        })
    },

    async getRented(req, res) {
        await db('rent')
            .select()
            .whereNull('returnedAt')
            .then(rents => res.json(rents))
            .catch(err => res.status(500).send(err));
    },

    async getReturned(req, res) {
        await db('rent')
            .select()
            .whereNotNull('returnedAt')
            .then(rents => res.json(rents))
            .catch(err => res.status(500).send(err));
    },
}

