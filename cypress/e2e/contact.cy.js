import { ContactPage } from '../pages/ContactPage'

describe('Contact page', () => {
  it('sends a message', () => {
    const contact = new ContactPage()
    contact.visit()
    contact.fillName('Ada', 'Tester')
    contact.fillEmail('ada@example.com')
    contact.chooseSubject('Return')
    contact.writeMessage('My order arrived damaged. Can I return it, please?')
    contact.send()
    cy.contains('Thanks for your message').should('be.visible')
  })
})