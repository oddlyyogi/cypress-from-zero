describe('Product page', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
  })

  it('shows the first product name', () => {
    cy.visit('/')
    cy.get('[data-test="product-name"]').first().should('contain.text', 'Combination Pliers')
  })

  it('adds a product to the cart', () => {
    cy.visit('/')
    cy.contains('[data-test="product-name"]', 'Combination Pliers').click()
    cy.get('[data-test="unit-price"]').should('have.text', '14.15')
    cy.log('about to add to cart')
    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="cart-quantity"]').should('have.text', '1')
    cy.screenshot('cart')
  })
})