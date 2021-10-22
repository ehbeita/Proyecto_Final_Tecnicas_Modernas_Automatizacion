/// <reference types="Cypress" />

class PaymentCompletePage {

    url = '/';
    elements = {
        getPaymentConfirmationMsg: () => cy.get('h2').last(),
        getReturnToTransactionsButton: () => cy.get('[data-test="new-transaction-return-to-transactions"]'),
        getBody: () => cy.get('[data-test="main"]')
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

    ClickReturnToTransactions(){
        this.elements.getReturnToTransactionsButton().click();
    }

}

export const paymentCompletePage = new PaymentCompletePage();