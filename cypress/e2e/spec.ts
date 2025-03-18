describe('e2e test', () => {
  
  it('Visits the initial project page', () => {
    cy.visit('/')

    cy.contains('Power draw')
    cy.contains('Fed into grid')
    cy.contains('Solar power production')
    cy.contains('Fed into grid')
    cy.contains('Energy consumption')
    cy.contains('Last 30 days').click()
    cy.contains('chart')
  })

})
