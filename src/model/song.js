'use strict';

const uuid = require('uuid/v1');

class Song {
  constructor(title, genre, artist) {
    this.id = uuid();
    this.artist = artist;
    this.title = title;
    this.genre = genre;
  }
}

module.exports = Song;
