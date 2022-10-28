/// <reference types="cypress" />

import { LoginPage } from '../support/pages/loginPage'
import { NavbarPage } from '../support/pages/navbarPage'

describe('Page Object Model', () => {
    let datosLogin;
    const loginPage = new LoginPage();
    const navbarPage = new NavbarPage();

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

    it("Deberia agregar 3 tareas al todo list", () => {
        console.log('Prueba');
    });
});