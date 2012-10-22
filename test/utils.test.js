var libpath = process.env['COLLABISTIC_COV'] ? '../lib-cov' : '../lib',
    should  = require('should'),
    rimraf  = require('rimraf'),
    path    = require('path'),
    mkdirp  = require('mkdirp');

describe('utils', function() {
    var utils           = require(path.join(libpath, 'utils')),
        mockDirName     = 'mock',
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


    describe('#filesExistsSync(dir, [files] || [file])', function() {
        var relativeFilename = path.basename(__filename);

        it('should throw exception when arguments are undefined', function() {
            (function() {
                utils.filesExistsSync();
            }).should.throw("target directory or checked not defined, cant be found or empty");
        });
         it('should throw exception when file is undefined', function() {
            (function() {
                utils.filesExistsSync(__dirname);
            }).should.throw("target directory or checked not defined, cant be found or empty");
        });
         it('should throw exception when directory does not exist', function() {
            (function() {
                utils.filesExistsSync('does not exist');
            }).should.throw("target directory or checked not defined, cant be found or empty");
        });
        it('should return true when testing with single file', function() {
            utils.filesExistsSync(__dirname, relativeFilename)
                 .should.equal(true);
        });
        it('should return true when testing with an array of files', function() {
            utils.filesExistsSync(__dirname, [ relativeFilename ])
                 .should.equal(true);
        });
    });
});
