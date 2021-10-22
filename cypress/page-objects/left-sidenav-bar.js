/// <reference types="Cypress" />

class LeftSideNavBar {

    elements = {
      getHomeLink: () => cy.get('[data-test="sidenav-home"]'),
      getMyAccountLink: () => cy.get('[data-test="sidenav-user-settings"]'),
      getBankAccountsLink: () => cy.get('[data-test="sidenav-bankaccounts"]'),
      getNotificationsLink: () => cy.get('[data-test="sidenav-notifications"]'),
      getLogoutLink: () => cy.get('[data-test="sidenav-signout"]')
    };
  
    getElements() {
      return this.elements;
    }
  
    clickHome() {
      this.elements.getHomeLink().click();
    }
  
    clickMyAccount() {
      this.elements.getMyAccountLink().click();
    }

    clickBankAccounts() {
      this.elements.getBankAccountsLink().click();
    }

    clickNotifications() {
      this.elements.getNotificationsLink().click();
    }

    clickLogout() {
      this.elements.getLogoutLink().click();
    }
  
  }
  
  export const leftSideNavBar = new LeftSideNavBar();