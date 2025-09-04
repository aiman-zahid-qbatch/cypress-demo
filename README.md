
# Cypress Demo Test Project

This project contains end-to-end (E2E) automated tests for a demo web application using [Cypress](https://www.cypress.io/). The tests cover core user flows such as sign in, add to cart, checkout, and logout.

## Project Structure

```
cypress-demo-demo-tests/
├── cypress.config.js         # Cypress configuration file
├── package.json             # Project dependencies and scripts
├── cypress/
│   ├── downloads/           # Downloaded files during tests
│   ├── e2e/                 # E2E test specifications
│   ├── fixtures/            # Test data (JSON)
│   ├── reports/             # Test reports and videos
│   ├── screenshots/         # Screenshots taken during test runs
│   ├── support/             # Custom commands and support files
│   └── videos/              # Test run videos
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
	```bash
	git clone <repository-url>
	cd cypress-demo-demo-tests
	```
2. Install dependencies:
	```bash
	npm install
	```

### Running Tests

To run all E2E tests in headless mode:

```bash
npx cypress run
```

To open the Cypress Test Runner (interactive mode):

```bash
npx cypress open
```

```bash
npm run cypress:run
```


```bash
npm run test:report
```


```bash
npm run open-report
```

Test results, screenshots, and videos will be saved in the `cypress/reports/`, `cypress/screenshots/`, and `cypress/videos/` directories respectively.

## Test Files

- `cypress/e2e/signin.cy.js` - Sign in flow tests
- `cypress/e2e/add_to_cart.cy.js` - Add to cart flow tests
- `cypress/e2e/checkout.cy.js` - Checkout flow tests
- `cypress/e2e/logout.cy.js` - Logout flow tests

## Custom Commands & Support

Custom Cypress commands are defined in `cypress/support/commands.js`.
Global configuration and behavior is set in `cypress/support/e2e.js`.

## Fixtures

Test data is stored in `cypress/fixtures/example.json` and can be used in your tests via the `cy.fixture()` command.

## Reports

Test reports and videos are generated in the `cypress/reports/` directory after running tests.

## License

This project is for demonstration and educational purposes.
