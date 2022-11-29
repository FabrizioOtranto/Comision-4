/// <reference types="cypress" />
describe("Desafío 4", () => {
  it("Debería registrar, loguear y eliminar al usuario", () => {
    cy.request({
      url: "http://pushing-it-backend.herokuapp.com/api/register",
      method: "POST",
      body: {
        username: "msilvanat",
        password: "123456!",
        gender: "Female",
        day: "15",
        month: "March",
        year: "1992",
      },
    }).then(respuesta => {
      expect(respuesta.status).equal(200);

    }).then(() => {
      cy.request({
        url: "http://pushing-it-backend.herokuapp.com/api/login",
        method: "POST",
        body: {
          username: "msilvanat",
          password: "123456!",
        },
      })
        .then(respuesta => {
          expect(respuesta.status).equal(200);
        })
    }).then(() => {
      cy.request({
        url: `https://pushing-it-backend.herokuapp.com/api/deleteuser/${"msilvanat"}`,
        method: "DELETE",
      }).then((respuesta) => {
        expect(respuesta.status).equal(200);
      });
    })
  });
});
