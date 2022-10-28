import { LoginPage } from '../support/pages/loginPage'
import { NavbarPage } from '../support/pages/navbarPage'
import { HomePage } from '../support/pages/homePage'
import { TodoListPage } from '../support/pages/todoListPage'


describe("Agregar tareas con page object model", () => {
    let datosLogin;
    const loginPage = new LoginPage();
    const navbarPage = new NavbarPage();
    const homePage = new HomePage();
    const todoListPage = new TodoListPage();

    before("before", () => {
        cy.fixture('loginData').then(data => {
            datosLogin = data;
        });
    });

    beforeEach("beforeEach", () => {
        cy.visit('');
        cy.get("#registertoggle").dblclick();
        loginPage.escribirUsuario(datosLogin.primerUsuario.username);
        loginPage.escribirContraseña(datosLogin.primerUsuario.password);
        loginPage.clickBotonLogin();
        navbarPage.retornarUsuario(datosLogin.primerUsuario.username).should('be.visible');
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