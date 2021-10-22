/// <reference types="Cypress" />

import { signUpPage } from '../../page-objects/signup-page';
import { loginPage } from '../../page-objects/login-page';

describe('SignUp Tests', () => {

    context('Sign up through UI', () => {
        // Hooks
        beforeEach(() => {
            // Intercept the request to the API
            cy.intercept('POST', '/users').as('signup');
            loginPage.visit();
            loginPage.clickSignUp();
        });

        context('Positive Scenarios for SignUp', () => {

            it('User Signs up successfully', () => {
                signUpPage.typeNewUserInformation({
                    firstName: "Esteban",
                    lastName: "Hernandez",
                    username: "Esteban_Hdz",
                    password: "p@ss!23",
                    confirmPassword: "p@ss!23",
                });
                signUpPage.ClickSignUp();
                cy.wait('@signup');
                cy.url().should('include', loginPage.getUrl());    
            });

        });

        context('Negative Scenarios for SignUp', () => {

            it('User cannot Sign up - No User Information Typed', () => {
                signUpPage.ClickSignUp();
                cy.url().should('include', signUpPage.getUrl());
                signUpPage.getElements().getFirstNameLabel().should('have.css', 'color', 'rgb(244, 67, 54)');
                signUpPage.getElements().getFirstNameHelperText().should('be.visible')
                .and('contain', 'First Name is required').and('have.css', 'color', 'rgb(244, 67, 54)');
                signUpPage.getElements().getSignUpButton().should('not.be.enabled');    
            });

            it('User cannot Sign up - Only Firstname', () => {
                signUpPage.typeNewUserInformation({ firstName: "Esteban", });
                signUpPage.getElements().getSignUpButton().should('not.be.enabled');
            });

            it('User cannot Sign up - Only Lastname', () => {
                signUpPage.typeNewUserInformation({ lastName: "Hernandez", });
                signUpPage.getElements().getSignUpButton().should('not.be.enabled');
            });

            it('User cannot Sign up - Only Username', () => {
                signUpPage.typeNewUserInformation({ lastName: "Esteban_Hdz", });
                signUpPage.getElements().getSignUpButton().should('not.be.enabled');
            });

            it('User cannot Sign up - Only Password', () => {
                signUpPage.typeNewUserInformation({ password: "s3cret", });
                signUpPage.getElements().getSignUpButton().should('not.be.enabled');
            });

            it('User cannot Sign up - Only Confirm Password', () => {
                signUpPage.typeNewUserInformation({ confirmPassword: "s3cret", });
                signUpPage.getElements().getSignUpButton().should('not.be.enabled');
            });

        });
    });
});