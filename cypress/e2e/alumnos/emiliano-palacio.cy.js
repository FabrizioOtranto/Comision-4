/// <reference types="cypress" />

const DATOS = require('../../support/constants')

describe('Desafio 4', () => {

    it('Registro, login y eliminacion de usuario', () => {
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
            expect(respuesta.status).eq(200)
        }).then(respuesta => {
            cy.request('POST', 'https://pushing-it-backend.herokuapp.com/api/login', {
                username: respuesta.body.newUser.username,
                password: DATOS.register.password
            }).then(respuesta => {
                expect(respuesta.status).eq(200)
            })
        }).then(respuesta => {
            cy.request('DELETE', 'https://pushing-it-backend.herokuapp.com/api/deleteuser/' + respuesta.body.user.username).then(respuesta => {
                expect(respuesta.status).equal(200)
            })
        })
    })
})