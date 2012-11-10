var libpath = process.env.COLLABISTIC_COV ? '../lib-cov' : '../lib',
    should  = require('should'),
    path    = require('path'),
    express = require('express'),
    request = require('supertest');

var Filter  = require(path.join(libpath, 'middleware/pushStateFilter'));

describe('middleware/pushStateFilter', function() {
    it('should attach itself to express app', function() {
        var app = express();

        (function() {
            app.use(new Filter(app, []));
        }).should.not.throw();
    });

    it ('should redirect not a free path', function(done) {
        var app  = express(),
            path = "/not/free/path";

        app.use(new Filter(app, []));

        request(app)
            .get(path)
            .expect(302)
            .end(function(err, res) {
                res.statusCode.should.equal(302);
                res.header.should.have.property('location')
                   .and.include('/');
                done();
            });
    });

    it ('should ignore free paths', function(done) {
        var app = express(),
            path = '/should/be/a/free/path';

        app.use(new Filter(app, [path]));

        app.get(path, function(req, res){
            res.send(111);
        });

        request(app)
            .get(path)
            .expect(111, done);

    });


    it ('should ignore already defined paths', function(done) {
        var app = express(),
            path = '/defined/path';

        app.use(new Filter(app, []));
        app.get(path, function(req, res){
            res.send(111);
        });
        request(app)
            .get(path)
            .expect(111, done);
    });

    it ('should write a cookie', function(done) {
        var app  = express(),
            path = '/defined/path';

        app.use(new Filter(app, []));

        request(app)
            .get(path)
            .expect(302)
            .end(function(err, res) {
                res.statusCode.should.equal(302);
                res.header.should.have.property('set-cookie')
                   .and.include('redirect=' + path);
                done();
            });
    });
});