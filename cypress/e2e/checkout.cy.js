describe('SauceDemo Checkout Flow', () => {
  const LOGIN_CONFIG = {
    URL: '/',
    CREDENTIALS: {
      correctUsername: 'standard_user',
      correctPassword: 'secret_sauce',
    },
    SELECTORS: {
      usernameInput: '#user-name',
      passwordInput: '#password',
      submitButton: '#login-button',
      cartLink: '[data-test="shopping-cart-link"]',
      checkoutButton: '[data-test="checkout"]',
      firstNameInput: '[data-test="firstName"]',
      lastNameInput: '[data-test="lastName"]',
      postalCodeInput: '[data-test="postalCode"]',
      continueButton: '[data-test="continue"]',
      finishButton: '[data-test="finish"]',
      backHomeButton: '[data-test="back-to-products"]',
      errorMessage: '[data-test="error"]',
    },
  };

  beforeEach(() => {
    cy.visit(LOGIN_CONFIG.URL, { failOnStatusCode: false });
    cy.get(LOGIN_CONFIG.SELECTORS.usernameInput, { timeout: 10000 }).should('be.visible');

    // ✅ Sign in with happy flow
    cy.get(LOGIN_CONFIG.SELECTORS.usernameInput).type(LOGIN_CONFIG.CREDENTIALS.correctUsername);
    cy.get(LOGIN_CONFIG.SELECTORS.passwordInput).type(LOGIN_CONFIG.CREDENTIALS.correctPassword);
    cy.get(LOGIN_CONFIG.SELECTORS.submitButton).click();
    cy.url().should('include', '/inventory.html');
  });

  // ✅ take screenshot after each test
  afterEach(() => {
    cy.screenshot({ capture: "runner" });
  });

  it('Should complete checkout flow successfully', () => {
    cy.get(LOGIN_CONFIG.SELECTORS.cartLink).click();
    cy.get(LOGIN_CONFIG.SELECTORS.checkoutButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.firstNameInput).type('hassan');
    cy.get(LOGIN_CONFIG.SELECTORS.lastNameInput).type('akram');
    cy.get(LOGIN_CONFIG.SELECTORS.postalCodeInput).type('38000');

    cy.get(LOGIN_CONFIG.SELECTORS.continueButton).click();
    cy.get(LOGIN_CONFIG.SELECTORS.finishButton).click();
    cy.get(LOGIN_CONFIG.SELECTORS.backHomeButton).click();

    cy.url().should('include', '/inventory.html');
  });

  // Edge Cases
  it('Should show error when all fields are empty', () => {
    cy.get(LOGIN_CONFIG.SELECTORS.cartLink).click();
    cy.get(LOGIN_CONFIG.SELECTORS.checkoutButton).click();
    cy.get(LOGIN_CONFIG.SELECTORS.continueButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Error: First Name is required');
  });

  it('Should show error when First Name is empty', () => {
    cy.get(LOGIN_CONFIG.SELECTORS.cartLink).click();
    cy.get(LOGIN_CONFIG.SELECTORS.checkoutButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.lastNameInput).type('akram');
    cy.get(LOGIN_CONFIG.SELECTORS.postalCodeInput).type('38000');
    cy.get(LOGIN_CONFIG.SELECTORS.continueButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Error: First Name is required');
  });

  it('Should show error when Last Name is empty', () => {
    cy.get(LOGIN_CONFIG.SELECTORS.cartLink).click();
    cy.get(LOGIN_CONFIG.SELECTORS.checkoutButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.firstNameInput).type('hassan');
    cy.get(LOGIN_CONFIG.SELECTORS.postalCodeInput).type('38000');
    cy.get(LOGIN_CONFIG.SELECTORS.continueButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Error: Last Name is required');
  });

  it('Should show error when Postal Code is empty', () => {
    cy.get(LOGIN_CONFIG.SELECTORS.cartLink).click();
    cy.get(LOGIN_CONFIG.SELECTORS.checkoutButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.firstNameInput).type('hassan');
    cy.get(LOGIN_CONFIG.SELECTORS.lastNameInput).type('akram');
    cy.get(LOGIN_CONFIG.SELECTORS.continueButton).click();

    cy.get(LOGIN_CONFIG.SELECTORS.errorMessage)
      .should('be.visible')
      .and('contain.text', 'Error: Postal Code is required');
  });
});
