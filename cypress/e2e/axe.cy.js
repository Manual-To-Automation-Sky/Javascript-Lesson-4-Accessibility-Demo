// Define at the top of the spec file or just import it
function terminalLog(violations) {
  cy.task(
    'log',
    `${violations.length} accessibility violation${
      violations.length === 1 ? '' : 's'
    } ${violations.length === 1 ? 'was' : 'were'} detected`
  )
  // pluck specific keys to keep the table readable
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    })
  )

  cy.task('table', violationData)
}

describe('Accessibility Tests', () => {
  it('should test for accessiblity', () => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
    cy.injectAxe()
    cy.checkA11y(null, null, terminalLog)
  })
  
  it('should test for accessiblity on a certain element', () => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
    cy.injectAxe()
    cy.checkA11y('#username', null, terminalLog)
  })

  it('should test for accessiblity excluding a certain element', () => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
    cy.injectAxe()
    cy.checkA11y({exclude: [['#login']]}, null, terminalLog)
  })
})