'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../lib/logger');
const Song = require('../model/song');

const router = module.exports = new express.Router();
const jsonParser = bodyParser.json();

const storeById = [];
const storeByHash = {};

router.post('/api/songs', jsonParser, (request, response) => {
  logger.log(logger.INFO, 'Processing POST request on /api/songs');
  if (!request.body) {
    logger.log(logger.INFO, '400 | Body is required!');
    return response.sendStatus(400);
  }
  if (!request.body.artist) {
    logger.log(logger.INFO, '400 | Artist is required!');
    return response.sendStatus(400);
  }
  if (!request.body.title) {
    logger.log(logger.INFO, '400 | Song title is required!');
    return response.sendStatus(400);
  }
  const song = new Song(request.body.artist, request.body.title);
  storeById.push(song.id);
  storeByHash[song.id] = song;
  logger.log(logger.INFO, 'Responding with a 200 status code');
  return response.json(song);
});

router.get('/api/songs/:id', (request, response) => {
  logger.log(logger.INFO, `Getting song with ID: ${request.params.id}`);
  if (storeByHash[request.params.id]) {
    return response.json(storeByHash[request.params.id]).sendStatus(200);
  }
  logger.log(logger.INFO, '404 | No song with that ID was found');
  return response.sendStatus(404);
});

router.delete('/api/songs/:id', (request, response) => {
  logger.log(logger.INFO, `Deleting song with ID: ${request.params.id}`);
  if (storeByHash[request.params.id]) {
    delete storeByHash[request.params.id];
    logger.log(logger.INFO, '200 | Requested song has been removed from storage');
    return response.json(storeByHash);
  }
  logger.log(logger.INFO, '404 | No song found!');
  return response.status(404).json(storeByHash);
});
