function logViolations(violations) {
  violations.forEach((v) => {
    cy.task('log', `${v.impact}: ${v.id}, ${v.nodes.length} element(s)`)
  })
}

describe('Accessibility', { retries: 0 }, () => {
  it('login form has no critical problems', () => {
    cy.visit('/auth/login')
    cy.get('[data-test="login-form"]').should('be.visible')
    cy.injectAxe()
    cy.checkA11y('[data-test="login-form"]', { includedImpacts: ['critical'] },
      logViolations, true)
  })

  it('reports problems on the home page', () => {
    cy.visit('/')
    cy.get('[data-test="product-name"]').should('have.length', 9)
    cy.injectAxe()
    cy.checkA11y(null, { includedImpacts: ['critical', 'serious'] }, logViolations, true)
  })
})