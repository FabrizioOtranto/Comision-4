describe("API register, Login y delete", () => {
    it("Registro usuario en la web pushingIT, login y delete usuario creado", () => {
      
      const user = "constanzaDemicheri"; //se actualizo
      
  
      cy.request({
        url: "https://pushing-it.onrender.com/api/register",
        method: "POST",
        body: {
          username: user,
          password: "123456!",
          gender: "other",
          day: "16",
          month: "08",
          year: "1992",
        },
      })
        .then((respuesta) => {
          expect(respuesta.status).equal(200);
        })
        .then(() => {
          cy.request({
            url: "https://pushing-it.onrender.com/api/login",
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
            url: `https://pushing-it.onrender.com/api/deleteuser/${user}`,
            method: "DELETE",
          }).then((respuesta) => {
            expect(respuesta.status).equal(200);
          });
        });
    });
  });
