'use strict';

const faker = require('faker');
const Song = require('../../model/song');

const SongMock = module.exports = {};

SongMock.pCreateSongMock = () => {
  return new Song({
    artist: faker.lorem.words(5),
    title: faker.lorem.words(5),
  }).save();
};

SongMock.pCleanSongMocks = () => {
  return Song.remove({});
};
