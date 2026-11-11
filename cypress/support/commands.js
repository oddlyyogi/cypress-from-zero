// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.env(['customerEmail', 'customerPassword']).then(({ customerEmail, customerPassword }) => {
    cy.session(customerEmail, () => {
      cy.visit('/auth/login')
      cy.get('[data-test="email"]').type(customerEmail)
      cy.get('[data-test="password"]').type(customerPassword, { log: false })
      cy.get('[data-test="login-submit"]').click()
      cy.url().should('include', '/account')
    }, {
      validate() {
        cy.window().its('localStorage').invoke('getItem', 'auth-token').should('exist')
      },
      cacheAcrossSpecs: true,
    })
  })
})