/// <reference types="cypress" />

describe('Tool tip', function() {    
    it('Tool tip', () => {
        cy.visit('https://demoqa.com/tool-tips');
        cy.url().should('include', 'tool-tips'); 

        cy.get('#toolTipButton').trigger('mouseover')
        cy.get('#buttonToolTip').should('contain.text', 'You hovered');

        cy.get('#toolTipTextField').trigger('mouseover');
        cy.get('#textFieldToolTip').should('have.text', 'You hovered over the text field');
    })
})
