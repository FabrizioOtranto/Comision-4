/// <reference types="cypress" />

export class TodoListPage {
    constructor() {
        this.taskInput = '#task';
        this.sendButton = '#sendTask';
        this.deleteButton = 'button'
    };

    escribirTarea(tarea) {
        cy.get(this.taskInput).type(tarea);
    };

    clickBotonSend() {
        cy.get(this.sendButton).click();
    };

    clickDeleteButton(tarea) {
        cy.contains(tarea).siblings(this.deleteButton).click();
    };
    
    retornarTarea(tarea) {
        return cy.contains(tarea);
    };
};