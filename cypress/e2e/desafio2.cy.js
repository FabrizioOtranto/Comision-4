/// <reference types="cypress" />
const constants = require('../support/constansts');

describe("Desafio Dos", () => {
  let datosTest;

  before('Fixtures', () => {
    cy.fixture('datosTest').then(datos => {
      datosTest = datos;
    });
  });

  beforeEach("beforeEach", () => {
    cy.visit('');
    cy.get('#registertoggle').dblclick();
    cy.get('#user').type(constants.datoslogin.usuario);
    cy.get('#pass').type(constants.datoslogin.contraseña);
    cy.get('#submitForm').click();
    cy.get('#todolistlink').click();
  });

  it('agregar tareas al todo list', () => {
    cy.get('#task').type(datosTest.tareas.task1);
    cy.get('#sendTask').click();
    cy.get('#task').type(datosTest.tareas.task2);
    cy.get('#sendTask').click();
    cy.get('#task').type(datosTest.tareas.task3);
    cy.get('#sendTask').click();
    cy.get('#task').type(datosTest.tareas.task4);
    cy.get('#sendTask').click();
    cy.get('#task').type(datosTest.tareas.task5);
  });

  it('Validar Botones', () => {
    cy.get('#completed').click();
    cy.get('#all').click();
    cy.get('#active').click();
    cy.get('#removeAll').click();
  });

  it('Agregar dos tareas y eliminar una', () => {
    cy.get('#task').type(datosTest.tareas.task1);
    cy.get('#sendTask').click();
    cy.get('#task').type(datosTest.tareas.task2);
    cy.get('#sendTask').click();
    cy.contains(datosTest.tareas.task1).siblings('button').click();
  });

  afterEach('Desconectar', () => {
    cy.get('#logout').click();
  });

  after('Reporte General', () => {
    cy.log('reporte de login PushingIt')
  });
});