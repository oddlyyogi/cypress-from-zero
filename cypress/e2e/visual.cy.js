describe('Visual checks', { retries: 0 }, () => {
  it('login form looks the same', () => {
    cy.visit('/auth/login')
    cy.get('[data-test="login-form"]').should('be.visible')
      .matchImageSnapshot('login-form')
  })
})