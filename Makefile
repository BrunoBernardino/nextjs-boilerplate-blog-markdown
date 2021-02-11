.PHONY: install
install:
	-cp -n .env.sample .env
	npm install

.PHONY: start
start:
	npm run dev

.PHONY: test
test:
	make lint
	npm test
	@./node_modules/.bin/concurrently --prefix=name --prefix-length=30 --kill-others --success=first \
		-n app,cypress \
		"npm run dev" \
    "npm run test/ci"

.PHONY: test/cypress
test/cypress:
	@./node_modules/.bin/concurrently --prefix=name --prefix-length=30 --kill-others --success=first \
		-n app,cypress \
		"npm run dev" \
    "npm run test/ui"

.PHONY: test/update
test/update:
	npm test -- -u

.PHONY: test/pretty
test/pretty:
	npm run pretty/test

.PHONY: test/ci
test/ci:
	make test/pretty
	make test

.PHONY: lint
lint:
	npm run lint

.PHONY: pretty
pretty:
	npm run pretty

.PHONY: deploy
deploy:
	node scripts/build-pages.js
	serverless
