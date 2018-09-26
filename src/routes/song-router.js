'use strict';

const HttpError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../lib/logger');
const Song = require('../model/song');

const router = module.exports = new express.Router();
const jsonParser = bodyParser.json();

const storeById = [];
const storeByHash = {};

router.post('/api/songs', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'Processing POST request on /api/songs');
  if (!request.body) {
    return next(new HttpError(400, 'Body is required'));
  }
  if (!request.body.artist) {
    return next(new HttpError(400, 'Artist is required'));
  }
  if (!request.body.title) {
    return next(new HttpError(400, 'Song Title is required'));
  }
  const song = new Song(request.body.artist, request.body.title);
  storeById.push(song.id);
  storeByHash[song.id] = song;
  logger.log(logger.INFO, 'Responding with a 200 status code');
  return response.json(song);
});

router.get('/api/songs/:id', (request, response, next) => {
  logger.log(logger.INFO, `Getting song with ID: ${request.params.id}`);
  if (storeByHash[request.params.id]) {
    return response.json(storeByHash[request.params.id]).sendStatus(200);
  }
  return next(new HttpError(404, 'No song with that ID was found!'));
});

router.delete('/api/songs/:id', (request, response, next) => {
  logger.log(logger.INFO, `Deleting song with ID: ${request.params.id}`);
  if (storeByHash[request.params.id]) {
    delete storeByHash[request.params.id];
    logger.log(logger.INFO, '200 | Requested song has been removed from storage');
    return response.json(storeByHash);
  }
  return next(new HttpError(404, 'Song not found!'));
});
