'use strict';

const HttpError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../lib/logger');
const Song = require('../model/song');

const router = module.exports = new express.Router();
const jsonParser = bodyParser.json();

router.post('/api/songs', jsonParser, (request, response, next) => {
  return new Song(request.body).save()
    .then((savedSong) => {
      logger.log(logger.INFO, 'Responding with a 200 status code');
      return response.json(savedSong);
    })
    .catch(next);
});

router.get('/api/songs/:id', (request, response, next) => {
  return Song.findById(request.params.id)
    .then((song) => {
      if (song) {
        logger.log(logger.INFO, 'Responding with a 200 status code and a newly posted song');
        return response.json(song);
      }
      logger.log(logger.INFO, 'Responding with a 404 status code. Song not Found');
      return next(new HttpError(404, 'song not found'));
    })
    .catch(next);
});
router.delete('/api/songs/:id', (request, response, next) => {
  return Song.findById(request.params.id)
    .then((song) => {
      if (song) {
        logger.log(logger.INFO, 'Responding with a 200 for deleting the song from database');
        return response.json(song);
      }
      logger.log(logger.INFO, 'Responding with a 404 status code. Song not Found in database');
      return next(new HttpError(404, 'song not found in database'));
    })
    .catch(next);
});
router.put('/api/songs/:id', jsonParser, (request, response, next) => {
  return Song.findById(request.params.id)
    .then((song) => {
      if (!request.body) {
        throw HttpError(400, 'Body is required!!!');
      }
      if (!song) {
        throw HttpError(404, 'Song not found!');
      }
      if (request.body.artist) {
        song.set({
          artist: `${request.body.artist}`,
        });
      }
      if (request.body.title) {
        song.set({
          title: `${request.body.title}`,
        });
      }
      logger.log(logger.INFO, 'Responding with a 200 status code and an updated song');
      return song.save()
        .then(updatedSong => response.json(updatedSong))
        .catch(next);
    })
    .catch(next);
});
