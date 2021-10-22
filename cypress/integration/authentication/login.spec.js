/// <reference types="Cypress" />

import { loginPage } from '../../page-objects/login-page';

describe('Login Tests', () => {

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
          username: Cypress.env('clairUser'),
          password: Cypress.env('clairPassword'),
        });
        loginPage.clickSignIn();
        cy.wait('@login');
        cy.url().should('include', '/');
        cy.contains(Cypress.env('clairUser')).should('be.visible');
      });
    });

    context('Negative Scenarios for Login', () => {
      it('User cannot Log in - No credentials', () => {
        loginPage.typeCredentials();
        loginPage.getElements().getSignInButton().should('not.be.enabled');
      });

      it('User cannot Log in - Only Username', () => {
        loginPage.typeCredentials({ username: Cypress.env('clairUser') });
        loginPage.getElements().getSignInButton().should('not.be.enabled');
      });

      it('User cannot Log in - Only Password', () => {
        loginPage.typeCredentials({ password: Cypress.env('clairPassword') });
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
