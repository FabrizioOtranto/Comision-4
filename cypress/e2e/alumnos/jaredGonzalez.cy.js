/// <reference types="cypress" />

describe('Api testing', () => {

    it('Deberia crear un usuario, ingresar y luego eliminarlo', () => {
        cy.request({
            url: "https://pushing-it-backend.herokuapp.com/api/register",
            method: "POST",
            body: {
                username: "user11",
                password: "pass",
                gender: "Male",
                day: "11",
                month: "August",
                year: "1992"

            }
        }).then(respuesta => {
            expect(respuesta.status).equal(200)
        })

        cy.request({
            url: "https://pushing-it-backend.herokuapp.com/api/login",
            method: "POST",
            body: {
                username: "user11",
                password: "pass"
            }
        }).then(respuesta => {
            expect(respuesta.status).equal(200)
        })

        cy.request({
            url: "https://pushing-it-backend.herokuapp.com/api/deleteuser/user11",
            method: "DELETE"
        }).then(respuesta => {
            expect(respuesta.status).equal(200)
        })
    })
})