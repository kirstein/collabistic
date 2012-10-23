var libpath = process.env['COLLABISTIC_COV'] ? '../lib-cov' : '../lib',
    should  = require('should'),
    path    = require('path');

var utils   = require(path.join(libpath, 'utils'));

describe('utils', function() {

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
