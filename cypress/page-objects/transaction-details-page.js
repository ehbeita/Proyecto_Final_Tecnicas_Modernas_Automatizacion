/// <reference types="Cypress" />

class TransactionDetailsPage {

    url = '/transaction/'+Cypress.env('transactionId');
    elements = {
        getCommentInput: () => cy.get('#transaction-comment-input-'+Cypress.env('transactionId')),
        getLikeIcon: () => cy.get('[data-test="transaction-like-button-'+Cypress.env('transactionId')+'"]'),
        getCommentsList: () => cy.get('[data-test="comments-list"]')
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

    typeComment({ comment = ' ' } = {}){
        this.elements.getCommentInput().clear().type(comment);
    }

    addComment(){
        this.elements.getCommentInput().type('{enter}');
    }

    ClickLike(){
        this.elements.getLikeIcon().click();
    }
}

export const transactionDetailsPage = new TransactionDetailsPage();