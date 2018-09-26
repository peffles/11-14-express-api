'use strict';

const logger = require('./logger');

module.exports = (error, request, response, next) => { //eslint-disable-line
  logger.log(logger.ERROR, 'ERROR_MIDDLEWARE');
  logger.log(logger.ERROR, error);

  if (error.status) {
    logger.log(logger.ERROR, `Responding with a ${error.status} code and the following error message: ${error.message}`);
    return response.sendStatus(error.status);
  }
  logger.log(logger.ERROR, 'Responding with a 500 error code for server error');
  return response.sendStatus(500);
};
