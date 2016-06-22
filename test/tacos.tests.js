var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');

before(function(done) {                       //before is function running code, done is the callback
  db.sequelize.sync({force: true}).then(function() {  //make sure database is created, then run this function
    done();                                   // let
  });
});

describe('GET /tacos', function() {
  it('should return a 200 response', function(done) {
    request(app).get('/tacos').expect(200, done);
  });
});

describe('POST /tacos', function() {          //checke
  it('should create a taco and redirect to /tacos', function(done) {
    request(app).post('/tacos')
      .type('form')                           //getting data by form .type('form')
      .send({
        name: 'Doritos Locos',
        amount: 9001
      })
      .expect('Location', '/tacos')           //'Location' is one of the hard coded strings can pass, want to see redirect to /tacos
      .expect(302, done);
  });
});

describe('DELETE /tacos/:id', function() {
  it('should delete taco and send a success message and return 200', function(done) {
    request(app).delete('/tacos/1')
      .end(function(err, response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('msg');
        expect(response.body.msg).to.equal('success');
        done();
      });
  });
  it('should return an error if there is no taco', function(done){
    request(app).delete('/tacos/2')
      .end(function(err, response) {
        expect(response.statusCode).to.equal(404);
        expect(response.body).to.have.property('msg');
        expect(response.body.msg).to.equal('error');
        done();
      });
  });
});

describe('POST /tacos', function() {          //checke
  it('should create a taco and redirect to /tacos', function(done) {
    request(app).post('/tacos')
      .type('form')                           //getting data by form .type('form')
      .send({
        name: 'Doritos Locos',
        amount: 9001
      })
      .expect('Location', '/tacos')           //'Location' is one of the hard coded strings can pass, want to see redirect to /tacos
      .expect(302, done);
  });
});

describe('PUT /tacos/:id', function() {
  it('should edit a taco and return a success message', function(done) {
    request(app).put('/tacos/2')
      .type('form')
      .send({
        name: 'Gorditas'
      })
      .end(function(err, response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('msg');
        expect(response.body.msg).to.equal('success')
        done();
      });
  });
  it('should return an error message if there is no taco to update', function(done) {
    request(app).put('/tacos/3')
    .end(function(err, response) {
      expect(response.statusCode).to.equal(404);
      expect(response.body).to.have.property('msg');
      expect(response.body.msg).to.equal('error');
      done();
    });
  });
});


describe('GET /tacos/new', function() {
  it('should render the page /tacos/new', function(done) {
    request(app).get('/tacos/new').expect(200, done);
  });
});

describe('GET /tacos/:id/edit', function() {
  it('should find a taco by id and render a page', function(done) {
    request(app).get('/tacos/2/edit')
    .expect(200, done);
  });
  it('should not find a taco by id and send an error', function(done) {
    request(app).get('/tacos/200/edit')
    .expect(404, done);
  });
});

describe('GET /tacos/:id', function() {
  it('should find the taco and render the appropriate page', function(done) {
    request(app).get('/tacos/2')
    .expect(200, done);
  });
  it('should not find a taco and send an error', function(done) {
    request(app).get('/tacos/200')
    .expect(404, done);
  });
});
