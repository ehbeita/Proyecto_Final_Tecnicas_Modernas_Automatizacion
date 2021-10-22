/// <reference types="Cypress" />

class CreateBankAccountsPage {

    url = '/bankaccounts/new';
    elements = {
        getBankNameInput: () => cy.get('#bankaccount-bankName-input'),
        getRoutingNumberInput: () => cy.get('#bankaccount-routingNumber-input'),
        getAccountNumberInput: () => cy.get('#bankaccount-accountNumber-input'),
        getSaveButton: () => cy.get('[data-test="bankaccount-submit"]')
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

    typeBankAccountInformation({ bankName = ' ', routingNumber = ' ', accountNumber = ' '} = {}) {
        this.elements.getBankNameInput().clear().type(bankName);
        this.elements.getRoutingNumberInput().clear().type(routingNumber);
        this.elements.getAccountNumberInput().clear().type(accountNumber);
    }

    ClickSave(){
        this.elements.getSaveButton().click();
    }

}

export const createBankAccountsPage = new CreateBankAccountsPage();