/// <reference types="cypress" />
describe('Api testing', () => {

    it("Deberia obtener informacion de los post utilizando cypress", () => {
        cy.request('http://localhost:3000/posts').then(respuesta => {
            cy.log(respuesta);
            expect(respuesta.status).equal(200);
            expect(respuesta.body[0].title).equal('json-server');
        });
    });

    it("Deberia obtener informacion de los post utilizando cypress", () => {
        cy.request({
            url: 'http://localhost:3000/posts',
            method: 'GET',
            qs: {
                _sort: 'id',
                _order: 'desc'
            }
        }).then(respuesta => {
            cy.log(respuesta);
            expect(respuesta.status).equal(200);
            expect(respuesta.body[0].title).equal('titulo 4');
        });
    });

    it("Deberia traer la informancion utilizando sort", () => {
        cy.request({
            url: 'http://localhost:3000/posts',
            method: 'GET',
            qs: {
                _sort: 'id',
                _order: 'desc'
            }
        }).then(respuesta => {
            cy.log(respuesta);
            expect(respuesta.status).equal(200);
        });
    });

    it("Deberia traer la informancion utilizando slides", () => {
        cy.request({
            url: 'http://localhost:3000/posts',
            method: 'GET',
            qs: {
                _start: 5,
                _end: 10
            }
        }).then(respuesta => {
            cy.log(respuesta);
            expect(respuesta.status).equal(200);
        });
    });

    it("Deberia traer la informancion utilizando rangos", () => {
        cy.request({
            url: 'http://localhost:3000/posts',
            method: 'GET',
            qs: {
                id_gte: 5,
                id_lte: 10
            }
        }).then(respuesta => {
            cy.log(respuesta);
            expect(respuesta.status).equal(200);
        });
    });

    it("Deberia traer la informancion exlcuyendo el ID 1", () => {
        cy.request({
            url: 'http://localhost:3000/posts',
            method: 'GET',
            qs: {
                id_ne: 1,
            }
        }).then(respuesta => {
            cy.log(respuesta);
            expect(respuesta.status).equal(200);
        });
    });


    it("Deberia utilizar post para crear un nuevo documento", () => {
        cy.request({
            url: 'http://localhost:3000/posts',
            method: 'POST',
            body: {
                id: 106,
                title: "Primer peticion post en la clase",
                author: "Pushing IT"
            }
        }).then(respuesta => {
            cy.log(respuesta)
            expect(respuesta.status).equal(201);
        });
    });

    it("Deberia utilizar post para crear un nuevo documento utilizando headers", () => {
        cy.request({
            url: 'http://localhost:3000/posts',
            method: 'POST',
            body: {
                id: 107,
                title: "Primer peticion post en la clase",
                author: "Pushing IT"
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(respuesta => {
            cy.log(respuesta)
            expect(respuesta.status).equal(201);
        });
    });

    it("Deberia utilizar PUT para editar un documento", () => {
        cy.request({
            url: 'http://localhost:3000/posts/106',
            method: 'PUT',
            body: {
                id: 106,
                title: "Primer ediicion con PUT en la clase",
                author: "Pushing IT"
            }
        }).then(respuesta => {
            cy.log(respuesta)
            expect(respuesta.status).equal(200);
        });
    });

    it("Deberia utilizar DELETE para eliminar un documento", () => {
        cy.request({
            url: 'http://localhost:3000/posts/105',
            method: 'DELETE',
        }).then(respuesta => {
            cy.log(respuesta)
            expect(respuesta.status).equal(200);
        });
    });

    it("Deberia crear, modificar, eliminar y verificar que el post no existe mas", () => {
        let id;
        cy.request({
            url: 'http://localhost:3000/posts',
            method: "POST",
            body: {
                id: Math.ceil(Math.random() * 1000),
                title: 'Actividad 1',
                author: 'Pushing IT'
            }
        }).then(respuesta => {
            expect(respuesta.status).equal(201)
            expect(respuesta.body.title).equal('Actividad 1')
            expect(respuesta.body.author).equal('Pushing IT')
        }).then(respuesta => {
            cy.request({
                url: 'http://localhost:3000/posts/' + respuesta.body.id,
                method: "PUT",
                body: {
                    id: respuesta.body.id,
                    title: 'Actividad 1 editado',
                    author: 'Pushing IT editado'
                }
            }).then(respuesta => {
                expect(respuesta.status).equal(200)
                expect(respuesta.body.id).equal(respuesta.body.id)
                expect(respuesta.body.title).equal('Actividad 1 editado')
                expect(respuesta.body.author).equal('Pushing IT editado')
            }).then(respuesta => {
                id = respuesta.body.id
                cy.request({
                    url: 'http://localhost:3000/posts/' + respuesta.body.id,
                    method: "DELETE",
                }).then(respuesta => {
                    expect(respuesta.status).equal(200)
                }).then(() => {
                    cy.request({
                        url: 'http://localhost:3000/posts/' + id,
                        method: 'GET',
                        failOnStatusCode: false
                    }).then(respuesta => {
                        expect(respuesta.status).equal(404);
                    });
                });
            });
        });
    });

    it('Deberia ingresar a pushingIT utilizando request', () => {
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
});