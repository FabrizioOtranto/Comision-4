/// <reference types="cypress" />

describe('Aserciones', () => {
    let datosLogin;
    const timeout = 10000
    before("before", () => {
        cy.fixture('loginData').then(data => {
            datosLogin = data
        })
    });

    beforeEach("beforeEach", () => {
        cy.visit('');
        cy.get("#registertoggle").dblclick()
        cy.get('#user').type(datosLogin.primerUsuario.username)
        cy.get('#pass').type(datosLogin.primerUsuario.password)
        cy.get('#submitForm').click()
        cy.xpath(`//h2[starts-with(@id,'user_${datosLogin.primerUsuario.username}')]`).should('exist')
        cy.get('#waitslink').click()
        cy.get('#wait').dblclick();
    })

    it('Agregar espera estatica', () =>{
        cy.wait(10000)
        cy.get('#message').should('have.text', 'You have waited for ten seconds, CONGRATULATIONS');
    });

    it('Deberia esperar de forma dinamica por el texto', () =>{
        cy.get('#message', {timeout:timeout}).should('have.text', 'You have waited for ten seconds, CONGRATULATIONS');
    });

    it('Deberia esperar de forma dinamica por el texto', () =>{
        cy.get('#message', {timeout:timeout*2}).should('have.text', 'You are a man of patience and have waited fifteen seconds')
    });

    it("Deberia esperar que la barra de carga desaparezca", () =>{
        cy.get('[role="progressbar"]', {timeout:timeout}).should('not.exist')
        cy.get('#message').should('have.text', 'You have waited for ten seconds, CONGRATULATIONS');
    })

    it("Deberia esperar que la barra de carga desaparezca utilizando commands", () =>{
        cy.esperaBarraDeCarga()
        cy.get('#message').should('have.text', 'You have waited for ten seconds, CONGRATULATIONS');
    })
});