/// <reference types="cypress" />

const DATOS = require('../../support/constants')

describe('Desafio 4', () => {

    it('Registro, login y eliminacion de usuario', () => {
        /*    cy.request('POST', 'https://pushing-it-backend.herokuapp.com/api/register',{
              username: register.username,
               password: register.password,
               gender: register.gender,
               day: register.day,
               month: register.month,
               year: register.year
           }) */
        cy.request({
            method: 'POST',
            url: 'https://pushing-it-backend.herokuapp.com/api/register',
            body: {
                username: DATOS.register.username,
                password: DATOS.register.password,
                gender: DATOS.register.gender,
                day: DATOS.register.day,
                month: DATOS.register.month,
                year: DATOS.register.year
            }
        }).then(respuesta => {
            expect(respuesta.status).equal(200)
        })

        cy.request('POST', 'https://pushing-it-backend.herokuapp.com/api/login', {
            username: DATOS.register.username,
            password: DATOS.register.password
        }).then(respuesta => {
            expect(respuesta.status).eq(200)
        })

        cy.request('DELETE', `https://pushing-it-backend.herokuapp.com/api/deleteuser/${DATOS.register.username}`).then(respuesta => {
            expect(respuesta.status).equal(200)
        })
        
    })

})