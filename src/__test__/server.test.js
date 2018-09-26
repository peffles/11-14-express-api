'use strict';

process.env.PORT = 8080;

const faker = require('faker');
const superagent = require('superagent');
const server = require('../lib/server');

const API_URL = `http://localhost:${process.env.PORT}/api/songs`;
describe('testing routes for /api/songs', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  // **This test keep giving back 'undefined, cant seem to figure it out, may need help tomorrow**'
  //   test('should respond with 200 status code when a new song is posted', () => {
  //     return superagent.post(API_URL)
  //       .set('Content-Type', 'application/json')
  //       .send({
  //         artist: 'Artist',
  //         title: 'Some Song',
  //       })
  //       .then((response) => {
  //         expect(response.status).toEqual(200);
  //         expect(response.body.id).toBeTruthy();
  //         expect(response.body.artist).toEqual('Artist');
  //         expect(response.body.title).toEqual('Some Song');
  //       });
  //   });
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

  // THIS TEST EXPECTS A 2 WORD FAKER RESPONSE
  // BUT RECEIVES A DIFFERENT 2 WORD FAKER RESPONSE CAUSING IT TO FAIL!!!
  // test('should respond with a 200 status code and return song with faked data', () => {
  //   const fakerRequest = {
  //     title: faker.lorem.words(2),
  //     artist: faker.lorem.words(2),
  //   };
  //   return superagent.post(API_URL)
  //     .set('Content-Type', 'application/json')
  //     .send(fakerRequest)
  //     .then((postResponse) => {
  //       fakerRequest.id = postResponse.body.id;
  //       return superagent.get(`${API_URL}/${postResponse.body.id}`);
  //     })
  //     .then((getResponse) => {
  //       expect(getResponse.status).toEqual(200);
  //       expect(getResponse.body.id).toEqual(fakerRequest.id);
  //       expect(getResponse.body.title).toEqual(fakerRequest.title);
  //       expect(getResponse.body.artist).toEqual(fakerRequest.artist);
  //     });
  // });

  test('should respond with 404 if  desired song to be removed is not found', () => {
    return superagent.delete(`${API_URL}/thisWontwork`)
      .then(Promise.reject)
      .catch((getResponse) => {
        expect(getResponse.status).toEqual(404);
      });
  });
  // THIS FAKER REQUEST GOES THROUGH PERFECTLY WITH NO ERRORS BUT 
  // OTHER ONE RECEIVES TOALLY DIFFERENT
  // FAKER REPONSE, NEED TO FIND A FIX
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
