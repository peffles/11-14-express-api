'use strict';

const faker = require('faker');
const Album = require('../../model/album');

const albumMock = module.exports = {};

albumMock.pCreateAlbumMock = () => {
  return new Album({
    artist: faker.lorem.words(1),
    title: faker.lorem.words(1),
  }).save();
};

albumMock.pCleanAlbumMocks = () => {
  return Album.remove({});
};
