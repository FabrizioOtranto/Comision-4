describe("API register, Login y delete", () => {
  it("Registro usuario en la web pushingIT, login y delete usuario creado", () => {
    const numero = Math.floor(Math.random() * 1000);
    const user = `frandasilveira${numero}`;

    cy.request({
      url: "https://pushing-it-backend.herokuapp.com/api/register",
      method: "POST",
      body: {
        username: user,
        password: "123456!",
        gender: "other",
        day: "29",
        month: "10",
        year: "1989",
      },
    })
      .then((respuesta) => {
        expect(respuesta.status).equal(200);
      })
      .then(() => {
        cy.request({
          url: "http://pushing-it-backend.herokuapp.com/api/login",
          method: "POST",
          body: {
            username: user,
            password: "123456!",
          },
        }).then((respuesta) => {
          expect(respuesta.status).equal(200);
        });
      })
      .then(() => {
        cy.request({
          url: `https://pushing-it-backend.herokuapp.com/api/deleteuser/frandasilveira${numero}`,
          method: "DELETE",
        }).then((respuesta) => {
          expect(respuesta.status).equal(200);
        });
      });
  });
});
