import { LoginPage } from '../support/pages/loginPage'
import { NavbarPage } from '../support/pages/navbarPage'
import { HomePage } from '../support/pages/homePage'
import { TodoListPage } from '../support/pages/todoListPage'


describe("Sesiones", () => {
    const homePage = new HomePage();
    const todoListPage = new TodoListPage();

    before("before", () => {
        cy.loginConSesion();
    });

    beforeEach("beforeEach", () => {
        cy.loginConSesion();
        cy.visit('');
        homePage.clickTodoListLink();
    });

    it('Agregar tarea', () => {
        const tarea = 'Tarea'
        todoListPage.escribirTarea(tarea);
        todoListPage.clickBotonSend();
        todoListPage.retornarTarea(tarea).should('exist')
    });

    it('Agregar tarea y eliminarla', () => {
        const tarea = 'Tarea'
        todoListPage.escribirTarea(tarea);
        todoListPage.clickBotonSend();
        todoListPage.retornarTarea(tarea).should('exist')
        todoListPage.clickDeleteButton(tarea);
    });
});