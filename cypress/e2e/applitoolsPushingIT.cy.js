
describe('PushingIT', () => {

    beforeEach(() => {

        cy.eyesOpen({
            appName: 'PushingIT',                       // The name of the app under test
            testName: Cypress.currentTest.title,        // The name of the test case
        })
    })

    it('Deberia ingresar en la aplicacion de PushingiT', () => {

        cy.visit('')
        cy.get("#registertoggle").dblclick();
        cy.eyesCheckWindow({
            tag: "Login page",
            target: 'window',
            fully: true
        });

        cy.get('#user').type('pushingiT')
        cy.get('#pass').type('123456!')
        cy.get('#submitForm').click()

        cy.wait(7000);

        cy.eyesCheckWindow({
            tag: "Main page",
            target: 'window',
            fully: true,
            matchLevel: 'Layout'
        });
    })

    afterEach(() => {

        cy.eyesClose()
    })
})