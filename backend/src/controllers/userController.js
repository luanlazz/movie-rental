const db = require('../db/db');
const bcrypt = require('bcryptjs');

const { existsOrError, equalsOrError, notExistsOrError } = require('./validations');

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}
module.exports = {
    
    async save(req, res) {
        const user = req.body;

        if (req.params.id) {
            user.userId = req.params.id;
        }

        try {
            existsOrError(user.name, 'Informe o nome');
            existsOrError(user.email, 'Informe o e-mail');
            existsOrError(user.password, 'Informe a senha');
            existsOrError(user.confPassword, 'Informe a senha novamente');
            equalsOrError(user.password, user.confPassword, 'Senhas não são iguais');

            const userFromDB = await db('users')
                .where({ email: user.email }).first();

            if (!user.userId) {
                 notExistsOrError(userFromDB, 'Usuário já cadastrado');
            }
        } catch (msg) {
            return res.status(400).send(msg);
        }

        user.password = encryptPassword(user.password);

        delete user.confPassword;
        
        if (user.userId) {
            await db('users')
                .update(user)
                .where({ userId: user.userId })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        } else {
            await db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }

        return res.status(200);
    },

    async get(req, res) {
        await db('users')
            .select('userId', 'name', 'email')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err));
    },

    async getById(req, res) {
        await db('users')
            .select('userId', 'name', 'email')
            .where({ userId: req.params.id })
            .whereNull('deletedAt')
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err));
    },

    async delete(req, res) {

        try {
            const rowDeleted = await db('users')
                .update({ deletedAt: new Date() })
                .where({ userId: req.params.id })
                .whereNull('deletedAt');

            existsOrError(rowDeleted, 'Usuário não encontrado');
         
            return res.status(204).send();
        } catch (msg) {
            return res.status(400).send(msg);
        }
    }

};