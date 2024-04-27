const request = require('supertest');
const expect = require('expect');

let app = require('./server').app;

// Server
  // GET /
    // some test cases
  // GET /users
    // some test cases

describe('Server', () => {

  describe('GET /', () => {
    it ('should return Hello, World! response', (done) => {
      request(app)
        .get('/')
        .expect(404)
        //.expect({
        //  error: 'Page not found.'
        //})
        .expect((res) => {
          expect(res.body).toInclude({
            error: 'Page not found.'
          })
        })
        .end(done);
    });
  });

  describe('GET /users', () => {
    // Make a new test
    // assert 200
    // assert that you exist in users array
    it ('should return my user object', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            name: 'Andrew',
            age: 25
          })
        })
        .end(done)
    });
  });

});
