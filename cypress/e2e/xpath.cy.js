/// <reference types="cypress" />
describe('Xpath', () => {

    it('Deberia encontrar el input user utilizando xpath absoluto', () => {
        cy.visit('');
        cy.xpath('/html/body/div/div/div/div/form/div[1]/input[@id="user"]').should('exist');
    });

    it('Deberia encontrar el input user utilizando xpath relativo', () =>{
        cy.visit('')
        cy.xpath('//input[@id="user"]').should('exist');
    });

    it('Deberia encontrar el input combinando xpath relativo y absoluto', () =>{
        cy.visit('')
        cy.xpath("//div[@role='group']/input").should('exist');
    });

    it("deberia encontrar el elemento input utilizando contains", () =>{
        cy.visit('')
        cy.xpath("//input[contains(@id,'use')]").should('exist')
    })

    it('Deberia encontrar el elemnento input utilizando and', () =>{
        cy.visit('')
        cy.xpath("//input[@name='user' and @cy-get='user']")
    })

    it('Deberia encontrar el elemnento input utilizando or', () =>{
        cy.visit('')
        cy.xpath("//input[@name='user' or @cy-get='use']")
    })

    it('Deberia encontrar el elemnento input utilizando and && contains', () =>{
        cy.visit('');
        cy.xpath("//input[@name='user' and contains(@cy-get,'use')]");
    })

    it('Deberia encontrar el elemnento input utilizando not', () =>{
        cy.visit('');
        cy.xpath("//input[@name='user' and not(@cy-get='pass')]").should('exist');
    })

    it('Deberia encontrar el elemnento input utilizando statrs-with', () =>{
        cy.visit('');
        cy.xpath("//input[starts-with(@id,'us')]").should('exist');
    })

    it('Deberia encontrar el elemnento input utilizando text', () =>{
        cy.visit('');
        cy.xpath("//button[text()='Register']").should('exist');
    })

    it('Deberia encontrar el elemnento input utilizando text and contains', () =>{
        cy.visit('');
        cy.xpath("//button[contains(text(),'Registe')]").should('exist');
    });

    it.only('Deberia encontrar el input value female utilizando descendant', () =>{
        cy.visit('')
        cy.xpath("//fieldset//descendant::input[@value='Female']").should("exist")
    })

    it.only('Deberia encontrar el input value female utilizando ancestor', () =>{
        cy.visit('')
        cy.xpath("//input[@value='Female']//ancestor::fieldset").should("exist")
    })

    it.only('Deberia encontrar el input value female utilizando child', () =>{
        cy.visit('')
        cy.xpath("//label[@class='chakra-radio css-p40gnj']//child::input[@value='Female']").should("exist")
    })

    it.only('Deberia encontrar el input value female utilizando parent', () =>{
        cy.visit('')
        cy.xpath("//input[@value='Female']//parent::label").should("exist")
    })

    it.only('Deberia encontrar al input que es el hermano siguiente del label', () =>{
        cy.visit("")
        cy.xpath("//label//following-sibling::input[@id='user']").should('exist')
    })

    it.only('Deberia encontrar al label que es el hermano anterior del input', () =>{
        cy.visit("")
        cy.xpath("//input[@id='user']//preceding-sibling::label").should('exist')
    })
});