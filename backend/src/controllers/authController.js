const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../db/db')

function generateToken(params = {}) {
  return jwt.sign(params, process.env.AUTH_SECRET, {
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
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          admin: user.admin,
          accountVerified: user.accountVerified
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
        const token = jwt.decode(userData.token, process.env.AUTH_SECRET)
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true)
        }
      }
    } catch (msg) {
      return res.status(400).send(msg)
    }

    res.send(false)
  }

}
