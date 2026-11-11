const API = Cypress.expose('apiUrl')

describe('The Toolshop API', () => {
  it('lists products', { tags: '@smoke' }, () => {
    cy.request(`${API}/products?page=1`).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.headers['content-type']).to.include('application/json')
      expect(res.body.data).to.be.an('array').and.not.be.empty
      expect(res.body.data[0]).to.include.keys('id', 'name', 'price', 'in_stock')
    })
  })

  it('reads the second page of products', () => {
    cy.request({ url: `${API}/products`, qs: { page: 2 } }).then((res) => {
      expect(res.body.current_page).to.eq(2)
      expect(res.body.per_page).to.eq(9)
      expect(res.duration).to.be.lessThan(5000)
    })
  })

  it('searches with the QUERY method', () => {
    cy.request({ method: 'QUERY', url: `${API}/products/search`, body: { q: 'pliers' } })
      .its('body.data')
      .each((p) => expect(p.name.toLowerCase()).to.include('pliers'))
  })

  it('answers 404 for an unknown product', () => {
    cy.request({ url: `${API}/products/does-not-exist`, failOnStatusCode: false })
      .then((res) => {
        expect(res.status).to.eq(404)
        expect(res.body.message).to.eq('Requested item not found')
      })
  })

  it('logs in and reads the current user', () => {
    cy.request('POST', `${API}/users/login`, {
      email: 'customer@practicesoftwaretesting.com',
      password: 'welcome01',
    })
      .its('body.access_token')
      .then((token) => {
        cy.request({
          url: `${API}/users/me`,
          headers: { Authorization: `Bearer ${token}` },
        })
          .its('body.email').should('eq', 'customer@practicesoftwaretesting.com')
      })
  })

  it('refuses a wrong password', () => {
    cy.request({
      method: 'POST',
      url: `${API}/users/login`,
      body: { email: 'customer@practicesoftwaretesting.com', password: 'wrong' },
      failOnStatusCode: false,
    })
      .then((res) => {
        expect(res.status).to.eq(401)
        expect(res.body.error).to.eq('Unauthorized')
      })
  })

  it('shows a cart made through the API', () => {
    cy.request(`${API}/products?page=1`).its('body.data').then((products) => {
      const product = products.find((p) => p.in_stock)
      cy.request('POST', `${API}/carts`).its('body.id').then((cartId) => {
        cy.request('POST', `${API}/carts/${cartId}`, { product_id: product.id, quantity: 2 })
        cy.visit('/checkout', {
          onBeforeLoad(win) {
            win.sessionStorage.setItem('cart_id', cartId)
          },
        })
        cy.get('[data-test="product-title"]').should('contain', product.name)
        cy.get('[data-test="product-quantity"]').should('have.value', '2')
        cy.request('DELETE', `${API}/carts/${cartId}`).its('status').should('eq', 204)
      })
    })
  })

  it('runs a task in Node', () => {
    cy.task('log', 'products checked through the API')
  })
})