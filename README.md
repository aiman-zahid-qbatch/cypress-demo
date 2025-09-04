# Cypress Demo Project

This is a Cypress automation project for Sauce Demo E2E flows including Sign In, Add to Cart, Checkout, and Logout. It uses **Mochawesome** reporter for generating HTML reports with screenshots and videos.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/aiman-zahid-qbatch/cypress-demo.git
cd cypress-demo
2. Install Dependencies
bash
Copy code
npm install
3. Open Cypress Test Runner
bash
Copy code
npx cypress open
This will open the Cypress GUI where you can run tests interactively.

4. Run Tests in Headless Mode and Generate Report
bash
Copy code
npm run report
This will run all tests in Chrome headless and generate Mochawesome reports in cypress/reports.

5. Open the HTML Report
bash
Copy code
npm run postreport
Opens the Mochawesome HTML report in your default browser, including screenshots and videos.

Project Structure

cypress/e2e/ - Contains all test files:

signin.cy.js

add_to_cart.cy.js

checkout.cy.js

logout.cy.js

cypress/reports/ - Generated Mochawesome reports (HTML + JSON)

cypress/screenshots/ - Screenshots captured after each test

cypress/videos/ - Videos recorded during test execution
