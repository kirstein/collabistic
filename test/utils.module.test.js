var libpath = process.env.COLLABISTIC_COV ? '../lib-cov' : '../lib',
    should  = require('should'),
    path    = require('path');

var utils   = require(path.join(libpath, 'utils.module'));

describe('utils.module', function() {
    var mockDirName     = '.mock',
        mockModuleName  = 'mockModule',
        mockDir         = path.join(__dirname, mockDirName, mockModuleName),
        modulePath      = path.join(__dirname, mockDirName);

    describe('#getModulesSync(dir, [files])', function() {
        it('should throw exception when no path is set', function() {
            (function() {
                utils.getModulesSync();
            }).should.throw("module directory not defined or does not exist");
        });
        it('should return mock module with no files set', function() {
            utils.getModulesSync(modulePath)
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(1)
                 .and.include(mockDir);
        });
        it('should return mock module when files listing is set (multiple files)', function() {

            utils.getModulesSync(modulePath, [ 'index.js', 'manifest.json' ])
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(1)
                 .and.include(mockDir);
        });
        it('should return mock module when files listing is set single file', function() {

            utils.getModulesSync(modulePath, [ 'index.js' ])
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(1)
                 .and.include(mockDir);
        });

        it('should return mock module when files listing is set single file (not array)', function() {

            utils.getModulesSync(modulePath, 'index.js')
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(1)
                 .and.include(mockDir);
        });

        it('should return empty array when files listing is set but module does not match', function() {
            var modulePath = path.join(__dirname, mockDirName);

            utils.getModulesSync(modulePath, [ 'does not exist' ])
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(0);
        });

        it('should return empty array when files listing is set but module does not match (not array)', function() {
            var modulePath = path.join(__dirname, mockDirName);

            utils.getModulesSync(modulePath, 'does not exist')
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(0);
        });
    });

    describe('#loadModules(moduleList)', function() {
        it('should throw exception when moduleList is undefined', function() {
            (function() {
                utils.loadModules()
            }).should.throw("module listing must be defined");
        });

        it('should return an empty object when moduleList is empty', function() {
            utils.loadModules([])
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(0);
        });

        it('should return an array with one module object when moduleList is correct', function() {
            var result = utils.loadModules([mockDir]);
            result
                 .should.be.an.instanceOf(Array)
                 .with.lengthOf(1);

            result[0]
                .should.be.an.instanceOf(Object)
                .and.have.ownProperty('name')
                .and.have.ownProperty('location')
                .and.have.ownProperty('manifest');
        });

         it('should throw an exception when loading fails', function() {
            (function() {
                utils.loadModules(['this will fail']);
            }).should.throw("Module loading failed! Error: Cannot find module 'this will fail/manifest.json'")
        });
    });
});