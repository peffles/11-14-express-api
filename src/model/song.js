'use strict';

const uuid = require('uuid/v1');

class Song {
  constructor(artist, title) {
    this.id = uuid();
    this.artist = artist;
    this.title = title;
  }
}

module.exports = Song;
