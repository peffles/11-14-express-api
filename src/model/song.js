'use strict';

import mongoose from 'mongoose';

const songSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  artist: {
    type: Number,
    required: true,
  },
  songLength: {
    type: Number,
    required: false,
  },

  songs: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'song',
    },
  ],
}, {

  usePushEach: true,
});

export default mongoose.model('song', songSchema);
