describe('Contact form in plain English', { retries: 0 }, () => {
  it('fills the form', () => {
    cy.prompt([
      'visit /contact',
      'type "Ada" in the first name field',
      'type "Tester" in the last name field',
      'type {{email}} in the email field',
      'select "Return" in the subject dropdown',
    ], {
      placeholders: { email: 'ada@example.com' },
    })
    cy.get('[data-test="subject"]').should('have.value', 'return')
  })
})