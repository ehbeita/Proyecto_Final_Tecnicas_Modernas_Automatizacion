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
                username: Cypress.env('clairUser'),
                password: Cypress.env('clairPassword'),
            });
            loginPage.clickSignIn();
            cy.wait('@login');
            homePage.clickTransaction();
        });

        context('Positive Scenarios for commenting a transaction', () => {

            it('User comments a transaction successfully', () => {
                let comment = "Este es un comentario";
                transactionDetailsPage.typeComment({
                    comment,
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
                username: Cypress.env('clairUser'),
                password: Cypress.env('clairPassword'),
            });
            loginPage.clickSignIn();
            cy.wait('@login');
            homePage.clickTransaction();
        });

        context('Positive Scenarios for giving a like to a transaction', () => {

            it('User gives a like to a transaction successfully', () => {
                transactionDetailsPage.getElements().getLikeIcon()
                .should('have.css', 'color', 'rgb(63, 81, 181)')
                .and('not.be.disabled');
                
                transactionDetailsPage.ClickLike();
                transactionDetailsPage.getElements().getLikeIcon()
                .should('have.css', 'color', 'rgba(0, 0, 0, 0.26)')
                .and('be.disabled');
            });
        });
    });
});