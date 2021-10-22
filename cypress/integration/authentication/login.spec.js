/// <reference types="Cypress" />

import { loginPage } from '../../page-objects/login-page';

describe('Login Tests', () => {
  /*context('Login through API', () => {
    beforeEach(() => {
      cy.apiLogin(Cypress.env('margarettaUser'), Cypress.env('margarettaPassword'));
    });

    it('should navigate to bank accounts', () => {
      cy.visit('/bankaccounts');
      cy.get('[data-test="bankaccount-new"]').and('be.visible').click();
    });
  });*/

  context('Login through UI', () => {
    // Hooks
    beforeEach(() => {
      // Intercept the request to the API
      cy.intercept('POST', '/login').as('login');
      loginPage.visit();
    });

    context('Positive Scenarios for Login', () => {
      
      it('User Logs in successfully', () => {
        loginPage.typeCredentials({
          username: Cypress.env('margarettaUser'),
          password: Cypress.env('margarettaPassword'),
        });
        loginPage.clickSignIn();
        cy.wait('@login');
        cy.url().should('include', '/');
        cy.contains(Cypress.env('margarettaUser')).should('be.visible');
      });
    });

    context('Negative Scenarios for Login', () => {
      it('User cannot Log in - No credentials', () => {
        loginPage.typeCredentials();
        loginPage.getElements().getSignInButton().should('not.be.enabled');
      });

      it('User cannot Log in - Only Username', () => {
        loginPage.typeCredentials({ username: Cypress.env('margarettaUser') });
        loginPage.getElements().getSignInButton().should('not.be.enabled');
      });

      it('User cannot Log in - Only Password', () => {
        loginPage.typeCredentials({ password: Cypress.env('margarettaPassword') });
        loginPage.getElements().getSignInButton().should('be.enabled');
        loginPage.clickSignIn();
        cy.wait('@login');
        cy.url().should('include', loginPage.getUrl());
        loginPage.getElements().getSignInErrorContainer().should('be.visible')
        .and('have.css', 'color', 'rgb(97, 26, 21)')
        .and('contain', 'Username or password is invalid');
      });

      it('User cannot Log in - Wrong Creds', () => {
        loginPage.typeCredentials({ username: 'wrongUsername', password: 'wrongPassword' });
        loginPage.getElements().getSignInButton().should('be.enabled');
        loginPage.clickSignIn();
        cy.wait('@login');
        cy.url().should('include', loginPage.getUrl());
        loginPage.getElements().getSignInErrorContainer().should('be.visible')
        .and('have.css', 'color', 'rgb(97, 26, 21)')
        .and('contain', 'Username or password is invalid');
      });
    });
  });
});
