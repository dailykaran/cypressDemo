/// <reference types="cypress" />

describe('Widgets - Autocomplete', function() {

    beforeEach(function () {
        cy.visit('https://demoqa.com/auto-complete');
        cy.url().should('include', 'auto-complete');        
    })     

    it('Select single solor item', () => {
        
        // Select single solor item
        cy.get('#autoCompleteSingleInput').type('yellow').get('div.auto-complete__option').contains('Yellow').click();
        cy.get('.auto-complete__single-value').then((colortext) => 
            expect(colortext.text()).to.contain('Yellow')
            );
        cy.get('.auto-complete__single-value').should('have.text', 'Yellow');
    })

    it('Select multiple color item', () => {

        // Select multiple color item
        cy.get('#autoCompleteMultipleInput').type('Red').get('div.auto-complete__option').contains('Red').click();
        cy.get('#autoCompleteMultipleInput').clear();
        
        const selectColor = ['Green', 'Yellow', 'White']
        selectColor.forEach((item) => {
            cy.get('#autoCompleteMultipleInput').type(item).get('div.auto-complete__option').contains(item).click();
        });
        cy.get('.auto-complete__clear-indicator').click();
    })
    
    it('Select multiple item by random letters', () => {

        // Select multiple item by random letters
        cy.get('#autoCompleteMultipleInput').type('g')
        cy.get('div.auto-complete__option').each(($elm) => {
            const listitem = []
            listitem.push($elm.text());
            cy.get('#autoCompleteMultipleInput').clear();
            //cy.log(listitem);
        }).each((listitem) => {
            cy.get('#autoCompleteMultipleInput').type(listitem.text()).get('div.auto-complete__option').contains(listitem.text()).click();            
            }).each((getlistItem) => { 
                //cy.log(getlistItem.text().trim());
                cy.get('#autoCompleteMultipleContainer .auto-complete__multi-value').contains(getlistItem.text().trim()).should('be.visible')
            }) 
    })
})
