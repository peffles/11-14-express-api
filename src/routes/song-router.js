'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');

const Song = require('../model/song');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('/api/songs', jsonParser, (request, response, next) => {
  return new Song(request.body).save()
    .then((savedSong) => {
      logger.log(logger.INFO, 'Responding with a 200 status code');
      response.json(savedSong);
    })
    .catch(error => next(error));
});

router.put('/api/songs/:id', jsonParser, (request, response, next) => {
  const updateOptions = {
    runValidators: true,
    new: true,
  };
  return Song.findByIdAndUpdate(request.params.id, request.body, updateOptions)
    .then((updatedSong) => {
      if (!updatedSong) {
        logger.log(logger.INFO, 'Responding with a 404 status code');
        return next(new HttpError(404, 'Could not find song to update in database'));
      }
      logger.log(logger.INFO, 'Responding with a 200 status code');
      return response.json(updatedSong);
    })
    .catch(error => next(error));
});
