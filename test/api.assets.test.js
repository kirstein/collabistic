var libpath = process.env.COLLABISTIC_COV ? '../lib-cov' : '../lib',
    should  = require('should'),
    path    = require('path');

var assetsPath  = path.join(libpath, 'api/assets');

describe('api/assets', function() {
    it ("should throw when no module is defined", function() {
        (function() {
            require(assetsPath)();
        }).should.throw("Module not defined");
    });

    it ("should throw when module definition is invalid", function () {
        (function() {
            require(assetsPath)({});
        }).should.throw("Invalid module definition: TypeError: Cannot read property 'assets' of undefined");
    });

    it ("should not throw when module is defined", function() {
        var mockModule = {
            name     : 'name',
            location : 'location',
            manifest : {}
        };

        (function() {
            require(assetsPath)(mockModule);
        }).should.not.throw();
    });

    it ("should have link method", function() {
        var mockModule = {
            name     : 'name',
            location : 'location',
            manifest : {}
        };

        require(assetsPath)(mockModule)
            .should.be.an.instanceOf(Object)
            .and.have.property('link');
    });

    it ("should have unlink method", function() {
        var mockModule = {
            name     : 'name',
            location : 'location',
            manifest : {}
        };

        require(assetsPath)(mockModule)
            .should.be.an.instanceOf(Object)
            .and.have.property('unlink');
    });

    describe ("#link([uri])", function() {
        var rimraf = require('rimraf'),
            config = require(path.join(process.cwd(), "config")),
            fs     = require('fs');

        afterEach(function() {
            var moduleAssets = path.join(config.public.URI, config.public.linkDir);
            if (fs.existsSync(moduleAssets)) {
                // rimraf.sync(moduleAssets);
            }
        });
        it ("should throw when no URI and no module manifest assets dir is defined", function() {
            var mockModule = {
                name     : 'name',
                location : 'location',
                manifest : {}
            };

            (function() {
                 require(assetsPath)(mockModule).link();
            }).should.throw("No assets URI defined.");
        });

        it ("should throw when asset URI does not exist", function() {
            var mockModule = {
                name     : 'name',
                location : 'location',
                manifest : {}
            };

            (function() {
                require(assetsPath)(mockModule).link('random location');
            }).should.throw("Asset location does not exist");
        });

        it ("should create symlinks to public folder", function() {
            var mockModule = {
                name     : 'mockModule',
                location : path.join(__dirname, '.mock', 'mockModule'),
                manifest : {
                    assets : 'assets'
                }
            };

            var assets = require(assetsPath)(mockModule);

            assets.link();
        });
    });
});
