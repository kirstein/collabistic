var libpath = process.env.COLLABISTIC_COV ? '../lib-cov' : '../lib',
    should  = require('should'),
    path    = require('path'),
    apiLoc  = path.join(libpath, 'api');

describe('api', function() {
    it('should throw an exception when no moduleLocation is defined', function() {
        (function() {
            require(apiLoc)();
        }).should.throw("No module location defined");
    });

    it('should throw an exception when moduleLocation does not exist', function() {
        (function() {
            require(apiLoc)('does not exists');
        }).should.throw("No module location defined");
    });

    it('should return an object if moduleLocation is defined', function() {
        require(apiLoc)(__filename)
            .should.be.an.instanceOf(Object);
    });

    describe('API methods', function() {
        it('should have property injectRoute', function() {
            require(apiLoc)(__filename)
                .should.be.an.instanceOf(Object)
                .and.have.property('injectRoutes');
        });
    });
});