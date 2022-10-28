export class NavbarPage{

    retornarUsuario(usuario) {
        return cy.get(`[id^='user_${usuario}']`);
    };
};