describe('Forms on the Toolshop', () => {
  it('fills in the contact form', () => {
    cy.visit('/contact')
    cy.get('[data-test="first-name"]').type('Ada')
    cy.get('[data-test="last-name"]').type('Tester')
    cy.get('[data-test="email"]').type('ada@example')
    cy.get('[data-test="email"]').clear().type('ada@example.com')
    cy.get('[data-test="subject"]').select('Return')
    cy.get('[data-test="subject"]').should('have.value', 'return')
    cy.get('[data-test="message"]')
      .type('My order arrived damaged.{enter}Can I return it and get a replacement, please?')
    cy.get('[data-test="attachment"]').selectFile({
      contents: Cypress.Buffer.from(''),
      fileName: 'empty.txt',
    })
    cy.get('[data-test="contact-submit"]').click()
    cy.contains('Thanks for your message').should('be.visible')
  })

  it('moves through fields with the keyboard', () => {
    cy.visit('/contact')
    cy.get('[data-test="first-name"]').type('Ada')
    cy.press(Cypress.Keyboard.Keys.TAB)
    cy.focused().should('have.attr', 'data-test', 'last-name')
    cy.focused().type('Tester{selectall}{backspace}Lovelace')
    cy.focused().should('have.value', 'Lovelace')
  })

  it('ticks a filter and sorts the products', () => {
    cy.visit('/')
    cy.contains('label', 'Hand Tools').find('input').check()
    cy.contains('label', 'Hand Tools').find('input').should('be.checked')
    cy.contains('label', 'Hand Tools').find('input').uncheck().should('not.be.checked')
    cy.get('[data-test="sort"]').select('Name (A - Z)').should('have.value', 'name,asc')
  })

  it('shows a menu button on a phone-sized screen',
    { viewportWidth: 375, viewportHeight: 667 }, () => {
      cy.visit('/')
      cy.getByRole('button', { name: 'Toggle navigation' }).should('be.visible')
    })

  it('visits a second site with cy.origin', () => {
    cy.visit('/')
    cy.origin('http://localhost:4321', () => {
      cy.visit('/tricky.html')
      cy.get('h1').should('have.text', 'Tricky pages')
    })
  })
})