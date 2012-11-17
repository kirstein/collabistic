var libpath = process.env.COLLABISTIC_COV ? '../lib-cov' : '../lib',
    should  = require('should'),
    path    = require('path'),
    apiLoc  = path.join(libpath, 'api');

var mockModule = { name : true, location: true, manifest: true };

describe('api', function() {
    it('should throw when no module is defined', function() {
        (function() {
            require(apiLoc)();
        }).should.throw("Module not defined");
    });

    it ('should throw when module validation fails', function() {
        (function() {
            require(apiLoc)({});
        }).should.throw("Invalid module definition");
    });

    it('should return an object if module is defined', function() {
        require(apiLoc)(mockModule)
            .should.be.an.instanceOf(Object);
    });

    describe('API methods', function() {
        it('should have property injectRoutes', function() {
            require(apiLoc)(mockModule)
                .should.be.an.instanceOf(Object)
                .and.have.property('injectRoutes');
        });

        it('should have property injectResource', function() {
            require(apiLoc)(mockModule)
                .should.be.an.instanceOf(Object)
                .and.have.property('injectResource');
        });

        it('should have property linkAssets', function() {
            require(apiLoc)(mockModule)
                .should.be.an.instanceOf(Object)
                .and.have.property('linkAssets');
        });

        it('should have property unlinkAssets', function() {
            require(apiLoc)(mockModule)
                .should.be.an.instanceOf(Object)
                .and.have.property('unlinkAssets');
        });

        it('should have property addInitiator', function() {
            require(apiLoc)(mockModule)
                .should.be.an.instanceOf(Object)
                .and.have.property('addInitiator');
        });
    });
});