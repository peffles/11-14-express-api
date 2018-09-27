'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const songRoutes = require('../routes/song-router');
const logger = require('./logger');
const errorMiddleware = require('./error-middleware');
const loggerMiddleware = require('./logger-middleware');

const app = express();

const PORT = process.env.port || 8080;

app.use(loggerMiddleware);
app.use(songRoutes);
app.use(errorMiddleware);

app.all('*', (request, response) => {
  logger.log(logger.INFO, '404 | Triggered the catch all route!');
  return response.sendStatus(404);
});

const server = module.exports = {};
let internalServer = null;

server.start = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      return internalServer = app.listen(PORT, () => { // eslint-disable-line
        logger.log(logger.INFO, `Server is up and listening at PORT: ${PORT}`);
      });
    });
};

server.stop = () => {
  return mongoose.disconnect()
    .then(() => {
      return internalServer.close(() => {
        logger.log(logger.INFO, 'Server OFFLINE.');
      });
    });
};
