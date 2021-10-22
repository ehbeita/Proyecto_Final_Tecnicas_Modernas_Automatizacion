/// <reference types="Cypress" />

import { loginPage } from '../../page-objects/login-page';
import { header } from '../../page-objects/header';
import { transactionContactsPage } from '../../page-objects/transaction-contacts-page';
import { makePaymentPage } from '../../page-objects/make-payment-page';
import { paymentCompletePage } from '../../page-objects/payment-complete-page';


describe('Pay and Request Transactions Tests', () => {

    context('Request/Pay transaction through UI', () => {
        // Hooks
        beforeEach(() => {
            // Intercept the request to the API
            cy.intercept('POST', '/login').as('login');
            loginPage.visit();
            loginPage.typeCredentials({
                username: Cypress.env('clairUser'),
                password: Cypress.env('clairPassword'),
            });
            loginPage.clickSignIn();
            cy.wait('@login');
            header.clickNewTransaction();
        });

        context('Positive Scenarios for Requesting/Paying Transactions', () => {

            it('User completes a pay transaction successfully - with all data', () => {
                transactionContactsPage.ClickUser(Cypress.env('edgarUser'));
                makePaymentPage.typeTransactionInformation({
                    amount: Cypress.env('clairTransAmount'),
                    note: Cypress.env('clairTransNote'),
                });
                makePaymentPage.ClickPay();
                paymentCompletePage.getElements().getPaymentConfirmationMsg().invoke("text") 
                .should('contain', 'Paid $'+ Cypress.env('clairTransAmount') +
                ' for '+ Cypress.env('clairTransNote'));
                paymentCompletePage.getElements().getBody()
                .next()
                .should('contain', 'Transaction Submitted!');
                paymentCompletePage.ClickReturnToTransactions();

            });

            it('User completes a request transaction successfully - with all data', () => {
                transactionContactsPage.ClickUser(Cypress.env('edgarUser'));
                makePaymentPage.typeTransactionInformation({
                    amount: Cypress.env('clairTransAmount'),
                    note: Cypress.env('clairTransNote'),
                });
                makePaymentPage.ClickRequest();
                paymentCompletePage.getElements().getPaymentConfirmationMsg().invoke("text") 
                .should('contain', 'Requested $'+ Cypress.env('clairTransAmount') +
                ' for '+ Cypress.env('clairTransNote'));
                paymentCompletePage.getElements().getBody()
                .next()
                .should('contain', 'Transaction Submitted!');
                paymentCompletePage.ClickReturnToTransactions();

            });

            it('User completes a pay transaction successfully - with only amount typed', () => {
                transactionContactsPage.ClickUser(Cypress.env('edgarUser'));
                makePaymentPage.typeTransactionInformation({
                    amount: Cypress.env('clairTransAmount'),
                });
                makePaymentPage.ClickPay();
                paymentCompletePage.getElements().getPaymentConfirmationMsg().invoke("text") 
                .should('contain', 'Paid $'+ Cypress.env('clairTransAmount') +
                ' for ');
                paymentCompletePage.getElements().getBody()
                .next()
                .should('contain', 'Transaction Submitted!');
                paymentCompletePage.ClickReturnToTransactions();

            });

            it('User completes a request transaction successfully - with only amount typed', () => {
                transactionContactsPage.ClickUser(Cypress.env('edgarUser'));
                makePaymentPage.typeTransactionInformation({
                    amount: Cypress.env('clairTransAmount'),
                });
                makePaymentPage.ClickRequest();
                paymentCompletePage.getElements().getPaymentConfirmationMsg().invoke("text") 
                .should('contain', 'Requested $'+ Cypress.env('clairTransAmount') +
                ' for ');
                paymentCompletePage.getElements().getBody()
                .next()
                .should('contain', 'Transaction Submitted!');
                paymentCompletePage.ClickReturnToTransactions();

            });

        });

        context('Negative Scenarios for Requesting/Paying Transactions', () => {

            it('User cannot complete a request/pay transaction on Payment section - only note typed', () => {
                transactionContactsPage.ClickUser(Cypress.env('edgarUser'));
                makePaymentPage.typeTransactionInformation({
                    note: Cypress.env('clairTransNote'),
                });
                makePaymentPage.getElements().getRequestButton().should('not.be.enabled');
                makePaymentPage.getElements().getPayButton().should('not.be.enabled');
            });

            it('User cannot complete a request/pay transaction on Payment section - no data typed', () => {
                transactionContactsPage.ClickUser(Cypress.env('edgarUser'));
                makePaymentPage.getElements().getRequestButton().should('not.be.enabled');
                makePaymentPage.getElements().getPayButton().should('not.be.enabled');
            });
        });
    });
});