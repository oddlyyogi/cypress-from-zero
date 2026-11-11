describe('Tricky pages', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4321/tricky.html')
  })

  it('reads text inside an iframe', () => {
    cy.get('[data-test="help-frame"]')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .find('[data-test="help-text"]')
      .should('contain', 'Need help')
  })

  it('reaches into a shadow DOM', () => {
    cy.get('[data-test="badge"]').shadow().find('.label')
      .should('have.text', 'Free delivery')
  })

  it('opens a new-tab link in the same tab', () => {
    cy.get('[data-test="terms-link"]').should('have.attr', 'target', '_blank')
    cy.get('[data-test="terms-link"]').invoke('removeAttr', 'target').click()
    cy.get('[data-test="terms-title"]').should('contain', 'Terms')
  })

  it('catches a window.open call', () => {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('open')
    })
    cy.get('[data-test="open-help"]').click()
    cy.get('@open').should('have.been.calledOnceWith', 'terms.html')
  })

  it('downloads a file and reads it', () => {
    cy.get('[data-test="download-report"]').click()
    cy.readFile('cypress/downloads/report.txt').should('contain', 'Monthly report')
  })

  it('shows a menu on hover', () => {
    cy.get('[data-test="menu-items"]').should('not.be.visible')
    cy.get('[data-test="menu"]').trigger('mouseenter')
    cy.get('[data-test="menu-items"]').should('be.visible')
  })

  it('scrolls to the bottom of a long page', () => {
    cy.get('[data-test="footer-note"]').scrollIntoView()
    cy.get('[data-test="footer-note"]').should('be.visible')
  })
})