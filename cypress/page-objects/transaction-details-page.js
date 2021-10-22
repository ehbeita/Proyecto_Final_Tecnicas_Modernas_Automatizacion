/// <reference types="Cypress" />

class TransactionDetailsPage {

    url = '/transaction/';
    elements = {
        getCommentInput: () => cy.get('[id^=local-transaction-comment-input-]'),
        getLikeIcon: () => cy.get('[id^=transaction-like-button-]'),
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