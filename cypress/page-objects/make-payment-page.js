/// <reference types="Cypress" />

class MakePaymentPage {

    url = '/';
    elements = {
        getAmountInput: () => cy.get('#amount'),
        getNoteInput: () => cy.get('#transaction-create-description-input'),
        getRequestButton: () => cy.get('[data-test="transaction-create-submit-request"]'),
        getPayButton: () => cy.get('[data-test="transaction-create-submit-payment"]')
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

    typeTransactionInformation({ amount = ' ', note = ' ' } = {}) {
        this.elements.getAmountInput().clear().type(amount);
        this.elements.getNoteInput().clear().type(note);
    }

    ClickRequest(){
        this.elements.getRequestButton().click();
    }

    ClickPay(){
        this.elements.getPayButton().click();
    }
}

export const makePaymentPage = new MakePaymentPage();