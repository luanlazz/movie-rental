const db = require('../db/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { authSecret } = require('../.env')

function generateToken(params = {}) {
  return jwt.sign(params, authSecret, {
    expiresIn: 86400
  })
}

module.exports = {
  async signin(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send('Informe usuário e senha')
    }

    try {
      const user = await db('users')
        .where({ email: email }).first()

      if (!user) {
        return res.status(400).send('Usuário não encontrado')
      }

      const passwordMatch = await bcrypt.compareSync(password, user.password)

      if (!passwordMatch) {
        return res.status(400).send('Senha incorreta')
      }

      const payload = {
        user: {
          id: user.userId,
          firstName: user.name,
          lastName: '',
          email: user.email
        }
      }

      res.json({
        ...payload,
        token: generateToken(payload)
      })
    } catch (msg) {
      return res.status(500).send(msg)
    }
  },

  async validateToken (req, res) {
    const userData = req.body || null

    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret)
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true)
        }
      }
    } catch (e) {

    }

    res.send(false)
  }
}
