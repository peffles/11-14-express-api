'use strict';

require('dotenv').config();

const express = require('express');
const songRoutes = require('../routes/song-router');
const logger = require('./logger');

const app = express();

const PORT = process.env.port || 8080;

app.use(songRoutes);

app.all('*', (request, response) => {
  logger.log(logger.INFO, '404 | Triggered the catch all route!');
  return response.sendStatus(404);
});

const server = module.exports = {};
let internalServer = null;

server.start = () => {
  internalServer = app.listen(PORT, () => {
    logger.log(logger.INFO, `Server is up and listening at PORT: ${PORT}`);
  });
};

server.stop = () => {
  internalServer.close(() => {
    logger.log(logger.INFO, 'Server OFFLINE');
  });
};
