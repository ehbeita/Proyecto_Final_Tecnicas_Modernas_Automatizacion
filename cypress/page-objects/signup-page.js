/// <reference types="Cypress" />

class SignUpPage {

    url = '/signup';
    elements = {
        getFirstNameInput: () => cy.get('#firstName'),
        getFirstNameLabel: () => cy.get('#firstName-label'),
        getFirstNameHelperText: () => cy.get('#firstName-helper-text'),
        getLastNameInput: () => cy.get('#lastName'),
        getUsernameInput: () => cy.get('#username'),
        getPasswordInput: () => cy.get('#password'),
        getConfirmPasswordInput: () => cy.get('#confirmPassword'),
        getSignUpButton: () => cy.get('[data-test="signup-submit"]')
    }

    visit(){
        cy.visit(this.url)
    }

    getUrl() {
        return this.url;
    }

    getElements() {
        return this.elements;
      }

    typeNewUserInformation({ firstName = ' ', lastName = ' ', username = ' ', password = ' ', confirmPassword = ' ' } = {}){
        this.elements.getFirstNameInput().clear().type(firstName);
        this.elements.getLastNameInput().clear().type(lastName);
        this.elements.getUsernameInput().clear().type(username);
        this.elements.getPasswordInput().clear().type(password);
        this.elements.getConfirmPasswordInput().clear().type(confirmPassword);
    }

    ClickSignUp(){
        this.elements.getSignUpButton().click()
    }

}

export const signUpPage = new SignUpPage();