var libpath = process.env.COLLABISTIC_COV ? '../lib-cov' : '../lib',
    should = require('should'),
    fs = require('fs'),
    path = require('path');

var utils = require(path.join(libpath, 'utils.module'));

describe('utils.module', function() {
    var mockDirName = '.mock',
        mockModuleName = 'mockModule',
        mockDir = path.join(__dirname, mockDirName, mockModuleName),
        modulePath = path.join(__dirname, mockDirName);

    describe('#getModulesSync(dir, [files])', function() {
        it('should throw exception when no path is set', function() {
            (function() {
                utils.getModulesSync();
            }).should.
            throw("module directory not defined or does not exist");
        });
        it('should return mock module with no files set', function() {
            utils.getModulesSync(modulePath).should.be.an.instanceOf(Array).with.lengthOf(1).and.include(mockDir);
        });
        it('should return mock module when files listing is set (multiple files)', function() {

            utils.getModulesSync(modulePath, ['index.js', 'manifest.json']).should.be.an.instanceOf(Array).with.lengthOf(1).and.include(mockDir);
        });
        it('should return mock module when files listing is set single file', function() {

            utils.getModulesSync(modulePath, ['index.js']).should.be.an.instanceOf(Array).with.lengthOf(1).and.include(mockDir);
        });

        it('should return mock module when files listing is set single file (not array)', function() {

            utils.getModulesSync(modulePath, 'index.js').should.be.an.instanceOf(Array).with.lengthOf(1).and.include(mockDir);
        });

        it('should return empty array when files listing is set but module does not match', function() {
            var modulePath = path.join(__dirname, mockDirName);

            utils.getModulesSync(modulePath, ['does not exist']).should.be.an.instanceOf(Array).with.lengthOf(0);
        });

        it('should return empty array when files listing is set but module does not match (not array)', function() {
            var modulePath = path.join(__dirname, mockDirName);

            utils.getModulesSync(modulePath, 'does not exist').should.be.an.instanceOf(Array).with.lengthOf(0);
        });
    });

    describe('#loadModules(moduleList)', function() {
        it('should throw exception when moduleList is undefined', function() {
            (function() {
                utils.loadModules()
            }).should.
            throw("module listing must be defined");
        });

        it('should return an empty object when moduleList is empty', function() {
            utils.loadModules([]).should.be.an.instanceOf(Array).with.lengthOf(0);
        });

        it('should return an array with one module object when moduleList is correct', function() {
            var result = utils.loadModules([mockDir]);
            result.should.be.an.instanceOf(Array).with.lengthOf(1);

            result[0].should.be.an.instanceOf(Object).and.have.ownProperty('name').and.have.ownProperty('location').and.have.ownProperty('manifest');
        });

        it('should throw an exception when loading fails', function() {
            (function() {
                utils.loadModules(['this will fail']);
            }).should.
            throw("Module loading failed! Error: Cannot find module 'this will fail/manifest.json'")
        });
    });

    describe("#isValid(module)", function() {
        it('{} should be false', function() {
            utils.isValid({}).should.be.false;
        });
        it('[] should be false', function() {
            utils.isValid([]).should.be.false;
        });
        it('{name : true, location : true} should be false', function() {
            utils.isValid({
                name: true,
                location: true
            }).should.be.false;
        });
        it('{name : true} should be false', function() {
            utils.isValid({
                name: true
            }).should.be.false;
        });
        it('no module should be false', function() {
            utils.isValid().should.be.false;
        });
        it('{name : true, location : true, manifest : true} should be true', function() {
            utils.isValid({
                name: true,
                location: true,
                manifest: true
            }).should.be.true;
        });
    });

    describe('#writeInitiatorsSync', function() {
        var testFile = path.join(__dirname, 'writeInitiatorsSync.js');

        beforeEach(function() {
            fs.writeFileSync(testFile, '{"random":"result"}');
        });

        afterEach(function() {
            if(fs.existsSync(testFile)) {
                fs.unlinkSync(testFile);
            }
        });

        it('should throw with no params', function() {
            (function() {
                utils.writeInitiatorsSync();
            }).should.throw('Location undefined or does not exist');
        });
        it('should throw when key is undefined', function() {
            (function() {
                utils.writeInitiatorsSync(testFile, undefined, []);
            }).should.throw('Initator property name undefined');
        });
        it('should throw when data is undefined', function() {
            (function() {
                utils.writeInitiatorsSync(testFile, 'key');
            }).should.throw('Data undefined or invalid (must be an array)');
        });
        it('should throw when data is is not an array', function() {
            (function() {
                utils.writeInitiatorsSync(testFile, 'key', {});
            }).should.throw('Data undefined or invalid (must be an array)');
        });
        it('should write data (ignoring duplicates)', function() {
            var key = 'random-key';
            utils.writeInitiatorsSync(testFile, key, ['test', 'test', 'test']);

            var data = JSON.parse(fs.readFileSync(testFile));

            data.should.be.instanceOf(Object)
                .and.have.ownProperty(key);

            data[key].should.be.instanceOf(Array)
                     .and.have.lengthOf(1)
                     .and.include('test');
        });
    });
});