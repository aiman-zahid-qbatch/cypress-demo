describe('SauceDemo Sign In Flow', () => {
  const LOGIN_CONFIG = {
    URL: '/',   // ✅ baseUrl should be set to https://www.saucedemo.com
    CREDENTIALS: {
      correctUsername: 'standard_user',
      correctPassword: 'secret_sauce',
      wrongUsername: 'hassan',
      wrongPassword: 'pass123',
    },
    SELECTORS: {
      usernameInput: '#user-name',
      passwordInput: '#password',
      submitButton: '#login-button',
      errorMessage: '[data-test="error"]',
    },
  };

  beforeEach(() => {
    cy.visit(LOGIN_CONFIG.URL, { failOnStatusCode: false });
    cy.get(LOGIN_CONFIG.SELECTORS.usernameInput, { timeout: 10000 }).should('be.visible');
  });

  it('Should login successfully with valid credentials', () => {
    cy.loginAs('standardUser');
    cy.url().should('include', '/inventory.html');
    cy.get('.app_logo').should('contain.text', 'Swag Labs');
  });

  it('Should show error when username is incorrect', () => {
    cy.get(LOGIN_CONFIG.SELECTORS.usernameInput).type(LOGIN_CONFIG.CREDENTIALS.wrongUsername);
    cy.get(LOGIN_CONFIG.SELECTORS.passwordInput).type(LOGIN_CONFIG.CREDENTIALS.correctPassword);
    cy.get(LOGIN_CONFIG.SELECTORS.submitButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('Should show error when password is incorrect', () => {
    cy.get(LOGIN_CONFIG.SELECTORS.usernameInput).type(LOGIN_CONFIG.CREDENTIALS.correctUsername);
    cy.get(LOGIN_CONFIG.SELECTORS.passwordInput).type(LOGIN_CONFIG.CREDENTIALS.wrongPassword);
    cy.get(LOGIN_CONFIG.SELECTORS.submitButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('Should show error when username is missing', () => {
    cy.get(LOGIN_CONFIG.SELECTORS.passwordInput).type(LOGIN_CONFIG.CREDENTIALS.correctPassword);
    cy.get(LOGIN_CONFIG.SELECTORS.submitButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Username is required');
  });

  it('Should show error when password is missing', () => {
    cy.get(LOGIN_CONFIG.SELECTORS.usernameInput).type(LOGIN_CONFIG.CREDENTIALS.correctUsername);
    cy.get(LOGIN_CONFIG.SELECTORS.submitButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Password is required');
  });
});
