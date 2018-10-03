'use strict';

const faker = require('faker');
const Album = require('./album-mock');
const Song = require('../../model/song');

const songMock = module.exports = {};

songMock.pCreateAlbumMock = () => {
  const resultMock = {};
  return Album.pCreateAlbumMock()
    .then((createdAlbumMock) => {
      resultMock.album = createdAlbumMock;
      return new Song({
        artist: faker.lorem.words(1),
        title: faker.lorem.words(1),
        album: createdAlbumMock.id,
      }).save();
    })
    .then((createdSongMock) => {
      resultMock.song = createdSongMock;
      return resultMock;
    });
};

songMock.pCleanSongMocks = () => {
  return Promise.all([
    Song.remove({}),
    Album.pCleanAlbumMocks(),
  ]);
};
