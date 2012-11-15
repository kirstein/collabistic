R = dot
MOCHA = ./node_modules/.bin/mocha --globals collabistic
COVERAGE_FILE = coverage.html
G = ""
TESTS = $(shell find test -name "*.test.js")

test: test-unit

test-unit: test-env
	echo "Running unit tests:"
	$(MOCHA) $(TESTS) -R $(R) -g $(G)

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


.PHONY: test coverage lib-gov test-unit
.SILENT: test coverage lib-cov test-unit