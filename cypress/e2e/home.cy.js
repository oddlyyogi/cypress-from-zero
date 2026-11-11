describe('Toolshop home page', () => {
  it('shows the sign-in link', { tags: '@smoke' }, () => {
    cy.visit('/')
    cy.contains('Sign in').should('be.visible')
  })

  it('lists products', () => {
    cy.visit('/')
    cy.get('[data-test="product-name"]').should('have.length.greaterThan', 0)
  })
})