var libpath = process.env['COLLABISTIC_COV'] ? '../lib-cov' : '../lib',
    should  = require('should'),
    rimraf  = require('rimraf'),
    path    = require('path'),
    mkdirp  = require('mkdirp');

var utils   = require(path.join(libpath, 'module.utils'));

describe('module.utils', function() {
    var mockDirName     = 'mock',
        mockModuleName  = mockDirName;
        mockDir         = path.join(__dirname, mockDirName, mockModuleName);

    before(function() {
        mkdirp.sync(mockDir);
    });

    after(function() {
        rimraf.sync(path.join(__dirname, mockDirName));
    });

    describe('#getModulesSync(dir, [options])', function() {
        it('should throw exception when no path is set', function() {
            (function() {
                utils.getModulesSync();
            }).should.throw("module directory path not defined or does not exist");
        });
        it('should return mock module', function() {
            var modulePath = path.join(__dirname, mockDirName);

            utils.getModulesSync(modulePath)
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(1)
                 .and.include(mockDirName);
        });
    });
});