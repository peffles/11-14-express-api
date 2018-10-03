'use strict';

const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
  artist: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  song: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'song',
    },
  ],
},
{
  usePushEach: true,
});

module.exports = mongoose.model('album', albumSchema);
