/// <reference types="cypress" />

describe('Hooks', () => {
    let usuario1, usuario2, password

    before('Before', () =>{
        usuario1 = "pushingit"
        usuario2 = 'pushingit2'
        password = '123456!'
    })

    beforeEach("beforeEach", () => {
        cy.visit('');
        cy.get('#registertoggle').dblclick();
    });

    it('Probar el login con credenciales validas', () => {
        cy.get('#user').type(usuario1);
        cy.get('#pass').type(password);
        cy.get('#submitForm').click();
        cy.xpath(`//h2[starts-with(@id,'user_${usuario1}_')]`).should('exist');
    });

    it('Probar el login con credenciales validas 2', () => {
        cy.get('#user').type(usuario2);
        cy.get('#pass').type(password);
        cy.get('#submitForm').click();
        cy.xpath(`//h2[starts-with(@id,'user_${usuario2}_')]`).should('exist');
    });

    afterEach('after each', () => {
        cy.get('#logout').click();
    });

    after('After', () =>{
        cy.log('**enviando reportes por discord**');
    });
});