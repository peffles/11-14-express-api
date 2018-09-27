'use strict';

const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
  artist: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'song',
    },
  ],
}, {

  usePushEach: true,
});

module.exports = mongoose.model('song', songSchema);
