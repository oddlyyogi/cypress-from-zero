describe('Hook order', () => {
  before(() => cy.task('log', 'before: once, at the start'))
  beforeEach(() => cy.task('log', 'beforeEach: before every test'))
  afterEach(() => cy.task('log', 'afterEach: after every test'))
  after(() => cy.task('log', 'after: once, at the end'))

  it('first test', () => cy.task('log', 'first test'))
  it('second test', () => cy.task('log', 'second test'))
})