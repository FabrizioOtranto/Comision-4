export class HomePage{
    constructor() {
        this.todoListLink = '#todolistlink';
    };

    clickTodoListLink(){
        cy.get(this.todoListLink).click();
    };
};