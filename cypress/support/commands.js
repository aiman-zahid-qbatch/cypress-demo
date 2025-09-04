/// <reference types="cypress" />

// ✅ Custom command for login
Cypress.Commands.add('loginAs', (role) => {
  const SELECTORS = {
    usernameInput: '#user-name',
    passwordInput: '#password',
    submitButton: '#login-button',
  };

  const CREDENTIALS = {
    standardUser: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
  };

  if (!CREDENTIALS[role]) {
    throw new Error(`Invalid role "${role}" passed to loginAs`);
  }

  const user = CREDENTIALS[role];

  // 👇 visit login page
  cy.visit('/', { failOnStatusCode: false });

  // ✅ wait for login form
  cy.get(SELECTORS.usernameInput, { timeout: 10000 }).should('be.visible').type(user.username);
  cy.get(SELECTORS.passwordInput).should('be.visible').type(user.password);
  cy.get(SELECTORS.submitButton).click();

  // ✅ assert redirect
  cy.url({ timeout: 10000 }).should('eq', 'https://www.saucedemo.com/inventory.html');
});
