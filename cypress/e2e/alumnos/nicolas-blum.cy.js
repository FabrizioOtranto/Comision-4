/// <reference types="cypress" />


describe("Desafio 4", () => {
    it("Desafio 4", () => {
      const numeroRandom = Math.floor(Math.random() * 1000);
      const usuario = `NicoBlum${numeroRandom}`;

      cy.request({
          url: "https://pushing-it-backend.herokuapp.com/api/register",
          method: "POST",
          body: {
          username: usuario,
          password: "123456!",
          gender: "Male",
          day: "24",
          month: "03",
          year: "1988",
        },
      })
        .then((response) => {
          expect(response.status).equal(200);
        })
        .then(() => {
          cy.request({
            url: "http://pushing-it-backend.herokuapp.com/api/login",
            method: "POST",
            body: {
              username: usuario,
              password: "123456!",
            },
          }).then((response) => {
            expect(response.status).equal(200);
          });
        })
        .then(() => {
          cy.request({
            url: `https://pushing-it-backend.herokuapp.com/api/deleteuser/NicoBlum${numeroRandom}`,
            method: "DELETE",
          }).then((response) => {
            expect(response.status).equal(200);
          });
        });
    });
  });