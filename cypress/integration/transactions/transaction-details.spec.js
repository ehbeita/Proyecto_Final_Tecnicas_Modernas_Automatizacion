/// <reference types="Cypress" />

import { loginPage } from '../../page-objects/login-page';
import { homePage } from '../../page-objects/home-page';
import { transactionDetailsPage } from '../../page-objects/transaction-details-page';

describe('Transaction details Tests', () => {

    context('Comment a transaction through UI', () => {
        // Hooks
        beforeEach(() => {
            // Intercept the request to the API
            cy.intercept('POST', '/login').as('login');
            loginPage.visit();
            loginPage.typeCredentials({
                username: Cypress.env('margarettaUser'),
                password: Cypress.env('margarettaPassword'),
            });
            loginPage.clickSignIn();
            cy.wait('@login');
            homePage.clickTransaction();
        });

        context('Positive Scenarios for commenting a transaction', () => {

            it('User comments a transaction successfully', () => {
                transactionDetailsPage.typeComment({
                    comment: "Este es un comentario",
                });
                transactionDetailsPage.addComment();
                transactionDetailsPage.getElements().getCommentsList()
                .should('contain', comment);
            });
        });
    });

    context('Give a like to a transaction through UI', () => {
        // Hooks
        beforeEach(() => {
            // Intercept the request to the API
            cy.intercept('POST', '/login').as('login');
            loginPage.visit();
            loginPage.typeCredentials({
                username: Cypress.env('margarettaUser'),
                password: Cypress.env('margarettaPassword'),
            });
            loginPage.clickSignIn();
            cy.wait('@login');
            homePage.clickTransaction();
        });

        context('Positive Scenarios for giving a like to a transaction', () => {

            it('User gives a like to a transaction successfully', () => {
                //transactionDetailsPage.getElements.
                //transactionDetailsPage.ClickLike();
                //transactionDetailsPage.getElements().getCommentsList()
                //.should('contain', comment);
            });
        });
    });
});