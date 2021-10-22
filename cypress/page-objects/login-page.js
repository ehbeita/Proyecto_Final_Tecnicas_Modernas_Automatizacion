/// <reference types="Cypress" />

class LoginPage {

  url = '/signin';
  elements = {
    getUsername: () => cy.get('#username'),
    getPassword: () => cy.get('#password'),
    getSignInButton: () => cy.get('[data-test="signin-submit"]'),
    getSignUpLink: () => cy.get('[data-test="signup"]'),
    getSignInErrorContainer: () => cy.get('[data-test="signin-error"]')
  };

  visit() {
    cy.visit(this.url);
  }

  getUrl() {
    return this.url;
  }

  getElements() {
    return this.elements;
  }

  typeCredentials({ username = ' ', password = ' ' } = {}) {
    this.elements.getUsername().clear().type(username);
    this.elements.getPassword().clear().type(password);
  }

  clickSignIn() {
    this.elements.getSignInButton().click();
  }

  clickSignUp() {
    this.elements.getSignUpLink().click();
  }

}

export const loginPage = new LoginPage();
