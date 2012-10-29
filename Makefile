R = dot
MOCHA = ./node_modules/.bin/mocha --globals app
COVERAGE_FILE = coverage.html
G = ""

test: test-env
	$(MOCHA) -R $(R) -g $(G)

coverage: lib-cov test-env
	@COLLABISTIC_COV=1 $(MOCHA) -R html-cov > $(COVERAGE_FILE)
	rm -rf lib-cov
	echo 'Coverage complete. Check "$(COVERAGE_FILE)" for results'

test-env:
	@NODE_ENV=test

lib-cov:
	@jscoverage --no-highlight lib lib-cov


.PHONY: test
.SILENT: test coverage