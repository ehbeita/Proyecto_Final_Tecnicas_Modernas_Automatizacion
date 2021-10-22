/// <reference types="Cypress" />

class BankAccountsPage {

    url = '/bankaccounts';
    elements = {
        getCreateButton: () => cy.get('[data-test="bankaccount-new"]'),
        getDeleteButtons: () => cy.get('[data-test="bankaccount-delete"]'),
        getBankAccountsList: () => cy.get('[data-test="bankaccount-list"]')
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

    ClickCreate(){
        this.elements.getCreateButton().click({ force: true });
    }

    ClickDelete(account){
        this.elements.getBankAccountsList().contains(account)
        .parent()
        .next()
        .children()
        .click();
    }
}

export const bankAccountsPage = new BankAccountsPage();