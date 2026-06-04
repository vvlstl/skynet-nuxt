SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

# --- Project ---
PROJECT  ?= $(shell node -p "require('./package.json').name" 2>/dev/null || basename $(CURDIR))
NODE_ENV ?= development

# --- Git ---
VERSION    ?= $(shell git describe --tags --always --dirty 2>/dev/null || echo "dev")
COMMIT     ?= $(shell git rev-parse --short HEAD 2>/dev/null || echo "unknown")
BUILD_TIME := $(shell date -u '+%Y-%m-%dT%H:%M:%SZ')

# --- Package Manager Detection ---
PM ?= $(shell \
	if [ -f bun.lockb ]; then echo "bun"; \
	elif [ -f pnpm-lock.yaml ]; then echo "pnpm"; \
	elif [ -f yarn.lock ]; then echo "yarn"; \
	else echo "npm"; fi)

PMX := $(shell \
	if [ "$(PM)" = "bun" ]; then echo "bunx"; \
	elif [ "$(PM)" = "pnpm" ]; then echo "pnpm exec"; \
	elif [ "$(PM)" = "yarn" ]; then echo "yarn"; \
	else echo "npx"; fi)

# ============================================================================
.DEFAULT_GOAL := help

##@ Development

.PHONY: install
install: ## Install dependencies
	$(PM) install

.PHONY: dev
dev: ## Start Nuxt development server
	$(PM) run dev

.PHONY: build
build: ## Build for production
	NODE_ENV=production $(PM) run build

.PHONY: generate
generate: ## Generate static site
	$(PM) run generate

.PHONY: preview
preview: ## Preview production build locally
	$(PM) run preview

##@ Testing

.PHONY: test
test: ## Run all tests
	$(PM) test

.PHONY: test-watch
test-watch: ## Run tests in watch mode
	$(PM) run test:watch

.PHONY: test-unit
test-unit: ## Run unit tests only
	$(PM) run test:unit

.PHONY: test-nuxt
test-nuxt: ## Run Nuxt integration tests only
	$(PM) run test:nuxt

.PHONY: test-cover
test-cover: ## Run tests with coverage report
	$(PM) run test:coverage

##@ Code Quality

.PHONY: lint
lint: ## Run ESLint
	$(PMX) eslint .

.PHONY: lint-fix
lint-fix: ## Run ESLint with auto-fix
	$(PMX) eslint . --fix

.PHONY: typecheck
typecheck: ## Run TypeScript type checking
	npx nuxi typecheck

.PHONY: check
check: lint typecheck test ## Run all checks (lint + typecheck + test)

##@ CI

.PHONY: ci
ci: install lint typecheck test build ## Run full CI pipeline

##@ Cleanup

.PHONY: clean
clean: ## Remove build artifacts and caches
	rm -rf .output/ .nuxt/ coverage/ node_modules/.cache

.PHONY: clean-all
clean-all: clean ## Remove everything including node_modules
	rm -rf node_modules/

##@ Help

.PHONY: help
help: ## Show this help
	@awk 'BEGIN {FS = ":.*##"; printf "Usage:\n  make \033[36m<target>\033[0m\n"} \
			/^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2} \
			/^##@/ {printf "\n\033[1m%s\033[0m\n", substr($$0, 5)}' $(MAKEFILE_LIST)
