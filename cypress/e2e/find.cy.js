describe('Finding elements on the Toolshop home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('finds the sign-in link by its data-test attribute', () => {
    cy.get('[data-test="nav-sign-in"]')
      .should('be.visible')
      .and('have.attr', 'href', '/auth/login')
  })

  it('finds elements by their text', () => {
    cy.contains('Sign in').should('have.attr', 'data-test', 'nav-sign-in')
    cy.contains('h4', 'Sort').should('be.visible')
  })

  it('picks one element from a list', () => {
    cy.get('[data-test="product-name"]').should('have.length.greaterThan', 0)
    cy.get('[data-test="product-name"]').first().should('be.visible')
    cy.get('[data-test="product-name"]').eq(1).should('not.be.empty')
    cy.get('[data-test="product-name"]').last().should('be.visible')
  })

  it('searches inside one product card', () => {
    cy.get('[data-test="product-name"]').first()
      .closest('a')
      .within(() => {
        cy.get('[data-test="product-price"]').should('contain', '$')
        cy.get('img').should('have.attr', 'alt')
      })
  })

  it('narrows a group with filter and not', () => {
    cy.get('[data-test^="nav-"]')
      .filter('[data-test="nav-contact"]').should('have.length', 1)
    cy.get('[data-test^="nav-"]')
      .not('[data-test="nav-sign-in"]').should('have.length.greaterThan', 1)
  })

  it('moves around the page from one element', () => {
    cy.get('[data-test="product-name"]').first()
      .parent()
      .siblings()
      .find('[data-test="product-price"]').should('be.visible')
  })

  it('finds elements by role and name', () => {
    cy.getByRole('link', { name: 'Sign in' }).should('be.visible')
    cy.getByRole('button', { name: 'Search' }).should('be.visible')
    cy.getByRole('heading', { name: 'Sort' }).should('be.visible')
    cy.getByRole('checkbox').should('have.length.greaterThan', 3)
  })

  it('checks elements in different ways', () => {
    cy.get('[data-test="search-query"]').should('be.visible').and('have.value', '')
    cy.get('[data-test="nav-sign-in"]').should('have.text', 'Sign in')
    cy.get('[data-test="search-submit"]').should('be.enabled')
    cy.get('[data-test="nav-sign-out"]').should('not.exist')
  })
})