/// <reference types="Cypress" />

describe('API Testing', () => {
  it('test api', () => {
    cy.visit('/');
    cy.request({
      url: `https://v6.exchangerate-api.com/v6/${Cypress.env('API_KEY')}/latest/USD`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.result).to.eq('success');
      expect(response.body.base_code).to.eq('USD');
    });
  });
});
