const db = require('../db/db')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const mailer = require('../services/mailer')
const userController = require('../controllers/userController')

const { existsOrError, equalsOrError, notExistsOrError } = require('./validations')

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

module.exports = {
  async save(req, res) {
    const user = req.body

    if (req.params.id) {
      user.userId = req.params.id
      delete user.password
    }

    try {
      existsOrError(user.firstName, 'Informe o nome')
      existsOrError(user.lastName, 'Informe o sobrenome')
      existsOrError(user.email, 'Informe o e-mail')
      if (!user.userId) {
        existsOrError(user.password, 'Informe a senha')
        existsOrError(user.confPassword, 'Informe a senha novamente')
        equalsOrError(user.password, user.confPassword, 'Senhas não são iguais')
      }

      const userFromDB = await db('users')
        .where({ email: user.email }).first()

      if (!user.userId) {
        notExistsOrError(userFromDB, 'Usuário já cadastrado')
      }
    } catch (msg) {
      return res.status(400).send(msg)
    }

    if (!user.userId) {
      user.password = encryptPassword(user.password)
      delete user.confPassword
    }

    if (user.userId) {
      await db('users')
        .update(user)
        .where({ userId: user.userId })
        .whereNull('deletedAt')
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {
      await db('users')
        .insert(user)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }

    return res.status(200)
  },

  async get(req, res) {
    await db('users')
      .select('userId', 'firstName', 'lastName', 'email', 'admin')
      .whereNull('deletedAt')
      .then(users => res.json(users))
      .catch(err => res.status(500).send(err))
  },

  async getById(req, res) {
    await db('users')
      .where({ userId: req.params.id })
      .whereNull('deletedAt')
      .first()
      .then(user => res.json(user))
      .catch(err => res.status(500).send(err))
  },

  async getByEmail(req, res) {
    await db('users')
      .where({ email: req.params.email })
      .whereNull('deletedAt')
      .first()
      .then(user => res.json(user))
      .catch(err => res.status(500).send(err))
  },

  async delete(req, res) {
    try {
      const rowDeleted = await db('users')
        .update({ deletedAt: new Date() })
        .where({ userId: req.params.id })
        .whereNull('deletedAt');

      existsOrError(rowDeleted, 'Usuário não encontrado')

      return res.status(204).send()
    } catch (msg) {
      return res.status(400).send(msg)
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body

    try {
      existsOrError(email, 'Informe o e-mail')

      const user = await db('users')
        .where({ email }).first()

      if (!user) {
        return res.status(400).send('Usuário não encontrado')
      }

      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date()
      now.setHours(now.getHours() + 1)

      user.passwordResetToken = token
      user.passwordResetExpires = now

      if (user.userId) {
        await db('users')
          .update(user)
          .where({ userId: user.userId })
          .whereNull('deletedAt')

        await mailer.sendMail({
          from: 'luanlazzari@gmail.com',
          to: user.email,
          subject: 'Recuperar sua senha',
          template: 'forgot_password',
          context: { token, email }
        }, (err) => {
          if (err) return res.status(400).send(err)

          return res.status(204).send()
        })
      }
    } catch (msg) {
      return res.status(400).send(msg)
    }
  },

  async resetPassword(req, res) {
    const { email, token, password, confPassword } = req.body

    try {
      existsOrError(email, 'Informe o e-mail')
      existsOrError(password, 'Informe a senha')
      existsOrError(confPassword, 'Informe a senha novamente')
      equalsOrError(password, confPassword, 'Senhas não são iguais')

      const user = await db('users')
        .where({ email: email }).first()

      if (!user) {
        return res.status(400).send('Usuário não encontrado')
      }

      if (token !== user.passwordResetToken)
        return res.status(400).send('Token do link inválido')

      const now = new Date()

      if (now > user.passwordResetExpires)
        return res.status(400).send('Token expirado')

      user.password = encryptPassword(password)
      user.passwordResetToken = null
      user.passwordResetExpires = null

      await db('users')
        .update(user)
        .where({ userId: user.userId })
        .whereNull('deletedAt')
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } catch (msg) {
      return res.status(500).send(msg)
    }
  },

  encryptPassword
}
