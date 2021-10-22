/// <reference types="Cypress" />

class Header {

    elements = {
      getNewTransactionButton: () => cy.get('[data-test="nav-top-new-transaction"]')
    };
  
    getElements() {
      return this.elements;
    }
  
    clickNewTransaction() {
      this.elements.getNewTransactionButton().click();
    }
  
  }
  
  export const header = new Header();