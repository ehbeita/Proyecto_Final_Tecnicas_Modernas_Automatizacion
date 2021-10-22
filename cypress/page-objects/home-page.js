/// <reference types="Cypress" />

class HomePage {

    url = '/';
    elements = {
      getTransactionsList: () => cy.get('[data-test="transaction-list"]')
    };
  
    visit() {
      cy.visit(this.url);
    }
  
    getUrl() {
      return this.url;
    }
  
    getElements() {
      return this.elements;
    }

    clickTransaction() {
      this.elements.getTransactionsList().first().click();
    }
  
  }
  
  export const homePage = new HomePage();