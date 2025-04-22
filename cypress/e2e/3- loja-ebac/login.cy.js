/// <reference types="cypress" />

describe('funcionalidade: login', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('deve fazer login com sucesso', () => {
        cy.get('#username').type('thiago.teste@gmail.com.br')
        cy.get('#password').type('@teste1234')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá');
    });

    it('deve exibir uma mensagem de erro ao inserir usúario inválido', () => {
        cy.get('#username').type('thiag.teste@gmail.com.br')
        cy.get('#password').type('@teste1234')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('exist') 
    });
    it('deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('thiago.teste@gmail.com.br')
        cy.get('#password').type('@teste12345')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Erro: A senha fornecida para o e-mail thiago.teste@gmail.com.br está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist') 
    });
 });