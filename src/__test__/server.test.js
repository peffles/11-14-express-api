'use strict';

process.env.PORT = 8080;

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');

const API_URL = `http://localhost:${process.env.PORT}/api/songs`;
describe('/api/songs', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  test('should respond with 200 status code when a new song is posted', () => {
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send({
        artist: 'Artist',
        title: 'Some Song',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.id).toBeTruthy();
        expect(response.body.artist).toEqual('Artist');
        expect(response.body.title).toEqual('Some Song');
      });
  });
  test('Should respond with a 400 status code if there is no artist', () => {
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send({
        title: 'Some Song',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('Should respond with a 400 status code if there is no song title', () => {
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send({
        artist: 'Artist',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('should respond with a 200 status code and return song with faked data', () => {
    const fakerRequest = {
      artist: faker.lorem.words(2),
      title: faker.lorem.words(2),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(fakerRequest)
      .then((postResponse) => {
        fakerRequest.id = postResponse.body.id;
        return superagent.get(`${API_URL}/${postResponse.body.id}`);
      })
      .then((getResponse) => {
        expect(getResponse.status).toEqual(200);
        expect(getResponse.body.id).toEqual(fakerRequest.id);
        expect(getResponse.body.artist).toEqual(fakerRequest.artist);
        expect(getResponse.body.title).toEqual(fakerRequest.title);
      });
  });

  test('should respond with 404 if  desired song to be removed is not found', () => {
    return superagent.delete(`${API_URL}/thisWontwork`)
      .then(Promise.reject)
      .catch((getResponse) => {
        expect(getResponse.status).toEqual(404);
      });
  });
  test('should respond with 200 when a song is successfully removed from storage', () => {
    const fakerRequest = {
      title: faker.lorem.words(2),
      artist: faker.lorem.words(2),
    };
    return superagent.post(API_URL)
      .set('Content-Type', 'application/json')
      .send(fakerRequest)
      .then((postResponse) => {
        fakerRequest.id = postResponse.body.id;
        return superagent.delete(`${API_URL}/${postResponse.body.id}`);
      })
      .then((getResponse) => {
        expect(getResponse.status).toEqual(200);
      });
  });
});
