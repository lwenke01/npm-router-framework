'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');
var fs = require('fs');

describe('testing new router', (), => {
  it('POST should set with /animals/ with new animal type', (done)=>{
    request('localhost:3000')
    .post('/animals')
    .send({'animal': 'type'})
    .end((error, response) =>{
      expect(error).to.eql(null);
      expect(response).to.have.status(200);
      expect(response).to.eql('animal type');
      done();
    });
  });
  it('GET should receive the type of animal in /animal/type', (done)=>{
    request('localhost:3000')
    .get('')
  })
});
