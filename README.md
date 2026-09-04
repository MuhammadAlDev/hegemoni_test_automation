# hegemoni_test_automation

# E-Commerce Automation Framework

## Overview

End-to-end test automation framework for an
e-commerce application using Playwright and TypeScript.

## Tech Stack

- Playwright
- TypeScript
- REST API
- GitHub Actions
- Page Object Model

## Test Coverage

### UI

- Registration
- Login
- Product Search
- Product Details
- Cart

### API

- Products
- Brands
- Authentication
- User Management

## Test Strategy

- Smoke Testing
- Regression Testing
- Positive Testing
- Negative Testing
- Boundary Testing
- Data-driven Testing
- API Contract Validation

## Execution

### Run all tests

npx playwright test

### Run smoke

npx playwright test --grep "@smoke"

### Run regression

npx playwright test --grep @regression

### Generate report

npx playwright show-report