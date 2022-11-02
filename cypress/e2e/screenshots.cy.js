import { LoginPage } from '../support/pages/loginPage'
import { NavbarPage } from '../support/pages/navbarPage'
import { HomePage } from '../support/pages/homePage'
import { TodoListPage } from '../support/pages/todoListPage'


describe("Screenshots", () => {
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
    });

    it('Tomar una foto a toda la pantalla', () => {
       cy.screenshot({capture:'fullPage'});
    });

    it('Tomar una foto al usuario del navbar', () => {
        cy.get(`[id^='user_${datosLogin.primerUsuario.username}']`).screenshot('foto del usuario');    
     });
});