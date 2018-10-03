'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');
const Album = require('../model/album');
const logger = require('../lib/logger');


const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.post('/api/albums', jsonParser, (request, response, next) => {
  return new Album(request.body).save()
    .then((savedAlbum) => {
      logger.log(logger.INFO, 'Responding with a 200 status code');
      return response.json(savedAlbum);
    })
    .catch(next);
});

router.get('/api/albums/:id', (request, response, next) => {
  return Album.findById(request.params.id)
    .then((album) => {
      if (album) {
        logger.log(logger.INFO, 'Responding with a 200 status code');
        return response.json(album);
      }
      logger.log(logger.INFO, 'Responding with a 404 status code. Album Not Found');
      return next(new HttpError(404, 'Album Not Found'));
    })
    .catch(next);
});

router.delete('/api/albums/:id', (request, response, next) => {
  return Album.findById(request.params.id)
    .then((album) => {
      if (album) {
        logger.log(logger.INFO, 'Responding with a 200 status code');
        return response.json(album);
      }
      logger.log(logger.INFO, 'Responding with a 404 status code. Album Not Found');
      return next(new HttpError(404, 'Album Not Found'));
    })
    .catch(next);
});

router.put('/api/albums/:id', jsonParser, (request, response, next) => {
  return Album.findByIdAndUpdate(request.params.id)
    .then((album) => {
      if (!request.body) {
        throw HttpError(400, 'Body is required');
      }
      if (!album) {
        throw HttpError(404, 'Album is required');
      }
      if (request.body.artist) {
        album.set({
          artist: `${request.body.artist}`,
        });
      }
      if (request.body.title) {
        album.set({
          title: `${request.body.title}`,
        });
      }
      logger.log(logger.INFO, 'Responding with a 200 status code');
      return album.save()
        .then(updatedAlbum => response.json(updatedAlbum))
        .catch(next);
    })
    .catch(next);
});
