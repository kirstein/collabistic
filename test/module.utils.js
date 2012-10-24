var libpath = process.env['COLLABISTIC_COV'] ? '../lib-cov' : '../lib',
    should  = require('should'),
    rimraf  = require('rimraf'),
    path    = require('path'),
    fs      = require('fs');
    mkdirp  = require('mkdirp');

var utils   = require(path.join(libpath, 'module.utils'));

describe('module.utils', function() {
    var mockDirName     = 'mock',
        mockModuleName  = mockDirName;
        fileName        = 'index.js';
        mockDir         = path.join(__dirname, mockDirName, mockModuleName),
        modulePath      = path.join(__dirname, mockDirName);


    before(function() {
        mkdirp.sync(mockDir);
        fs.writeFileSync(path.join(mockDir, fileName), '');
    });

    after(function() {
        rimraf.sync(path.join(__dirname, mockDirName));
    });

    describe('#getModulesSync(dir, [files])', function() {
        it('should throw exception when no path is set', function() {
            (function() {
                utils.getModulesSync();
            }).should.throw("module directory path not defined or does not exist");
        });
        it('should return mock module with no files set', function() {
            utils.getModulesSync(modulePath)
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(1)
                 .and.include(mockDirName);
        });
        it('should return mock module when files listing is set', function() {

            utils.getModulesSync(modulePath, [ fileName ])
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(1)
                 .and.include(mockDirName);
        });

        it('should return empty array when files listing is set but module does not match', function() {
            utils.getModulesSync(modulePath, [ 'does not exist' ])
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(0);
        });
    });
});