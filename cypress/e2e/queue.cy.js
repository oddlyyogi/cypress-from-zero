describe('The command queue', () => {
  it('shows the variable trap', () => {
    cy.visit('/')
    let count
    cy.get('[data-test="product-name"]').then(($names) => {
      count = $names.length
    })
    cy.then(() => {
      cy.log('count is ' + count)
    })
  })

  it('searches for pliers', () => {
    cy.visit('/')
    cy.get('[data-test="search-query"]').type('pliers')
    cy.get('[data-test="search-submit"]').click()
    cy.get('[data-test="product-name"]').should(($names) => {
      expect($names.length).to.be.greaterThan(0)
      $names.each((i, el) => expect(el.innerText.toLowerCase()).to.include('pliers'))
    })
  })

  it('waits longer for one slow element', () => {
    cy.visit('/')
    cy.get('[data-test="product-name"]', { timeout: 10000 }).should('be.visible')
  })

  it('remembers a product name with an alias', () => {
    cy.visit('/')
    cy.get('[data-test="product-name"]').first().invoke('text')
      .as('firstName', { type: 'static' })
    cy.get('[data-test="product-name"]').first().click()
    cy.url().should('include', '/product/')
    cy.get('@firstName').then((name) => {
      cy.get('[data-test="product-name"]').should('contain.text', name.trim())
    })
  })

  it('wraps a plain value', () => {
    cy.wrap({ shop: 'Toolshop' }).its('shop').should('eq', 'Toolshop')
  })
})