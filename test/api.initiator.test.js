var libpath = process.env.COLLABISTIC_COV ? '../lib-cov' : '../lib',
    should  = require('should'),
    mkdirp  = require('mkdirp'),
    rimraf  = require('rimraf'),
    fs      = require('fs'),
    path    = require('path');

var initiatorPath = path.join(libpath, "api/initiator"),
    mockModule = {
        name: 'mockModule',
        location: path.join(__dirname, '.mock/mockModule'),
        manifest: {}
    };

describe('api', function() {
    describe('initiator', function() {
        it ("should have add property", function() {
                require(initiatorPath)(mockModule)
                .should.be.an.instanceOf(Object)
                .and.have.property('add');
        });

        describe('#add(initiators)', function() {
            var init        = require(initiatorPath)(mockModule),
                asset       = 'testasset.js',
                assetsDir   = path.join(process.cwd(), 'public/modules/', mockModule.name);
                linkedAsset = path.join(__dirname, '/.mock/mockModule/assets/', asset);

            before(function() {
                    mkdirp.sync(assetsDir);
                    fs.symlinkSync(linkedAsset, path.join(assetsDir, asset));
            });
            after(function() {
                rimraf.sync(assetsDir);
            });

            afterEach(function() {
                 global.collabistic.initiators = []
            });

            it ('should throw when no initiators are being passed', function() {
                (function() {
                    init.add()
                }).should.throw('No initiators defined!');
            });

            it ('should throw when initiator is not linked', function() {
                (function() {
                    init.add('not linked')
                }).should.throw('Initiator not in global assets dir. Has it been linked yet?');
            });
            it ('should add initiators when passed an array', function() {
                (function() {
                    init.add([asset, asset])
                        .should.be.instanceOf(Array).with.length(2);
                }).should.not.throw();

                  global.collabistic.initiators
                        .should.be.instanceOf(Array).with.length(2)
                        .and.include('modules/mockModule/testasset');
            });
            it ('should add initiators', function() {
                (function() {
                    init.add(asset)
                        .should.be.instanceOf(Array).with.length(1);
                }).should.not.throw();

                  global.collabistic.initiators
                        .should.be.instanceOf(Array).with.length(1)
                        .and.include('modules/mockModule/testasset');
            });
        });
    });
});