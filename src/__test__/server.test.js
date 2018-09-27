'use strict';

process.env.PORT = 8080;

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');

const songMock = require('./lib/song-mock');

const API_URL = `http://localhost:${process.env.PORT}/api/songs`;

// ___________________________________________________________________________
// | ESLINT FREAKS OUT ABOUT THE UNDERSCORE IN THE "_id", hence the disables..|
// | "No Underscore Dangle"                                                   |
// |__________________________________________________________________________|

describe('Testing routes for /api/songs', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(songMock.pCleanSongMocks);

  test('POST | Should respond with 200 status code and a newly posted song', () => {
    const fakerRequest = {
      title: faker.lorem.words(1),
      artist: faker.lorem.words(1),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(fakerRequest)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.artist).toEqual(fakerRequest.artist);
        expect(response.body.title).toEqual(fakerRequest.title);
        expect(response.body._id.toString()).toBeTruthy(); //eslint-disable-line
      });
  });
  test('POST | Should respond with a 400 status code if there is no artist', () => {
    const fakerRequest = {
      title: faker.lorem.words(2),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(fakerRequest)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('POST | Should respond with a 400 status code if there is no song title', () => {
    const fakerRequest = {
      artist: faker.lorem.words(1),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(fakerRequest)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });

  test('GET | Should respond with a 200 status code and return song with faked data', () => {
    let savedSongMock = null;
    return songMock.pCreateSongMock()
      .then((SongMock) => {
        savedSongMock = SongMock;
        return superagent.get(`${API_URL}/${SongMock._id}`); //eslint-disable-line
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body._id.toString()).toEqual(savedSongMock._id.toString()); //eslint-disable-line
        expect(response.body.title).toEqual(savedSongMock.title);
      });
  });
  test('GET | Should respond with 404 if there isnt a matching id in the database', () => {
    return superagent.get(`${API_URL}/thisWontWork`)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status)
          .toEqual(404);
      });
  });
  test('PUT | Should respond with 404 if no matching id is found', () => {
    return superagent.put(`${API_URL}/thisWontWork`)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status)
          .toEqual(404);
      });
  });

  test('DELETE/DESTROY | Should respond with 404 if desired song cannot be found in database', () => {
    return superagent.delete(`${API_URL}/thisWontwork`)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });
  test('DELETE/DESTROY | Should respond with 200 when a song is successfully removed from database', () => {
    let savedSongMock = null;
    return songMock.pCreateSongMock()
      .then((SongMock) => {
        savedSongMock = SongMock;
        return superagent.delete(`${API_URL}/${SongMock._id}`); //eslint-disable-line
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body._id.toString()).toEqual(savedSongMock._id.toString()); //eslint-disable-line
        expect(response.body.title).toEqual(savedSongMock.title);
      });
  });
});
