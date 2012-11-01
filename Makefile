R = dot
MOCHA = ./node_modules/.bin/mocha --globals app
COVERAGE_FILE = coverage.html
G = ""
TESTS = $(shell find test -name "*.test.js")

test: test-env
	$(MOCHA) $(TESTS) -R $(R) -g $(G)

coverage: lib-cov test-env
	@COLLABISTIC_COV=1 $(MOCHA) -R html-cov > $(COVERAGE_FILE)
	echo 'Coverage complete. Check "$(COVERAGE_FILE)" for results'

test-env:
	@NODE_ENV=test

lib-cov:
	rm -rf lib-cov
	@jscoverage --no-highlight lib lib-cov


.PHONY: test
.SILENT: test coverage lib-cov