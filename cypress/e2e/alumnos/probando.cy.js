/// <reference types="cypress" />
 
describe ("Api login", () => {

    it('Registro con pushingIT', () => {
        cy.request({
            method: "POST",
            url: "https://pushing-it-backend.herokuapp.com/api/register",
            body: {
                username:"pushingit",
                password:"123456!",
                gender:"other",
                day:"10",
                month:"10",
                year:"1990"
            }
        }).then(respuesta =>{
            window.localStorage.setItem('token', respuesta.body.token)
            window.localStorage.setItem('user', respuesta.body.user.username)
        })
        cy.visit('');
    });

 } ); 