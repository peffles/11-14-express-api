'use strict';

const mongoose = require('mongoose');
const HttpError = require('http-errors');
const Album = require('./album');

const songSchema = mongoose.Schema({
  artist: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'album',
  },
});

function songPreHook(done) {
  return Album.findById(this.album)
    .then((albumFound) => {
      if (!albumFound) {
        throw new HttpError(404, 'Album not found');
      }
      albumFound.song.push(this._id);
      return albumFound.save();
    })
    .then(() => done())
    .catch(error => done(error));
}

const songPostHook = (document, done) => {
  return Album.findById(document.album)
    .then((albumFound) => {
      if (!albumFound) {
        throw new HttpError(500, 'Album not found');
      }
      albumFound.song = albumFound.song.filter((song) => {
        return song._id.toString() !== document._id.toString();
      });
      return albumFound.save();
    })
    .then(() => done())
    .catch(error => done(error));
};

songSchema.pre('save', songPreHook);
songSchema.post('remove', songPostHook);
module.exports = mongoose.model('song', songSchema);
