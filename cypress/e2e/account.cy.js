describe('My account', () => {
  beforeEach(() => {
    cy.login()
  })

  it('shows the account page', () => {
    cy.visit('/account')
    cy.get('[data-test="page-title"]').should('contain', 'My account')
  })

  it('shows the favorites page', () => {
    cy.visit('/account/favorites')
    cy.get('[data-test="page-title"]').should('contain', 'Favorites')
  })
})