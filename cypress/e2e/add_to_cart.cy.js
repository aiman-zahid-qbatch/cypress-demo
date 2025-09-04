describe('SauceDemo Add to Cart Flow', () => {
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
      errorMessage: '[data-test="error"]',
      addToCartButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
      cartBadge: '[data-test="shopping-cart-badge"]',
      continueShoppingButton: '[data-test="continue-shopping"]',
    }
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

  it('Should add product to cart and continue shopping', () => {
    // Click on Add to Cart button
    cy.get(LOGIN_CONFIG.SELECTORS.addToCartButton).click();

    // Check cart badge shows 1
    cy.get(LOGIN_CONFIG.SELECTORS.cartBadge).should('contain.text', '1');

    // Click on cart badge
    cy.get(LOGIN_CONFIG.SELECTORS.cartBadge).click();

    // Click on Continue Shopping button
    cy.get(LOGIN_CONFIG.SELECTORS.continueShoppingButton).click();

    // Verify we are back to inventory page
    cy.url().should('include', '/inventory.html');
  });
});
