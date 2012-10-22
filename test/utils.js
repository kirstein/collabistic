var libpath = process.env['COLLABISTIC_COV'] ? '../lib-cov' : '../lib',
    assert  = require('assert'),
    rimraf  = require('rimraf'),
    path    = require('path'),
    mkdirp  = require('mkdirp');

describe('Utils', function() {
    var utils           = require(path.join(libpath, 'utils')),
        mockDirName     = 'mock',
        mockModuleName  = mockDirName;
        mockDir         = path.join(__dirname, mockDirName, mockModuleName);

    before(function() {
        mkdirp.sync(mockDir);
    });

    after(function() {
        rimraf.sync(mockDir);
    });

    describe('#getModulesSync', function() {
        it('should throw exception when no path is set', function() {
            assert.throws(utils.getModulesSync, "module directory path not defined or does not exist");
        });
        it('should return mock module', function() {
            var result = utils.getModulesSync(path.join(__dirname, mockDirName));
            assert.ok(Array.isArray(result));
            assert.notStrictEqual(result, [ mockModuleName ]);
        });
    });


    describe('#filesExistsSync', function() {
        var relativeFilename = path.basename(__filename);
        it('should throw exception when file list is undefined', function() {
            assert.throws(utils.filesExistsSync, "target directory or files list not defined, cant be found or empty");
        });
        it('should return true when testing with single file', function() {
            assert.equal(utils.filesExistsSync(__dirname, relativeFilename), true);
        });
        it('should return true when testing with an array of files', function() {
            assert.equal(utils.filesExistsSync(__dirname, [ relativeFilename ]), true);
        });
    });
});
