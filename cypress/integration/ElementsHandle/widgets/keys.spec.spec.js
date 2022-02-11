/// <reference types="cypress" />

describe('shortcut Keys', () => {

    it('Keys backspace + enter', () => {
        cy.visit('https://www.google.com');
        cy.url().should('equal', 'https://www.google.com/');
        cy.get('input[title="Search"]').type('I am testing').type('{backspace}').clear();
        //cy.get('#userName')

        
        cy.get('input[title="Search"]').type('I am testing the QA version...').type('{enter}');
        cy.url().should('include', 'search');
        //cy.get('textarea#currentAddress').type('{enter}');
        //cy.wait(4000);
    })

})
