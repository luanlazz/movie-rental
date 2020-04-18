const express = require('express');
const cors = require('cors');

const routes = require('./models/routes');

const { port } = require('./.env');

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
})