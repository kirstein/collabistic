var libpath = process.env.COLLABISTIC_COV ? '../lib-cov' : '../lib',
    should = require('should'),
    path = require('path'),
    express = require('express'),
    request = require('supertest'),
    mockModuleLocation = path.join('..', 'mock', 'mockModule'),
    app = express();

global.collabistic = {
    app: app
};

var injectRoute = require(path.join(libpath, 'api/injectRoute'))(mockModuleLocation);

describe('api', function() {
    describe('#injectRoute(routes)', function() {

        it('should throw error when no routes are defined', function() {
            (function() {
                injectRoute.inject();
            }).should.throw("No routes defined");
        });

        it('should throw an error when no path is defined', function() {
            (function() {
                injectRoute.inject({
                    type: 'type',
                    callback: function() {}
                });
            }).should.
            throw("No type, callback or path defined");
        });

        it('should throw an error when no type is defined', function() {
            (function() {
                injectRoute.inject({
                    path: 'something',
                    callback: function() {}
                });
            }).should.
            throw("No type, callback or path defined");
        });

        it('should throw an error when no callback is defined', function() {
            (function() {
                injectRoute.inject({
                    path: 'something',
                    type: 'type'
                });
            }).should.
            throw("No type, callback or path defined");
        });

        it('inject routes', function() {
            injectRoute.inject({
                path: 'some path',
                type: 'get',
                callback: function() {}
            }).should.be.an.instanceOf(Array).with.length(1).and.include('some path');
        });

        it('should not throw when adding an array of objects', function() {
            injectRoute.inject([{
                path: 'some new path',
                type: 'get',
                callback: function() {}
            }, {
                path: 'some other path',
                type: 'get',
                callback: function() {}
            }]).should.be.an.instanceOf(Array).with.length(2).and.include('some new path').and.include('some other path');
        });

        it('should not allow overriding old paths', function() {
            app.get('/already', function(req, res, next) {
                res.close();
            });

            (function() {
                injectRoute.inject([{
                    path: '/already',
                    type: 'get',
                    callback: function() {}
                }]);
            }).should.
            throw("Path already exists. Can't override old paths.");
        });
        describe('injection test', function() {
            it('should pass with GET', function() {
                var path = "/";

                function testCallback(moduleLocation, req, res) {
                    moduleLocation.should.equal(mockModuleLocation);
                    should.exist(res);
                    should.exist(req);

                    res.send(200, {
                        test: true
                    });
                }

                (function() {
                    injectRoute.inject([{
                        path: path,
                        type: 'get',
                        callback: testCallback
                    }]);
                }).should.not.
                throw();

                request(app).get(path).expect(200).expect('Content-Type', /json/).end(function(err, res) {
                    if(err) throw err;
                });
            });

            it('should pass with POST', function() {
                var path = "/";

                function testCallback(moduleLocation, req, res) {
                    moduleLocation.should.equal(mockModuleLocation);
                    should.exist(res);
                    should.exist(req);
                    res.send(200);
                }

                (function() {
                    injectRoute.inject([{
                        path: path,
                        type: 'post',
                        callback: testCallback
                    }]);
                }).should.not.
                throw();

                request(app).post(path).expect(200).end(function(err, res) {
                    if(err) throw err;
                });
            });

            it('should pass with PUT', function() {
                var path = "/";

                function testCallback(moduleLocation, req, res) {
                    moduleLocation.should.equal(mockModuleLocation);
                    should.exist(res);
                    should.exist(req);
                    res.send(200);
                }

                (function() {
                    injectRoute.inject([{
                        path: path,
                        type: 'put',
                        callback: testCallback
                    }]);
                }).should.not.
                throw();

                request(app).put(path).expect(200).end(function(err, res) {
                    if(err) throw err;
                });
            });
        });

    });
});