var libpath = process.env.COLLABISTIC_COV ? '../lib-cov' : '../lib',
    should = require('should'),
    path = require('path'),
    express = require('express'),
    request = require('supertest'),
    Resource = require('express-resource'),
    app, injectResource;

describe('#injectResource', function() {

  beforeEach(function() {
    app                     = express();
    global.collabistic      = {};
    global.collabistic.app  = app;

    injectResource = require(path.join(libpath, 'api/injectResource'))();
  });

  it ('should have inject property', function() {
    injectResource.should.be.an.instanceOf(Object)
                  .and.have.property('inject');
  });

  it ('should map resource', function(done) {
    injectResource.inject('test', {
      index : function(req, res){
        res.send('test index');
      }
    });

    request(app)
      .get('/test')
      .expect('test index', done);
  });

});