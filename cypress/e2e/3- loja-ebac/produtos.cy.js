/// <reference types="cypress" />

describe('funcionalidade: produtos', () => {

    beforeEach(() => {
      cy.visit('produtos')
    });
  
    it('deve selecionar o produto "Aether Gym Pant"', () => {
      // Verifica se o produto está visível e clica nele
      cy.contains('.products .product', 'Aether Gym Pant')
        .should('be.visible')
        .click()
  
      // Mostra a URL atual no log (debug)
      cy.url().then((url) => {
        cy.log('URL atual:', url)
      })
  
      // Aguarda que a URL contenha "aether-gym-pant" (mais específico)
      cy.url().should('include', 'aether-gym-pant')
  
      // Verifica se o título H1 contém o nome do produto
      cy.get('h1').should('contain', 'Aether Gym Pant')
    });
  
  });
  