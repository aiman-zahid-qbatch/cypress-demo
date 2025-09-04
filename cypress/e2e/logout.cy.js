describe('SauceDemo Logout Flow', () => {
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
      menuButton: '#react-burger-menu-btn',
      logoutLink: '#logout_sidebar_link',
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

  it('Should logout successfully', () => {
    // Click on Menu button
   cy.get(LOGIN_CONFIG.SELECTORS.menuButton).click();
cy.get(LOGIN_CONFIG.SELECTORS.logoutLink, { timeout: 5000 }).should('be.visible').click();


    // Verify we are back on login page
    cy.url().should('include', '/');
    cy.get(LOGIN_CONFIG.SELECTORS.usernameInput).should('be.visible');
  });
});
