const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS
  }
})

const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('src/resources/mail/auth/'),
    layoutsDir: path.resolve('src/resources/mail/auth/'),
    defaultLayout: 'forgot_password.html',
  },
  viewPath: path.resolve('src/resources/mail/auth/'),
  extName: '.html',
}

transport.use('compile', hbs(handlebarOptions))

module.exports = transport
