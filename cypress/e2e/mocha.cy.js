describe("Mocha", () => {
    let curso = 'Pushing it';

    it("Primer test con Mocha", () => {
        cy.log("Primer test con mocha " + curso);
    });

    it.only("Segundo test con Mocha", () => {
        cy.log(`Segundo test con mocha ${curso}`);
    });
});

it.skip("Tercer test con Mocha", () => {
    cy.log("Tercer test con mocha")
})