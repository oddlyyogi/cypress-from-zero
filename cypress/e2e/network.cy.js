describe('Controlling the network', () => {
  it('watches the real search request', () => {
    cy.intercept('**/products/search*').as('search')
    cy.visit('/')
    cy.get('[data-test="search-query"]').type('pliers')
    cy.get('[data-test="search-submit"]').click()
    cy.wait('@search').then(({ request, response }) => {
      expect(request.method).to.eq('QUERY')
      expect(request.body.q).to.eq('pliers')
      expect(response.statusCode).to.eq(200)
      expect(response.body.data.length).to.be.greaterThan(0)
    })
  })

  it('shows a stubbed search result', () => {
    cy.intercept('**/products/search*', { fixture: 'pliers.json' }).as('search')
    cy.visit('/')
    cy.get('[data-test="search-query"]').type('pliers')
    cy.get('[data-test="search-submit"]').click()
    cy.wait('@search')
    cy.get('[data-test="product-name"]').should('have.length', 1)
      .and('contain', 'Practice Pliers')
  })

  it('keeps working when the search fails', () => {
    cy.intercept('**/products/search*', {
      statusCode: 500,
      body: { message: 'Server error' },
    }).as('search')
    cy.visit('/')
    cy.get('[data-test="search-query"]').type('pliers')
    cy.get('[data-test="search-submit"]').click()
    cy.wait('@search').its('response.statusCode').should('eq', 500)
    cy.get('[data-test="search-caption"]').should('contain', 'pliers')
    cy.get('[data-test="product-name"]').should('have.length.greaterThan', 0)
  })

  it('waits for a slow search', () => {
    cy.intercept('**/products/search*', { fixture: 'pliers.json', delay: 2000 })
    cy.visit('/')
    cy.get('[data-test="search-query"]').type('pliers')
    cy.get('[data-test="search-submit"]').click()
    cy.get('[data-test="product-name"]').should('contain', 'Practice Pliers')
  })

  it('edits the real search answer', () => {
    cy.intercept('**/products/search*', (req) => {
      req.continue((res) => {
        res.body.data[0].name = 'Renamed by the test'
      })
    }).as('search')
    cy.visit('/')
    cy.get('[data-test="search-query"]').type('pliers')
    cy.get('[data-test="search-submit"]').click()
    cy.wait('@search')
    cy.get('[data-test="product-name"]').first().should('contain', 'Renamed by the test')
  })

  it('answers differently for each search word', () => {
    cy.intercept('**/products/search*', (req) => {
      if (req.body.q === 'pliers') {
        req.reply({ fixture: 'pliers.json' })
      } else {
        req.reply({ body: { current_page: 1, data: [], total: 0 } })
      }
    }).as('search')
    cy.visit('/')
    cy.get('[data-test="search-query"]').type('pliers')
    cy.get('[data-test="search-submit"]').click()
    cy.wait('@search')
    cy.get('[data-test="product-name"]').should('have.length', 1)
    cy.get('[data-test="search-query"]').clear()
    cy.get('[data-test="search-query"]').type('xyz')
    cy.get('[data-test="search-submit"]').click()
    cy.wait('@search')
    cy.get('[data-test="no-results"]').should('contain', 'There are no products found')
    cy.get('@search.all').should('have.length', 2)
  })

  it('fast-forwards a countdown', () => {
    cy.clock()
    cy.visit('http://localhost:4321/sale.html')
    cy.get('[data-test="countdown"]').should('have.text', 'Sale ends in 10 seconds')
    cy.tick(3000)
    cy.get('[data-test="countdown"]').should('have.text', 'Sale ends in 7 seconds')
    cy.tick(7000)
    cy.get('[data-test="countdown"]').should('have.text', 'The sale has ended')
  })
})