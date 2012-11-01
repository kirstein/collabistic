var libpath = process.env.COLLABISTIC_COV ? '../lib-cov' : '../lib',
    should  = require('should'),
    path    = require('path'),
    apiLoc  = path.join(libpath, 'api');

describe('api', function() {
    it('should throw an exception when no module is defined', function() {
        (function() {
            require(apiLoc)();
        }).should.throw("Module not defined");
    });

    it('should return an object if module is defined', function() {
        require(apiLoc)({})
            .should.be.an.instanceOf(Object);
    });

    describe('API methods', function() {
        it('should have property injectRoute', function() {
            require(apiLoc)({})
                .should.be.an.instanceOf(Object)
                .and.have.property('injectRoutes');
        });
    });
});