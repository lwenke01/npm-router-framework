'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');


describe('testing new router', () => {
  it('POST should set with /animals/ with new animal type', (done)=>{
    request('localhost:3000')
    .post('/animals')
    .send({message: 'hey'})
    .end((err, res) =>{
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it('GET should receive the /animal', (done)=>{
    request('localhost:3000')
    .get('/animals')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      console.log(res.text);
      expect(res.text).to.eql('1.json');
      done();

    });
  });
  it('DELETE router should delete the /animals', (done)=>{
    request('localhost:3000')
    .delete('/animals')
    .end((err, res) =>{
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
});
