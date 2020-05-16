const express = require('express')
const cors = require('cors')

const routes = require('./models/routes')

const server = express();

server.use(cors());
server.use(express.json())
server.use(routes);

server.listen(process.env.API_PORT, () => {
  console.log(`Server running at localhost:${process.env.API_PORT}`)
})
