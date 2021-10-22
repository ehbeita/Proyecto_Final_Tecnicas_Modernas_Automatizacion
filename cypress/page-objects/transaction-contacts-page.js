/// <reference types="Cypress" />

class TransactionContactsPage {

    url = '/transaction/new';
    elements = {
        getUsersList: () => cy.get('[data-test="users-list"]')
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

    ClickUser(username){
        this.elements.getUsersList().contains(username).click({force : true});
    }
}

export const transactionContactsPage = new TransactionContactsPage();