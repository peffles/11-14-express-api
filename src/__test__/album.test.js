'use strict';

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');
const AlbumMock = require('./lib/album-mock');

const API_URL = `http://localhost:${process.env.PORT}/api/albums`;

describe('/api/albums', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(AlbumMock.pCleanAlbumMocks);

  test('POST | Should respond with 200 status code and a newly posted Album', () => {
    const fakerRequest = {
      artist: faker.lorem.words(1),
      title: faker.lorem.words(1),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(fakerRequest)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.artist).toEqual(fakerRequest.artist);
        expect(response.body.title).toEqual(fakerRequest.title);
        expect(response.body._id.toString()).toBeTruthy();
      });
  });

  test('POST | Should respond with 400 status code if there is no title', () => {
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

  test('POST | Should respond with 400 status code if there is no artist', () => {
    const fakerRequest = {
      title: faker.lorem.words(1),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(fakerRequest)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });

  test('GET | Should respond with 200 status code if there is a matching id found', () => {
    let savedAlbumMock = null;
    return AlbumMock.pCreateAlbumMock()
      .then((createdAlbumMock) => {
        savedAlbumMock = createdAlbumMock;
        return superagent.get(`${API_URL}/${createdAlbumMock._id}`);
      })
      .then((getResponse) => {
        expect(getResponse.status).toEqual(200);
        expect(getResponse.body._id.toString()).toEqual(savedAlbumMock._id.toString());
        expect(getResponse.body.artist).toEqual(savedAlbumMock.artist);
      });
  });
  test('GET | Should respond with 404 status code if there is no album with a matching id', () => {
    return superagent.get(`${API_URL}/thisWontWork`)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });

  test('DELETE/DESTROY | Should respond with 200 when an album has been removed', () => {
    let savedAlbumMock = null;
    return AlbumMock.pCreateAlbumMock()
      .then((createdAlbumMock) => {
        savedAlbumMock = createdAlbumMock;
        return superagent.delete(`${API_URL}/${createdAlbumMock._id}`);
      })
      .then((deleteResponse) => {
        expect(deleteResponse.status).toEqual(200);
        expect(deleteResponse.body._id.toString()).toEqual(savedAlbumMock._id.toString());
        expect(deleteResponse.body.artist).toEqual(savedAlbumMock.artist);
      });
  });

  test('DELETE/DESTROY | Should respond with 404 if there isnt an ablum with matching id', () => {
    return superagent.delete(`${API_URL}/thisWontWork`)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });

  test('PUT | Should respond with 204 if we updated an album', () => {
    let savedAlbumMock = null;
    return AlbumMock.pCreateAlbumMock()
      .then((createdAlbumMock) => {
        savedAlbumMock = createdAlbumMock;
        const updatedAlbum = {
          artist: faker.lorem.words(1),
          title: faker.lorem.words(1),
        };
        return superagent.put(`${API_URL}/${createdAlbumMock._id}`)
          .send(updatedAlbum)
          .then((putResponse) => {
            expect(putResponse.status).toEqual(200);
            expect(putResponse.body._id).toEqual(savedAlbumMock.id);
            expect(putResponse.body.artist).toEqual(updatedAlbum.artist);
            expect(putResponse.body.title).toEqual(updatedAlbum.title);
          });
      });
  });

  test('PUT | Should respond with 404 status code if there isnt an album with matching id', () => {
    return superagent.put(`${API_URL}/thisWontWork`)
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });
});
