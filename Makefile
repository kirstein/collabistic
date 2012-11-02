R = dot
MOCHA = ./node_modules/.bin/mocha --globals app
COVERAGE_FILE = coverage.html
G = ""
TESTS = $(shell find test -name "*.test.js")

test: test-unit test-modules

test-modules: test-env
	echo "Running module tests:"
	$(MOCHA) $(shell find test/modules -name "*.test.js") -R $(R)

test-unit: test-env
	echo "Running unit tests:"
	$(MOCHA) -R $(R) -g $(G)

coverage: lib-cov test-env
	echo "Running coverage using all tests..."
	@COLLABISTIC_COV=1 $(MOCHA) $(TESTS) -R html-cov > $(COVERAGE_FILE)
	rm -rf lib-cov
	echo 'Coverage complete. Check "$(COVERAGE_FILE)" for results'

test-env:
	@NODE_ENV=test

lib-cov:
	rm -rf lib-cov
	@jscoverage --no-highlight lib lib-cov


.PHONY: test test-modules coverage lib-gov test-unit
.SILENT: test coverage lib-cov test-modules test-unit