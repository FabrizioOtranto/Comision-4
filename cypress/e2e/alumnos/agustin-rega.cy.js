/// <reference types="cypress" />
 
describe ("Api login", () => {


    it('Ingresando con pushingIT', () => {
        cy.request({
            method: "POST",
            url: "https://pushing-it-backend.herokuapp.com/api/login",
            body: {
                username: "pushingit",
                password: "123456!"
            }
        }).then(respuesta =>{
            window.localStorage.setItem('token', respuesta.body.token)
            window.localStorage.setItem('user', respuesta.body.user.username)
        })
        cy.visit('');
    });

 } ); 