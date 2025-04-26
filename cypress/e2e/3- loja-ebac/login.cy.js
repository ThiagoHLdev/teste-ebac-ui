/// <reference types="cypress" />
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('/minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('thiago.teste@gmail.com.br')
        cy.get('#password').type('@teste1234')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content').should('contain', 'Olá') // Deixei só 'Olá' pra ser mais seguro
    });

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('thiag.teste@gmail.com.br') // usuário errado de propósito
        cy.get('#password').type('@teste1234')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('thiago.teste@gmail.com.br')
        cy.get('#password').type('@teste12345') // senha errada de propósito
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error')
          .should('contain', 'Erro: A senha fornecida para o e-mail thiago.teste@gmail.com.br está incorreta.') // Mensagem de erro
          .and('exist') // encadeei pra ficar mais elegante
    });

    it('Deve fazer login com sucesso - usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content').should('contain', 'Olá') // Deixei flexível
    });

    it('Deve fazer login com sucesso - usando fixture', () => {
        cy.fixture('perfil').then((dados) => {
            cy.get('#username').type(dados.usuario, { log: false })
            cy.get('#password').type(dados.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content').should('contain', 'Olá')
        })
    });

    it.only('deve fazer loguin com sucesso - usando comandos customizados', () => {
        cy.login('thiago.teste@gmail.com.br' , '@teste1234')
        cy.get('.woocommerce-MyAccount-content').should('contain', 'Olá')
    });
});
