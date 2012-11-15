var libpath = process.env.COLLABISTIC_COV ? '../lib-cov' : '../lib',
    should  = require('should'),
    path    = require('path'),
    rimraf  = require('rimraf'),
    config  = require(path.join(process.cwd(), "config")),
    fs      = require('fs');

var assetsPath = path.join(libpath, 'api/assets'),
    mockModule = {
        name: 'mockModule',
        location: path.join(__dirname, '.mock', 'mockModule'),
        manifest: {
            assets: {
                dir : 'assets'
            }
        }
    };

describe('api', function() {
    describe('assets', function() {
        it ("should have link property", function() {
            require(assetsPath)(mockModule)
                .should.be.an.instanceOf(Object)
                .and.have.property('link');
        });

        it ("should have unlink property", function() {
            require(assetsPath)(mockModule)
                .should.be.an.instanceOf(Object)
                .and.have.property('unlink');
        });

        describe ("#link([uri])", function() {

            var moduleAssets = path.join(config.pub.dir, config.module.link);
            afterEach(function() {
                // If global assets folder for module assets does not exist, make a new one.
                if (fs.existsSync(moduleAssets)) {
                    rimraf.sync(moduleAssets);
                }
            });
            it ("should throw when no URI and no module manifest assets dir is defined", function() {
                (function() {
                     require(assetsPath)({
                        name: 'mockModule',
                        location: path.join(__dirname, '.mock', 'mockModule'),
                        manifest: {}
                     }).link();
                }).should.throw("No assets URI defined.");
            });

            it ("should throw when asset URI does not exist", function() {
                (function() {
                    require(assetsPath)(mockModule).link('random location');
                }).should.throw("Asset location does not exist");
            });

            it ("should create symlinks to public folder", function() {
                var assets = require(assetsPath)(mockModule);

                (function() {
                    assets.link();
                }).should.not.throw();

                // Validate that the folder was actually created
                fs.existsSync(path.join(config.pub.dir, config.module.link, 'mockModule'))
                  .should.be.true;
            });
        });

        describe ('#unlink()', function() {
            var moduleDir    = path.join(__dirname, '.mock', 'mockModule'),
                moduleAssets = path.join(config.pub.dir, config.module.link);


            var assets = require(assetsPath)(mockModule);

            beforeEach(function() {
                if (!fs.existsSync(moduleAssets)) {
                    fs.mkdirSync(moduleAssets);
                }
                fs.symlinkSync(moduleDir, path.join(moduleAssets, 'mockModule'));
            });
            it ("should remove linked models", function() {
                (function() {
                    assets.unlink();
                }).should.not.throw();

                fs.existsSync(path.join(config.pub.dir, config.module.link, 'mockModule'))
                  .should.be.false;
            });
        });
    });
});
