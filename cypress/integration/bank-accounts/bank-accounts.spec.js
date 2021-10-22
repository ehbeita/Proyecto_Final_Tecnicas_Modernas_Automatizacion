/// <reference types="Cypress" />

import { loginPage } from '../../page-objects/login-page';
import { leftSideNavBar } from '../../page-objects/left-sidenav-bar';
import { bankAccountsPage } from '../../page-objects/bank-accounts-page';
import { createBankAccountsPage } from '../../page-objects/create-bank-account-page';

describe('Bank Account Tests', () => {

  context('Create Bank Account through UI - not first time', () => {
    // Hooks
    beforeEach(() => {
      // Intercept the request to the API
      cy.intercept('POST', '/login').as('login');
      cy.intercept('POST', '/graphql').as('bankaccounts');
      loginPage.visit();
      loginPage.typeCredentials({
        username: Cypress.env('clairUser'),
        password: Cypress.env('clairPassword'),
      });
      loginPage.clickSignIn();
      cy.wait('@login');
      leftSideNavBar.clickBankAccounts();
      cy.wait('@bankaccounts');
      bankAccountsPage.ClickCreate();
    });

    context('Positive Scenarios for Creating a Bank Account', () => {
      
      it('User creates a bank account successfully', () => {
        createBankAccountsPage.typeBankAccountInformation({
          bankName: Cypress.env('clairBankName'),
          routingNumber: Cypress.env('clairRoutingNumber'),
          accountNumber: Cypress.env('clairAccountNumber'),
        });
        createBankAccountsPage.ClickSave();
        cy.wait('@bankaccounts');
        cy.url().should('include', bankAccountsPage.getUrl());
        cy.contains(Cypress.env('clairBankName'))
        .scrollIntoView()
        .should('be.visible');
      });

    });

    context('Negative Scenarios for Creating a Bank Account', () => {

      it('User cannot create bank account - No Bank Account Information Typed', () => {
        createBankAccountsPage.ClickSave();
        cy.url().should('include', createBankAccountsPage.getUrl());
        createBankAccountsPage.getElements().getSaveButton().should('be.enabled');    
      });

      it('User cannot create bank account - Only Bank Name', () => {
        createBankAccountsPage.typeBankAccountInformation({ bankName: "Banco Nacional", });
        createBankAccountsPage.getElements().getSaveButton().should('not.be.enabled'); 
      });

      it('User cannot create bank account - Only Routing Number', () => {
        createBankAccountsPage.typeBankAccountInformation({ routingNumber: "123456789", });
        createBankAccountsPage.getElements().getSaveButton().should('not.be.enabled'); 
      });

      it('User cannot create bank account - Only Account Number', () => {
        createBankAccountsPage.typeBankAccountInformation({ accountNumber: "987654321", });
        createBankAccountsPage.getElements().getSaveButton().should('not.be.enabled'); 
      });

    });

  });

  context('Delete Bank Account through UI', () => {
    // Hooks
    beforeEach(() => {
      // Intercept the request to the API
      cy.intercept('POST', '/login').as('login');
      cy.intercept('POST', '/graphql').as('bankaccounts');
      loginPage.visit();
      loginPage.typeCredentials({
        username: Cypress.env('clairUser'),
        password: Cypress.env('clairPassword'),
      });
      loginPage.clickSignIn();
      cy.wait('@login');
      leftSideNavBar.clickBankAccounts();
      cy.wait('@bankaccounts');
    });

    context('Positive Scenarios for Deleting a Bank Account', () => {
      
      it('User deletes a bank account successfully', () => {
        bankAccountsPage.ClickDelete(Cypress.env('clairBankName'));
        cy.wait('@bankaccounts');
        cy.url().should('include', bankAccountsPage.getUrl());
        bankAccountsPage.getElements().getBankAccountsList()
        .should('contain', Cypress.env('clairBankName')+' (Deleted)');
      })
        
    });

    context('Negative Scenarios for Deleting a Bank Account', () => {
      
      it('User cannot delete a bank account - no active accounts', () => {
        cy.url().should('include', bankAccountsPage.getUrl());
        bankAccountsPage.getElements().getDeleteButtons()
        .should('not.exist');
      })
        
    });

  });
});

