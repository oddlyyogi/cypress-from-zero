export class ContactPage {
  visit() {
    cy.visit('/contact')
  }
  fillName(first, last) {
    cy.get('[data-test="first-name"]').type(first)
    cy.get('[data-test="last-name"]').type(last)
  }
  fillEmail(email) {
    cy.get('[data-test="email"]').type(email)
  }
  chooseSubject(subject) {
    cy.get('[data-test="subject"]').select(subject)
  }
  writeMessage(text) {
    cy.get('[data-test="message"]').type(text)
  }
  send() {
    cy.get('[data-test="contact-submit"]').click()
  }
}