/// <reference types="cypress" />

describe('Aserciones', () => {
    let datosLogin;
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
    })

    it("Deberia verificar que el titulo de la pagina sea Waits utilizando should", () => {
        cy.get('#title').should('have.text', "Wait")
    })

    it("Deberia verificar que el titulo de la pagina sea Waits utilizando expect", () => {
        cy.get('#title').invoke('text').then(texto => {
            expect(texto).is.equal('Waits')
        })
    })

    it("Deberia verificar que el titulo de la pagina sea Waits utilizando assert", () => {
        cy.get('#title').invoke('text').then(texto => {
            assert.equal(texto, "Waits")
        })
    })

    it("Deberia verificar la cantidad de elementos cuyo id es title utilizando should", () => {
        cy.get('#title').should('have.length', 1)
    })

    it("Deberia verificar la cantidad de elemtnos cuyo id es title utilizando should", () => {
        cy.get('#title').invoke('text').should('have.length', 5)
    })

    it('Deberia verificar la cantidad de "h2" que hay en la pagina', () => {
        cy.get('h2').should('have.length', 3)
    })

    it("Deberia verificar la cantidad de caracteres del titulo utilizando expect", () => {
        cy.get('#title').invoke('text').then(titulo => {
            expect(titulo).to.have.length(5)
        })
    })

    it("Deberia verificar la cantidad de elemtnos cuyo id es title utilizando expect", () => {
        cy.get('#title').then(elemntos => {
            expect(elemntos).to.have.length(1)
        })
    })

    it("Deberia verificar la cantidad de caracteres del titulo utilizando assert", () => {
        cy.get('#title').invoke('text').then(titulo => {
            assert.lengthOf(titulo, 5)
        })
    })

    it("Deberia verificar la cantidad de elemtnos cuyo id es title utilizando assert", () => {
        cy.get('h2').then(elemntos => {
            assert.lengthOf(elemntos, 3)
        })
    })

    it("Deberia verificar que el titulo de la pagina sea Waits utilizando should y que exista", () => {
        cy.get('#title').should('is.visible').and('have.text', "Waits")
    })

    it("Utilizando and para validar mas de una asersion en la misma sentencia",() =>{
        cy.get("#title").invoke('text').should("have.length", 5).and('equal', 'Waits').and('exist')
    })

    it('Validar atributos con should', () =>{
        cy.get("#title").should('have.attr', 'id', 'title')
    })

    it('Validar el color del titulo con should', () =>{
        cy.get("#title").should('have.css', 'color', 'rgb(51, 255, 255)')
    })

    it('Validar el color del titulo con expect', () =>{
        cy.get("#title").invoke('css', 'color').then(color =>{
            expect(color).equal('rgb(51, 255, 255)')
        })
    })
})