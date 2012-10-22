test:
	@./node_modules/.bin/mocha --reporter spec

coverage:
	jscoverage --no-highlight lib lib-cov
	COLLABISTIC_COV=1 mocha -R html-cov > coverage.html
	rm -rf lib-cov

.PHONY: test