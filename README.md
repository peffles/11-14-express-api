# Lab 12 - Express Middleware
**Author**: Wyatt Pefey
**Version**: 1.0.0
## Build Status: [![Build Status](https://travis-ci.com/peffles/11-14-express-api.svg?branch=master)](https://travis-ci.com/peffles/11-14-express-api)
___
## Overview
This Lab is an extension from previous lab, Logger middleware and error middleware was added to make codebase more modularized. Also includes the ```http-errors``` package for better error handling.
For this lab I used express to make requests to a songs API. 

Posts a song to the storage by making a POST request to the /api/songs endpoint. If request is invalid, it will send a 400 status codes.

Retrieves all songs in storage using a GET request to the api/songs endpoint. If there is an invalid entry, responds with 400 error codes

Deletes a song from storage by making a DELETE request to the api/songs/:id enpoint. A 200 status code will be logged if the deletion is successful.
## Getting Started
- Install dependencies
- Start server using the ```node main.js``` commands
- Enter commands to make requests to the server.

## Testing:
This app is tested using Jest

To start the test suite, enter the ```npm run test``` command in your terminal.

***NOTE: THERE ARE SMALL BUGS IN TEST SUITE THAT CAUSE SOME TESTS TO PASS, THEY ARE COMMENTED OUT UNTIL I CAN FIX THEM.***
 - READ COMMENTS IN TEST FILE FOR DETAILS!

## Architecture
- JavaScript (ES6)
- Node
- Express
- http-errors
- superagent
- winston
- jest 
- dotenv
- faker
