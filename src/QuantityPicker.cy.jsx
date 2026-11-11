import QuantityPicker from './QuantityPicker'

describe('QuantityPicker', () => {
  it('starts at the given quantity', () => {
    cy.mount(<QuantityPicker start={3} />)
    cy.get('[data-test="quantity"]').should('have.text', '3')
  })

  it('goes up and down', () => {
    cy.mount(<QuantityPicker />)
    cy.get('[data-test="increase"]').click()
    cy.get('[data-test="increase"]').click()
    cy.get('[data-test="quantity"]').should('have.text', '3')
    cy.get('[data-test="decrease"]').click()
    cy.get('[data-test="quantity"]').should('have.text', '2')
  })

  it('never goes below one', () => {
    cy.mount(<QuantityPicker />)
    cy.get('[data-test="decrease"]').should('be.disabled')
  })

  it('stops at the maximum', () => {
    cy.mount(<QuantityPicker start={4} max={5} />)
    cy.get('[data-test="increase"]').click()
    cy.get('[data-test="increase"]').should('be.disabled')
  })

  it('reports every change', () => {
    const onChange = cy.stub().as('onChange')
    cy.mount(<QuantityPicker onChange={onChange} />)
    cy.get('[data-test="increase"]').click()
    cy.get('@onChange').should('have.been.calledOnceWith', 2)
  })
})