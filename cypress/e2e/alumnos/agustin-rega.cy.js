/// <reference types="cypress" />
 
describe ("Api login", () => {

    const number = Math.floor(Math.random()*1000)
    const user = `agustin${number}`

    it('Registro, Logueo y eliminar usuario', () => {
        cy.request({
            method: "POST",
            url: `https://pushing-it-backend.herokuapp.com/api/register`,
            body: {
                username: user,
                password: "123456!",
                gender: "male",
                day:"10",
                month:"april",
                year:"1990",
            }
        }).then(response =>{
            expect(response.status).equal(200)
        })

        cy.request({
            method:"POST",
            url: `https://pushing-it-backend.herokuapp.com/api/login`,
            body: {
                username: user,
                password: "123456!"
            }
        }).then(response =>{
            expect(response.status).equal(200)
          
        }).then(() => { 
                cy.request({
                    method:"DELETE",
                    url: `https://pushing-it-backend.herokuapp.com/api/deleteuser/${user}`,
                }).then(response =>{
                    expect(response.status).equal(200)
                })
        })

    }); //IT
 }); 



