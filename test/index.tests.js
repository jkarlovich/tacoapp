var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');

describe('GET /', function() {          //describing what should happen, use the get /
  // tests go here
  it('should return a 200 response', function(done) {  //it(human readable script, function
    request(app).get('/').expect(200, done);           //request locally app.get (../index), expect a 200 code
  });                                                  //done referes to the done in the arguments
});
