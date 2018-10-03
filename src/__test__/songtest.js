// 'use strict';

// const superagent = require('superagent');
// const server = require('../lib/server');
// const songMock = require('./lib/song-mock');

// const API_URL = `http://localhost:${process.env.PORT}/api/songs`;

// describe('/api/songs', () => {
//   beforeAll(server.start);
//   afterAll(server.stop);
//   beforeEach(songMock.pCleanSongMocks);

//   test('PUT | should respond with 200 status and an updated item', () => {
//     let savedAlbumMock;
//     return songMock.pCreateAlbumMock()
//       .then((mock) => {
//         savedAlbumMock = mock;
//         return superagent.put(`${API_URL}/${mock.song._id}`)
//           .send({
//             artist: 'Updated artist',
//           });
//       })
//       .then((response) => {
//         expect(response.status).toEqual(200);
//         expect(response.body.artist).toEqual(savedAlbumMock.song.artist);
//         expect(response.body.title).toEqual('Updated artist');
//         expect(response.body.album.toString()).toEqual(savedAlbumMock.album._id.toString());
//       });
// });
// });
